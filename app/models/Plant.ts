// models/Plant.ts
import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

// Схема рослин
const PlantSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    careInstructions: { type: String, required: true },
    minDry: { type: Number, required: true },
    maxDry: { type: Number, required: true },
    minNormal: { type: Number, required: true },
    maxNormal: { type: Number, required: true },
    minFlooded: { type: Number, required: true },
    maxFlooded: { type: Number, required: true },
  },
  { timestamps: true }
);

// Тип для документа
export type PlantDoc = InferSchemaType<typeof PlantSchema>;

// ✅ Використовуємо кешовану модель, щоб уникнути помилок при hot-reload
const Plant: Model<PlantDoc> =
  (mongoose.models.Plant as Model<PlantDoc>) ||
  mongoose.model<PlantDoc>("Plant", PlantSchema);

export default Plant;
