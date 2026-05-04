"use server";

/**
 * Server actions for payment processing
 */

import { PrismaClient } from "../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Singleton pattern to prevent opening too many connections to Neon
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

type PaymentResult =
  | {
      success: true;
      paymentId: string;
      clientSecret?: string;
      checkoutUrl?: string;
    }
  | { success: false; error: string };

/**
 * Process Stripe payment
 */
export async function processStripePayment(data: {
  bookingId: string;
  amount: number;
  currency?: string;
}): Promise<PaymentResult> {
  try {
    // Get booking to find user ID
    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
      include: { user: true },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/stripe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Payment failed" };
    }

    const result = await response.json();
    return {
      success: true,
      paymentId: result.paymentId,
      clientSecret: result.clientSecret,
    };
  } catch (error) {
    console.error("Stripe payment processing error:", error);
    return { success: false, error: "Payment processing failed" };
  }
}

/**
 * Process Chapa payment
 */
export async function processChapaPayment(data: {
  bookingId: string;
  amount: number;
  currency?: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}): Promise<PaymentResult> {
  try {
    // Get booking to find user ID
    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
      include: { user: true },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/chapa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Payment failed" };
    }

    const result = await response.json();
    return {
      success: true,
      paymentId: result.paymentId,
      checkoutUrl: result.checkoutUrl,
    };
  } catch (error) {
    console.error("Chapa payment processing error:", error);
    return { success: false, error: "Payment processing failed" };
  }
}

/**
 * Process cash payment (mark as completed immediately)
 */
export async function processCashPayment(data: {
  bookingId: string;
  amount: number;
  currency?: string;
}): Promise<PaymentResult> {
  try {
    // Get booking to find user ID
    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
      include: { user: true },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    // Create payment record with COMPLETED status for cash payments
    const payment = await prisma.payment.create({
      data: {
        bookingId: data.bookingId,
        userId: booking.user.id,
        amount: data.amount,
        currency: data.currency || "ETB",
        method: "CASH",
        status: "COMPLETED",
        transactionId: `cash-${Date.now()}`,
      },
    });

    // Update booking status to confirmed
    await prisma.booking.update({
      where: { id: data.bookingId },
      data: { status: "CONFIRMED" },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return {
      success: true,
      paymentId: payment.id,
    };
  } catch (error) {
    console.error("Cash payment processing error:", error);
    return { success: false, error: "Cash payment recording failed" };
  }
}

/**
 * Get payment status
 */
export async function getPaymentStatus(paymentId: string) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        id: true,
        status: true,
        amount: true,
        method: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!payment) {
      return { success: false, error: "Payment not found" };
    }

    return { success: true, payment };
  } catch (error) {
    console.error("Get payment status error:", error);
    return { success: false, error: "Failed to get payment status" };
  }
}

/**
 * Get payments for a user
 */
export async function getUserPayments(userId: string) {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId },
      include: {
        booking: {
          select: {
            id: true,
            room: {
              select: {
                roomNumber: true,
                type: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, payments };
  } catch (error) {
    console.error("Get user payments error:", error);
    return { success: false, error: "Failed to get payments" };
  }
}
