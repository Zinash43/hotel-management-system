"use server";

/**
 * Server actions for booking management
 */

import { PrismaClient } from "../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Singleton pattern to prevent opening too many connections to Neon
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

type BookingResult =
  | { success: true; bookingId: string }
  | { success: false; error: string };

/**
 * Create a new booking
 */
export async function createBooking(data: {
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}): Promise<BookingResult> {
  try {
    // Get authenticated user
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { success: false, error: "User not authenticated" };
    }

    // Find or create user record
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUserId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
      });
    }

    // Check room availability
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomId: data.roomId,
        status: { in: ["CONFIRMED", "CHECKED_IN"] },
        OR: [
          {
            AND: [
              { checkInDate: { lte: data.checkInDate } },
              { checkOutDate: { gt: data.checkInDate } },
            ],
          },
          {
            AND: [
              { checkInDate: { lt: data.checkOutDate } },
              { checkOutDate: { gte: data.checkOutDate } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      return {
        success: false,
        error: "Room is not available for the selected dates",
      };
    }

    // Get room price
    const room = await prisma.room.findUnique({
      where: { id: data.roomId },
    });

    if (!room) {
      return { success: false, error: "Room not found" };
    }

    // Calculate total amount
    const nights = Math.ceil(
      (data.checkOutDate.getTime() - data.checkInDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const totalAmount = nights * room.price;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        roomId: data.roomId,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        guestCount: data.guestCount,
        totalAmount,
        specialRequests: data.specialRequests,
        status: "PENDING", // Will be updated to CONFIRMED after payment
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Booking creation error:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

/**
 * Get user bookings
 */
export async function getUserBookings(userId?: string) {
  try {
    const { userId: clerkUserId } = await auth();
    const targetUserId = userId || clerkUserId;

    if (!targetUserId) {
      return { success: false, error: "User not authenticated" };
    }

    // Find user record
    const user = await prisma.user.findUnique({
      where: { clerkId: targetUserId },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        room: {
          select: {
            id: true,
            roomNumber: true,
            type: true,
            price: true,
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            method: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, bookings };
  } catch (error) {
    console.error("Get user bookings error:", error);
    return { success: false, error: "Failed to get bookings" };
  }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED",
) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return { success: true, booking };
  } catch (error) {
    console.error("Update booking status error:", error);
    return { success: false, error: "Failed to update booking status" };
  }
}
