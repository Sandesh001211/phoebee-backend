import express from "express";
import Resolution from "../models/dayResolution.js";

const router = express.Router();

/* SAVE OR UPDATE RESOLUTIONS */
router.post("/", async (req, res) => {
  const { date, resolutions } = req.body;

  if (!date || !resolutions) {
    return res.status(400).json({ error: "Missing date or resolutions" });
  }

  try {
    const doc = await Resolution.findOneAndUpdate(
      { date },
      { date, resolutions },
      { upsert: true, new: true }
    );

    res.status(200).json(doc);
  } catch (error) {
    console.error("POST error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* GET RESOLUTIONS BY DATE */
router.get("/:date", async (req, res) => {
  try {
    const doc = await Resolution.findOne({ date: req.params.date });

    if (!doc) {
      return res.status(200).json(null);
    }

    res.status(200).json(doc);
  } catch (error) {
    console.error("GET error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
