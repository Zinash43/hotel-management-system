"use server";

type RoomData = {
  number: string;
  type: string;
  price: number;
};

export async function createRoom(data: RoomData) {
  return {
    success: true,
    room: {
      id: typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : String(Date.now()),
      roomNumber: data.number,
      type: data.type,
      price: data.price,
      status: "Available",
    },
  };
}

export async function deleteRoom(id: string) {
  return {
    success: true,
  };
}
