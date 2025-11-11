import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";

export const dynamic = "force-dynamic";

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await context.params;

    const formattedDate = formatDate(date);

    const db = await dbConnect();

    const moistureHistory = await db
      .collection(formattedDate)
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json({ data: moistureHistory });
  } catch (error: any) {
    console.error("Помилка при отриманні даних за датою:", error);
    return NextResponse.json(
      {
        message: "Помилка при отриманні даних",
        error: error.message ?? "Невідома помилка",
      },
      { status: 500 }
    );
  }
}
