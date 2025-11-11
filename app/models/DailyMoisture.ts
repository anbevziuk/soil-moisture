import mongoose from "mongoose";

const today = new Date();
const dateString = today.toLocaleDateString("uk-UA").replaceAll(".", "-");

const MoistureSchema = new mongoose.Schema({
  moisture: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const DailyMoistureModel =
  mongoose.models[dateString] || mongoose.model(dateString, MoistureSchema);

export default DailyMoistureModel;
