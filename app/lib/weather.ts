const apiKey = "8b2bdec517b74f95a6a70301252704";
const lat = 49.8397; // Львів
const lon = 24.0297; // Львів

interface WeatherData {
  currentHumidity: number;
  currentTemperature: number; // Додано для температури
  forecastHumidity: number[];
}

export async function getCurrentAndForecastHumidity(): Promise<
  WeatherData | undefined
> {
  console.log("getCurrentAndForecastHumidity викликана");
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`;

  try {
    const response = await fetch(url);
    console.log("Response отримано", response);

    if (!response.ok) {
      throw new Error("Не вдалося отримати дані погоди");
    }

    const data = await response.json();
    console.log("Weather Data:", data);

    // Перевірка на наявність температури в відповіді
    if (data && data.current && data.current.temp_c !== undefined) {
      const currentHumidity = data.current.humidity;
      const currentTemperature = data.current.temp_c; // температура (за Цельсієм)
      const forecastHumidity = data.forecast.forecastday.map(
        (day: any) => day.day.avghumidity
      );

      console.log("Current Humidity:", currentHumidity);
      console.log("Current Temperature:", currentTemperature); // температура
      console.log("Forecast Humidity:", forecastHumidity);

      return {
        currentHumidity,
        currentTemperature, // додаємо температуру до повернутого об'єкта
        forecastHumidity,
      };
    } else {
      console.error("Температура не знайдена в відповіді:", data);
      return undefined; // Повертаємо undefined, якщо дані не знайдені
    }
  } catch (e) {
    console.error("Помилка при завантаженні даних погоди:", e);
    return undefined; // Повертаємо undefined, якщо сталася помилка
  }
}
