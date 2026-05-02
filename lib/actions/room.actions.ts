"use server";

/**
 * IMPORTANT: We are using the custom path indicated by your terminal
 * to resolve the "Cannot find module" error.
 */

import { PrismaClient } from "../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// Singleton pattern to prevent opening too many connections to Neon
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create adapter and client
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

type CreatedRoom = Awaited<ReturnType<typeof prisma.room.create>>;

type CreateRoomResult =
  | { success: true; room: CreatedRoom }
  | { success: false; error: string };

/**
 * CREATE: Adds a new room to the Neon database
 */
export async function createRoom(data: {
  number: string;
  type: string;
  price: number;
}): Promise<CreateRoomResult> {
  try {
    const newRoom = await prisma.room.create({
      data: {
        roomNumber: data.number,
        type: data.type,
        price: Number(data.price), // Ensure price is handled as a number
        status: "AVAILABLE",
      },
    });

    // Refresh the admin dashboard data immediately
    revalidatePath("/admin");
    return { success: true, room: newRoom };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      error: "Room number already exists or connection failed.",
    };
  }
}

/**
 * READ: Fetches all rooms for the management dashboard
 */
export async function getRooms() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { roomNumber: "asc" },
    });
    return { success: true, rooms };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, error: "Could not fetch rooms." };
  }
}

/**
 * UPDATE: Modifies existing room details
 */
export async function updateRoom(
  id: string,
  data: { number?: string; type?: string; price?: number; status?: string },
) {
  try {
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        roomNumber: data.number,
        type: data.type,
        price: data.price ? Number(data.price) : undefined,
        status: data.status,
      },
    });

    revalidatePath("/admin");
    return { success: true, room: updatedRoom };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "Failed to update room details." };
  }
}

/**
 * DELETE: Removes a room from the database
 */
export async function deleteRoom(id: string) {
  try {
    await prisma.room.delete({ where: { id } });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Delete failed." };
  }
}
