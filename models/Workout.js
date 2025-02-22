const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  exercises: [{ name: String, sets: Number, reps: Number }],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
