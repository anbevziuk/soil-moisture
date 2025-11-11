export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getWater(waterAmount: string | null): string {
  return waterAmount ?? "Немає даних для прогнозу";
}

export function getDaysUntilNextWatering(
  moisture: number | null,
  selectedPlantDetails: any,
  forecast: any[]
): string {
  if (!selectedPlantDetails || forecast.length === 0 || moisture === null)
    return "Немає даних для прогнозу";

  const { minDry, maxDry, minNormal, maxNormal, minFlooded, maxFlooded } =
    selectedPlantDetails;

  if (moisture < minNormal) {
    return "Терміново потрібно полити рослину!";
  }

  if (moisture >= minNormal && moisture <= minNormal + 2) {
    return "Через 2 дні";
  }

  if (moisture >= minNormal && moisture <= minNormal + 4) {
    return "Через 3 дні";
  }
  if (moisture >= minNormal && moisture <= minNormal + 6) {
    return "Через 5 днів";
  }

  for (let i = 0; i < forecast.length; i++) {
    const predictedHumidity = forecast[i].humidity;
  }

  return "Полив не потрібен найближчими днями, не раніше ніж за 7 днів";
}

export function getMoistureStatus(
  moisture: number | null,
  selectedPlantDetails: any
): string {
  if (moisture === null) return "Завантаження...";

  if (selectedPlantDetails) {
    const { minDry, maxDry, minNormal, maxNormal, minFlooded, maxFlooded } =
      selectedPlantDetails;

    if (moisture >= minFlooded && moisture <= maxFlooded) {
      return "Рослина затоплена! Зменш полив!";
    }
    if (moisture >= minNormal && moisture <= maxNormal) {
      return "Вологість ідеальна!";
    }
    if (moisture >= minDry && moisture <= maxDry) {
      return "Грунт підсихає. Потрібно полити.";
    }
    if (moisture < minDry) {
      return "Терміново потрібно полити рослину!";
    }
    if (moisture > maxFlooded) {
      return "Занадто велика вологість! Будь обережний!";
    }
  }

  if (moisture > 85) return "Затоплено! Зменш полив.";
  if (moisture > 70) return "Все чудово!";
  if (moisture > 35) return "Нормально, але скоро можна буде полити.";
  return "Рослину необхідно полити!";
}

export function getImagePath(
  moisture: number | null,
  selectedPlantDetails: any
): string {
  if (moisture === null) return "/normal.png";

  if (selectedPlantDetails) {
    const { minDry, maxDry, minNormal, maxNormal, minFlooded, maxFlooded } =
      selectedPlantDetails;

    if (moisture >= minDry && moisture <= maxDry) {
      return "/dry.png";
    } else if (moisture >= minNormal && moisture <= maxNormal) {
      return "/normal.png";
    } else if (moisture >= minFlooded && moisture <= maxFlooded) {
      return "/flooded.png";
    }
  }
  return "/normal.png";
}

export function getBorderColor(
  moisture: number | null,
  selectedPlantDetails: any
): string {
  if (moisture === null) return "gray";

  if (selectedPlantDetails) {
    const { minDry, maxDry, minNormal, maxNormal, minFlooded, maxFlooded } =
      selectedPlantDetails;

    if (moisture >= minDry && moisture <= maxDry) {
      return "red";
    } else if (moisture >= minNormal && moisture <= maxNormal) {
      return "green";
    } else if (moisture >= minFlooded && moisture <= maxFlooded) {
      return "blue";
    }
  }
  return "gray";
}
