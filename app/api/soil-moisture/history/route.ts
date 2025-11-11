import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
export const dynamic = "force-dynamic";

const getCurrentDateString = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

export async function GET() {
  try {
    const currentDate = getCurrentDateString();
    const db = await dbConnect();

    const moistureHistory = await db
      .collection(currentDate)
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json({ data: moistureHistory });
  } catch (error: any) {
    console.error("Помилка при отриманні даних:", error);
    return NextResponse.json(
      {
        message: "Помилка при отриманні даних",
        error: error.message ?? "Невідома помилка",
      },
      { status: 500 }
    );
  }
}
