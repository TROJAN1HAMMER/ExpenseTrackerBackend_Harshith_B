const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { body, param } = require("express-validator"); 
const validateRequest = require("../../middleware/validationMiddleware");
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require("../../controllers/expenseController");

router.use(auth);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Fetch all expenses for the logged-in user
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
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
 *                   category:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized
 */
router.get("/expenses", getExpenses);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post("/expenses", [
    body("title").notEmpty().withMessage("Title is required"),
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("date").isISO8601().withMessage("Date must be a valid date")
  ],
  validateRequest,
  addExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.put(
  "/expenses/:id",
  [
    param("id").notEmpty().withMessage("Expense ID is required"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("amount").optional().isNumeric().withMessage("Amount must be a number"),
    body("category").optional().notEmpty().withMessage("Category cannot be empty"),
    body("date").optional().isISO8601().withMessage("Date must be a valid date")
  ],
  validateRequest,
  updateExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.delete("/expenses/:id", [param("id").notEmpty().withMessage("Expense ID is required")],
  validateRequest,
  deleteExpense
);

module.exports = router;
