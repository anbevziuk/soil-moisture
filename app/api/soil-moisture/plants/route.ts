import Plant from "../../../models/Plant";
// app/api/soil-moisture/plants/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";          // <— важливо: підключення         // або відносний шлях, якщо немає alias

export const runtime = "nodejs";                // <— не edge
export const dynamic = "force-dynamic";         // (опційно у dev)

export async function GET() {
  try {
    await dbConnect();                          // ✅ чекаємо підключення

    const plants = await Plant.find(
      {},
      "name careInstructions minDry maxDry minNormal maxNormal minFlooded maxFlooded"
    ).lean();

    return NextResponse.json({ plants }, { status: 200 });
  } catch (error) {
    console.error("Помилка при отриманні рослин:", error);
    return NextResponse.json(
      { error: "Не вдалося отримати список рослин" },
      { status: 500 }
    );
  }
}
