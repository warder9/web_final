const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);

// Serve index.html for any unknown route (so frontend works)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Connect to MongoDB & Start Server
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(10000, () => console.log("Server running on port 10000"));
});
