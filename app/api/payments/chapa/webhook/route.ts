import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify webhook (in production, verify Chapa signature)
    const { tx_ref, status, amount } = body;

    if (!tx_ref || !status) {
      return NextResponse.json(
        { error: "Missing required webhook data" },
        { status: 400 },
      );
    }

    // Find the payment record by Chapa transaction ID
    const payment = await prisma.payment.findFirst({
      where: { chapaTransactionId: tx_ref },
    });

    if (!payment) {
      console.error("Payment not found for transaction:", tx_ref);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Handle different Chapa webhook events
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        await handleChapaPaymentSuccess(payment, tx_ref);
        break;

      case "failed":
      case "cancelled":
        await handleChapaPaymentFailure(payment);
        break;

      default:
        console.log(`Unhandled Chapa webhook status: ${status}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Chapa webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}

async function handleChapaPaymentSuccess(payment: any, txRef: string) {
  try {
    // Update payment status to completed
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "COMPLETED",
        transactionId: txRef,
      },
    });

    // Update booking status if needed
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: "CONFIRMED" },
    });

    console.log("Chapa payment completed successfully:", payment.id);
  } catch (error) {
    console.error("Error handling Chapa payment success:", error);
  }
}

async function handleChapaPaymentFailure(payment: any) {
  try {
    // Update payment status to failed
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "FAILED" },
    });

    console.log("Chapa payment failed:", payment.id);
  } catch (error) {
    console.error("Error handling Chapa payment failure:", error);
  }
}
