import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import resolutionRoutes from "./routes/resolutionRoutes.js";

dotenv.config();

const app = express();

/* 🔴 THESE TWO LINES MUST BE BEFORE ROUTES */
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Phoebee backend is running 🚀");
});

/* 🔴 ROUTES AFTER json() */
app.use("/api/resolutions", resolutionRoutes);

const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
