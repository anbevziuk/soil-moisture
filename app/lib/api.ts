import { getCurrentAndForecastHumidity } from "./weather";

export async function fetchPlants() {
  try {
    const response = await fetch("/api/soil-moisture/plants");
    const data = await response.json();
    return data.plants;
  } catch (e) {
    console.error("Помилка при завантаженні рослин:", e);
    return [];
  }
}

export async function fetchAirHumidity() {
  try {
    const data = await getCurrentAndForecastHumidity();
    if (data) {
      const { currentHumidity, currentTemperature, forecastHumidity } = data; // отримуємо також поточну температуру
      console.log("Поточна вологість:", currentHumidity);
      console.log("Поточна температура:", currentTemperature); // виводимо температуру
      console.log("Прогноз вологості на наступні 7 днів:", forecastHumidity);

      return { currentHumidity, currentTemperature, forecastHumidity }; // додаємо температуру в результат
    } else {
      throw new Error("Дані про вологість не були отримані.");
    }
  } catch (e) {
    console.error("Помилка завантаження вологості:", e);
    return {
      currentHumidity: null,
      currentTemperature: null,
      forecastHumidity: [],
    };
  }
}

export async function fetchLatest() {
  try {
    const res = await fetch("/api/soil-moisture");
    if (!res.ok) throw new Error(`Помилка при запиті: ${res.status}`);
    const json = await res.json();
    const { moisture: m, timestamp } = json.data;
    return { moisture: m, timestamp: new Date(timestamp).toLocaleString() };
  } catch (e) {
    console.error(e);
    return { moisture: null, timestamp: "" };
  }
}

export async function fetch7Days() {
  try {
    const res = await fetch("/api/soil-moisture/history/7days");
    if (!res.ok) throw new Error(`Помилка при запиті: ${res.status}`);
    const json = await res.json();
    console.log(json);
    const formattedData = json.data
      .map((entry: any) => ({
        moisture: entry.moisture,
        timestamp: new Date(entry.timestamp),
      }))
      .sort(
        (a: { timestamp: number }, b: { timestamp: number }) =>
          a.timestamp - b.timestamp
      )
      .map((entry: any) => ({
        moisture: entry.moisture,
        timestamp: entry.timestamp.toLocaleDateString("uk-UA"),
      }));
    console.log(formattedData);
    return formattedData;
  } catch (e) {
    console.error("Помилка завантаження за останні 7 днів:", e);
    return [];
  }
}

export async function fetchHistory() {
  try {
    const res = await fetch("/api/soil-moisture/history");
    if (!res.ok) throw new Error(`Помилка при запиті: ${res.status}`);
    const json = await res.json();
    const formattedData = json.data
      .map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      }))
      .sort(
        (
          a: { timestamp: { getTime: () => number } },
          b: { timestamp: { getTime: () => number } }
        ) => a.timestamp.getTime() - b.timestamp.getTime()
      )
      .map((entry: any) => ({
        ...entry,
        timestamp: entry.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    return formattedData;
  } catch (e) {
    console.error("Помилка завантаження історії:", e);
    return [];
  }
}

export async function fetchByDate(date: string) {
  try {
    const res = await fetch(`/api/soil-moisture/history/${date}`);
    if (!res.ok) throw new Error(`Помилка при запиті: ${res.status}`);
    const json = await res.json();
    const formattedData = json.data
      .map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      }))
      .sort(
        (
          a: { timestamp: { getTime: () => number } },
          b: { timestamp: { getTime: () => number } }
        ) => a.timestamp.getTime() - b.timestamp.getTime()
      )
      .map((entry: any) => ({
        ...entry,
        timestamp: entry.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    return formattedData;
  } catch (e) {
    console.error("Помилка завантаження за датою:", e);
    return [];
  }
}
