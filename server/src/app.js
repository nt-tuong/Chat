const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
