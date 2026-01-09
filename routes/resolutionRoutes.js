import express from "express";
import Resolution from "../models/dayResolution.js";

const router = express.Router();

/* SAVE OR UPDATE */
router.post("/", async (req, res) => {
  const { date, resolutions } = req.body;

  try {
    const updated = await Resolution.findOneAndUpdate(
      { date },
      { resolutions },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET BY DATE */
router.get("/:date", async (req, res) => {
  try {
    const data = await Resolution.findOne({ date: req.params.date });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
