import mongoose from "mongoose";

const resolutionSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  resolutions: [
    {
      text: String,
      done: Boolean,
    },
  ],
});

const Resolution = mongoose.model("Resolution", resolutionSchema);
export default Resolution;
