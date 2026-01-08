import express from "express";
import DayResolution from "../models/dayResolution.js";

const router = express.Router();

/* 🔹 GET resolutions for a date */
router.get("/:date", async (req, res) => {
  const data = await DayResolution.findOne({ date: req.params.date });
  res.json(data);
});

/* 🔹 CREATE or UPDATE resolutions for a date */
router.post("/", async (req, res) => {
  const { date, resolutions } = req.body;

  let dayData = await DayResolution.findOne({ date });

  if (dayData) {
    dayData.resolutions = resolutions;
    await dayData.save();
  } else {
    dayData = new DayResolution({ date, resolutions });
    await dayData.save();
  }

  res.json(dayData);
});

/* 🔹 DELETE one resolution */
router.delete("/:date/:id", async (req, res) => {
  const { date, id } = req.params;

  const dayData = await DayResolution.findOne({ date });
  if (!dayData) return res.json(null);

  dayData.resolutions = dayData.resolutions.filter(
    (r) => r._id.toString() !== id
  );

  await dayData.save();
  res.json(dayData);
});

export default router;
