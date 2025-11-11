export function handlePlantChange(
  e: React.ChangeEvent<HTMLSelectElement>,
  plants: { name: string; careInstructions: string }[],
  setSelectedPlant: (value: string) => void,
  setSelectedPlantDetails: (value: any) => void
) {
  const plantName = e.target.value;
  setSelectedPlant(plantName);
  const plant = plants.find((p) => p.name === plantName);
  if (plant) {
    setSelectedPlantDetails(plant);
  } else {
    setSelectedPlantDetails(null);
  }
}
