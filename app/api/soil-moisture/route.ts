import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "../../lib/mongodb";
import DailyMoistureModel from "../../models/DailyMoisture";

// ======= 1. Конфіг =======
const DEVICE_TOKEN = process.env.DEVICE_TOKEN || "my-device-token";
const DEVICE_SECRET = process.env.DEVICE_SECRET || "super-secret-key";

// проста функція для безпечного порівняння підпису
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
function verifyHMAC(payload: string, signatureHex: string): boolean {
  try {
    const expected = crypto.createHmac("sha256", DEVICE_SECRET).update(payload).digest(); // Buffer
    const got = Buffer.from((signatureHex || '').trim(), 'hex');
    return got.length === expected.length && crypto.timingSafeEqual(got, expected);
  } catch {
    return false;
  }
}

// ======= 2. POST (захищений запис) =======
export async function POST(request: Request) {
  try {
    // ✅ Перевірка токена
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${DEVICE_TOKEN}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Отримуємо сирий body (щоб зберегти точність підпису)
    const rawBody = await request.text();

    // ✅ Перевірка підпису (HMAC)
    const signature = request.headers.get("x-signature");
    if (!signature || !verifyHMAC(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // ✅ Парсимо тіло
    const { moisture } = JSON.parse(rawBody);
    if (typeof moisture !== "number") {
      return NextResponse.json(
        { error: "Некоректне значення вологості" },
        { status: 400 }
      );
    }

    // ✅ Підключення до БД і запис
    await dbConnect();
    const newMoisture = new DailyMoistureModel({ moisture });
    await newMoisture.save();

    return NextResponse.json(
      { message: "Дані збережено", data: newMoisture },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Помилка POST /soil-moisture:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

// ======= 3. GET (залишаємо як є) =======
export async function GET() {
  try {
    await dbConnect();

    const latestData = await DailyMoistureModel.findOne().sort({ timestamp: -1 });
    if (!latestData) {
      return NextResponse.json({ error: "Дані не знайдено" }, { status: 404 });
    }

    return NextResponse.json({ data: latestData }, { status: 200 });
  } catch (error) {
    console.error("❌ Помилка GET /soil-moisture:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export const runtime = "nodejs"; // обов’язково для mongoose у Vercel
export const revalidate = 60;
