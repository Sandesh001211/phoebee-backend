import express from "express";
import Resolution from "../models/Resolution.js";

const router = express.Router();

/* 🔹 GET BY DATE */
router.get("/:date", async (req, res) => {
  try {
    const data = await Resolution.findOne({
      date: req.params.date,
    });

    res.json(data);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 SAVE / UPDATE */
router.post("/", async (req, res) => {
  const { date, resolutions } = req.body;

  try {
    const saved = await Resolution.findOneAndUpdate(
      { date },
      { resolutions },
      { new: true, upsert: true }
    );

    res.json(saved);
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
