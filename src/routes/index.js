const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth/authRoutes");
const expenseRoutes = require("./expenses/expenseRoutes");
const reportRoutes = require("./reports/reportRoutes");

// Mount routes under /api prefix
router.use("/api", authRoutes);
router.use("/api", expenseRoutes);
router.use("/api", reportRoutes);

module.exports = router;
