import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Phoebee Backend is running 🚀");
});

const log_request = async (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next()
};

// 🔗 API ROUTES
import resolutionRoutes from "./routes/resolutionRoutes.js";
app.use("/api/resolutions", log_request,resolutionRoutes);

// 🔗 DB CONNECT
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
