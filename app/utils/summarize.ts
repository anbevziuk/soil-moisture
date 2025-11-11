import dbConnect from "../lib/mongodb";
import mongoose from "mongoose";
import DailySummary from "../models/DailySummary";

function getCurrentDate() {
  return new Date(new Date().setHours(3, 0, 0, 0)); // встановлює час на 03:00:00 для бд
}

export default async function summarizeDailyMoisture() {
  await dbConnect();
  const date = getCurrentDate();
  const dateStr = date.toLocaleDateString("uk-UA").replaceAll(".", "-");

  const collection = mongoose.connection.collection(dateStr);

  const docs = await collection.find().toArray();
  if (!docs.length) return;

  const moistures = docs.map((doc: any) => doc.moisture);
  const avg = moistures.reduce((a, b) => a + b, 0) / moistures.length;
  const min = Math.min(...moistures);
  const max = Math.max(...moistures);

  await DailySummary.create({
    date: date,
    min,
    max,
    avg: +avg.toFixed(2),
  });

  console.log(`✅ Збережено зведення за ${dateStr}`);
}
