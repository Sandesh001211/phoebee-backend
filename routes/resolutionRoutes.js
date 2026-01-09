import express from "express";
import Resolution from "../models/dayResolution.js";

const router = express.Router();

/* ===============================
   SAVE OR UPDATE RESOLUTIONS
================================ */
router.post("/", async (req, res) => {
  try {
    const { date, resolutions } = req.body;

    if (!date || !Array.isArray(resolutions)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const saved = await Resolution.findOneAndUpdate(
      { date },
      { date, resolutions },
      { upsert: true, new: true }
    );

    console.log("✅ Saved:", saved.date);
    res.json(saved);
  } catch (err) {
    console.error("❌ POST error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ===============================
   GET RESOLUTIONS BY DATE
================================ */
router.get("/:date", async (req, res) => {
  try {
    const doc = await Resolution.findOne({ date: req.params.date });
    console.log("📥 Fetched:", req.params.date, doc ? "FOUND" : "NULL");
    res.json(doc);
  } catch (err) {
    console.error("❌ GET error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
