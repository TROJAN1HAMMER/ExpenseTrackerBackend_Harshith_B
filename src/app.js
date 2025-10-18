// src/app.js
const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const setupSwagger = require("./swagger");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Mount routes
app.use(routes);

// Setup Swagger
setupSwagger(app);

app.use(errorHandler);

// Default health route
app.get("/", (req, res) => {
  res.send("✅ Expense Tracker API is running");
});

module.exports = app;