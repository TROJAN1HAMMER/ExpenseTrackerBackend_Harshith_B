const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const validateRequest = require("../../middleware/validationMiddleware");
const {
  getMonthlyReport,
  getCategoryReport
} = require("../../controllers/reportController");

router.use(auth);

/**
 * @swagger
 * /reports/monthly:
 *   get:
 *     summary: Get total and category-wise expense summary for a month
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *         description: Month in MM format
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025"
 *         description: Year in YYYY format
 *     responses:
 *       200:
 *         description: Monthly report data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 categories:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                     example: 2000
 *       401:
 *         description: Unauthorized
 */
router.get("/reports/monthly", getMonthlyReport);

/**
 * @swagger
 * /reports/category:
 *   get:
 *     summary: Get expenses filtered by category
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           example: "Food"
 *         description: Category to filter expenses by
 *     responses:
 *       200:
 *         description: List of expenses in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized
 */
router.get("/reports/category", getCategoryReport);

module.exports = router;
