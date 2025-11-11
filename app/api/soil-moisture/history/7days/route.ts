import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = await dbConnect();

    const moistureHistory = await db
      .collection("dailysummaries")
      .find()
      .sort({ date: -1 })

      .limit(7)
      .toArray();

    console.log("moistureHistory:", moistureHistory);

    const formattedData = moistureHistory.map((entry: any) => ({
      timestamp: entry.date.toISOString(),
      moisture: entry.avg,
    }));

    console.log("formattedData:", formattedData);

    return NextResponse.json({ data: formattedData });
  } catch (error: any) {
    console.error("Помилка при отриманні останніх 7 записів:", error);
    return NextResponse.json(
      {
        message: "Помилка при отриманні даних",
        error: error.message ?? "Невідома помилка",
      },
      { status: 500 }
    );
  }
}
