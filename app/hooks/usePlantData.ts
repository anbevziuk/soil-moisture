import { useState, useEffect } from "react";
import {
  fetchPlants,
  fetchAirHumidity,
  fetchLatest,
  fetch7Days,
  fetchHistory,
  fetchByDate,
} from "../lib/api";

export function usePlantData() {
  const [moisture, setMoisture] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState<string>("");
  const [history, setHistory] = useState<
    { moisture: number; timestamp: string }[]
  >([]);
  const [chartType, setChartType] = useState<string>("today");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [airHumidity, setAirHumidity] = useState<number | null>(null);
  const [plants, setPlants] = useState<
    { name: string; careInstructions: string }[]
  >([]);
  const [forecast, setForecast] = useState<any[]>([]);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  ); // Додаємо стан для температури

  useEffect(() => {
    async function loadPlants() {
      const plantsData = await fetchPlants();
      setPlants(plantsData);
    }
    loadPlants();
  }, []);

  useEffect(() => {
    async function loadAirHumidity() {
      console.log("Завантаження даних про вологість та температуру...");
      const { currentHumidity, currentTemperature, forecastHumidity } =
        await fetchAirHumidity();

      console.log("Current Humidity from API:", currentHumidity);
      console.log("Current Temperature from API:", currentTemperature);

      setAirHumidity(currentHumidity);
      setCurrentTemperature(currentTemperature); // зберігаємо температуру
      setForecast(forecastHumidity);
    }
    loadAirHumidity();
  }, []);

  useEffect(() => {
    async function loadLatest() {
      const { moisture, timestamp } = await fetchLatest();
      setMoisture(moisture);
      setLastTime(timestamp);
    }
    loadLatest();
    const id = setInterval(loadLatest, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    async function loadHistory() {
      let data: { moisture: number; timestamp: string }[] = [];
      if (chartType === "byDate" && selectedDate) {
        data = await fetchByDate(selectedDate);
      } else if (chartType === "today") {
        data = await fetchHistory();
      } else if (chartType === "7days") {
        data = await fetch7Days();
      }
      setHistory(data);
      setShowMessage(data.length === 0);
    }
    loadHistory();
  }, [chartType, selectedDate]);

  return {
    moisture,
    lastTime,
    history,
    chartType,
    setChartType,
    selectedDate,
    setSelectedDate,
    showMessage,
    setShowMessage,
    airHumidity,
    currentTemperature, // Додаємо температуру
    plants,
    forecast,
  };
}
