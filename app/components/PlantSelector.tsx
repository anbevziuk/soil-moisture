import classes from "./main.module.css";
import { handlePlantChange } from "../utils/handlers";

export function PlantSelector({
  selectedPlant,
  plants,
  setSelectedPlant,
  setSelectedPlantDetails,
}: {
  selectedPlant: string;
  plants: { name: string; careInstructions: string }[];
  setSelectedPlant: (value: string) => void;
  setSelectedPlantDetails: (value: any) => void;
}) {
  return (
    <div className={classes.selector}>
      <label>Оберіть рослину: </label>
      <select
        value={selectedPlant}
        onChange={(e) =>
          handlePlantChange(
            e,
            plants,
            setSelectedPlant,
            setSelectedPlantDetails
          )
        }
      >
        <option value="">-- Виберіть рослину --</option>
        {plants.map((plant) => (
          <option key={plant.name} value={plant.name}>
            {plant.name}
          </option>
        ))}
      </select>
    </div>
  );
}
