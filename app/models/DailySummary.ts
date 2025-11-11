import mongoose from "mongoose";

const DailySummarySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  avg: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.DailySummary ||
  mongoose.model("DailySummary", DailySummarySchema);
