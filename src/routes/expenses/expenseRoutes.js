const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { body, param } = require("express-validator");
const validateRequest = require("../../middleware/validationMiddleware");
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenseById
} = require("../../controllers/expenseController");

router.use(auth);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Fetch all expenses for logged-in user
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
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
 */
router.post(
  "/expenses",
  [
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
 */
router.delete(
  "/expenses/:id",
  [param("id").notEmpty().withMessage("Expense ID is required")],
  validateRequest,
  deleteExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Fetch a single expense by ID
 *     tags:
 *       - Expenses
 */
router.get(
  "/expenses/:id",
  [param("id").notEmpty().withMessage("Expense ID is required")],
  validateRequest,
  getExpenseById
);

module.exports = router;
