const express = require("express");
const Workout = require("../models/Workout");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Workout
router.post("/", authMiddleware, async (req, res) => {
  const { name, exercises } = req.body;
  try {
    const workout = new Workout({ user: req.user.id, name, exercises });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Workouts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
