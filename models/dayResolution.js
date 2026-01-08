import mongoose from "mongoose";

const resolutionSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
});

const dayResolutionSchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true,
    unique: true,
  },
  resolutions: [resolutionSchema],
});

export default mongoose.model("DayResolution", dayResolutionSchema);
