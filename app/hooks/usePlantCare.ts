import { useState, useEffect } from "react";
import { getRandomInt } from "../utils/plantUtils";

export function usePlantCare(
  moisture: number | null,
  selectedPlantDetails: any,
  forecast: any[]
) {
  const [waterAmount, setWaterAmount] = useState<string | null>(null);
  const [urgentWateringMessage, setUrgentWateringMessage] =
    useState<boolean>(false);

  useEffect(() => {
    if (!selectedPlantDetails || forecast.length === 0 || moisture === null)
      return;

    const { minNormal } = selectedPlantDetails;

    let newWaterAmount: string | null = null;

    if (moisture < minNormal) {
      newWaterAmount = getRandomInt(40, 50).toString();
    } else if (moisture >= minNormal && moisture <= minNormal + 2) {
      newWaterAmount = getRandomInt(35, 40).toString();
    } else if (moisture >= minNormal && moisture <= minNormal + 4) {
      newWaterAmount = getRandomInt(30, 38).toString();
    } else if (moisture >= minNormal && moisture <= minNormal + 6) {
      newWaterAmount = getRandomInt(25, 30).toString();
    } else {
      newWaterAmount = "-";
    }

    setWaterAmount(newWaterAmount);
  }, [selectedPlantDetails, moisture, forecast]);

  useEffect(() => {
    if (!selectedPlantDetails || forecast.length === 0 || moisture === null)
      return;

    const { minNormal } = selectedPlantDetails;

    if (moisture < minNormal) {
      setUrgentWateringMessage(true);
    }
  }, [moisture, selectedPlantDetails, forecast]);

  return {
    waterAmount,
    urgentWateringMessage,
    setUrgentWateringMessage,
  };
}
