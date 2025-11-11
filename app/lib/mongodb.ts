// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("❌ Будь ласка, визнач MONGODB_URI у .env.local");
}

export default async function dbConnect(): Promise<mongoose.Connection> {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("✅ MongoDB підключено");
    return conn.connection;
  } catch (error) {
    console.error("❌ Помилка підключення до MongoDB:", error);
    throw error;
  }
}
