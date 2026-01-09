import mongoose from "mongoose";

const ResolutionSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Resolution", ResolutionSchema);
