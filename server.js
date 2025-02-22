require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes (Example)
app.get("/", (req, res) => {
  res.send("Workout Tracker API is running...");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
