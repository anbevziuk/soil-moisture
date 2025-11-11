import cron from "node-cron";
import summarizeDailyMoisture from "./summarize";

export function startDailySummaryJob() {
  // кожен день в 23 59
  cron.schedule("59 23 * * *", async () => {
    console.log("🔁 Запуск агрегації вологості...");
    await summarizeDailyMoisture();
  });
}
