import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import resolutionRoutes from "./routes/resolutionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Phoebee Backend is running 🚀");
});

app.use("/api/resolutions", resolutionRoutes);

mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 15000,
  ssl: true,
  tlsAllowInvalidCertificates: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
