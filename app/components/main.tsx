"use client";
import { useState } from "react";
import Image from "next/image";
import classes from "./main.module.css";
import MoistureChart from "./MoistureChart";
import {
  getMoistureStatus,
  getImagePath,
  getBorderColor,
} from "../utils/plantUtils";
import { usePlantData } from "../hooks/usePlantData";
import { usePlantCare } from "../hooks/usePlantCare";
import { PlantSelector } from "./PlantSelector";
import { PlantTable } from "./PlantTable";
import { Modal } from "./Modal";
import { ChartSelector } from "./ChartSelector";

export default function Main() {
  const {
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
    plants,
    forecast,
    currentTemperature,
  } = usePlantData();

  const [selectedPlant, setSelectedPlant] = useState<string>("");
  const [selectedPlantDetails, setSelectedPlantDetails] = useState<any>(null);

  const { waterAmount, urgentWateringMessage, setUrgentWateringMessage } =
    usePlantCare(moisture, selectedPlantDetails, forecast);

  return (
    <div className={classes.wrapper}>
      {airHumidity !== null && (
        <div
          className={`${classes.airHumidity} ${airHumidity ? "visible" : ""}`}
        >
          Вологість повітря: {airHumidity}%
          {currentTemperature !== null && ( // Додаємо перевірку на наявність температури
            <span> | Температура: {currentTemperature}°C</span> // Виводимо температуру
          )}
        </div>
      )}

      <div className={classes.data}>
        <h1 className={classes.header}>Дані про рослину</h1>

        {moisture !== null ? (
          <>
            <p>
              Останнє значення вологості було виміряно <b>{lastTime}</b> і було
              рівне <b>{moisture}%</b>.
            </p>

            <PlantSelector
              selectedPlant={selectedPlant}
              plants={plants}
              setSelectedPlant={setSelectedPlant}
              setSelectedPlantDetails={setSelectedPlantDetails}
            />

            {selectedPlantDetails && (
              <div className={classes.plantDescription}>
                <h3>Інструкції по догляду:</h3>
                <p>{selectedPlantDetails.careInstructions}</p>

                <h3>Характеристики вологості:</h3>
                <ul>
                  <li>
                    Суха зона: {selectedPlantDetails.minDry}% -{" "}
                    {selectedPlantDetails.maxDry}%
                  </li>
                  <li>
                    Норма: {selectedPlantDetails.minNormal}% -{" "}
                    {selectedPlantDetails.maxNormal}%
                  </li>
                  <li>
                    Перезволоження: {selectedPlantDetails.minFlooded}% -{" "}
                    {selectedPlantDetails.maxFlooded}%
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <p>Завантаження даних...</p>
        )}
      </div>

      <PlantTable
        selectedPlant={selectedPlant}
        moisture={moisture}
        airHumidity={airHumidity}
        selectedPlantDetails={selectedPlantDetails}
        forecast={forecast}
      />

      {urgentWateringMessage && (
        <Modal
          message="Терміново потрібно полити рослину! <br /> Перевірте стан ґрунту і полийте якомога швидше."
          onClose={() => setUrgentWateringMessage(false)}
        />
      )}

      <Image
        src={getImagePath(moisture, selectedPlantDetails)}
        width={420}
        height={420}
        style={{
          borderRadius: "50%",
          border: `4px solid ${getBorderColor(moisture, selectedPlantDetails)}`,
        }}
        alt="Photo of plant"
      />

      <div className={classes.plantInfo}>
        <p>
          <b>{getMoistureStatus(moisture, selectedPlantDetails)}</b>
        </p>
      </div>

      <ChartSelector
        chartType={chartType}
        setChartType={setChartType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {history.length > 0 ? (
        <MoistureChart
          data={history}
          // chartType={chartType}
          // date={selectedDate}
        />
      ) : (
        showMessage && (
          <Modal
            message="Немає даних для відображення графіка. <br /> Спробуйте обрати інші параметри."
            onClose={() => setShowMessage(false)}
          />
        )
      )}
      <div className={classes.chartSpacing}></div>
    </div>
  );
}
