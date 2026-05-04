import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: NextRequest) {
  try {
    const {
      bookingId,
      amount,
      currency = "ETB",
      customerInfo,
    } = await request.json();

    if (!bookingId || !amount || !customerInfo) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId, amount, customerInfo" },
        { status: 400 },
      );
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Generate unique transaction reference
    const txRef = `tx-${bookingId}-${Date.now()}`;

    // Chapa API integration (simplified - in production, use actual Chapa SDK)
    const chapaPayload = {
      amount: amount.toString(),
      currency,
      email: customerInfo.email,
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      phone_number: customerInfo.phone,
      tx_ref: txRef,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/chapa/webhook`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking?status=success`,
      customization: {
        title: "Hotel Booking Payment",
        description: `Payment for booking ${bookingId}`,
      },
    };

    // In production, make actual API call to Chapa
    // For now, simulate the response
    const chapaResponse = {
      status: "success",
      message: "Payment initialized",
      data: {
        checkout_url: `https://checkout.chapa.co/checkout/payment/${txRef}`,
        tx_ref: txRef,
      },
    };

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        userId: booking.userId,
        amount,
        currency,
        method: "CHAPA",
        status: "PENDING",
        chapaTransactionId: txRef,
      },
    });

    return NextResponse.json({
      checkoutUrl: chapaResponse.data.checkout_url,
      txRef: txRef,
      paymentId: payment.id,
    });
  } catch (error) {
    console.error("Chapa payment initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize Chapa payment" },
      { status: 500 },
    );
  }
}
