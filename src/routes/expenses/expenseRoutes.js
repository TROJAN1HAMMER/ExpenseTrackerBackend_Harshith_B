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
 *     summary: Fetch all expenses for the logged-in user (supports filtering and sorting)
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *         description: Minimum expense amount
 *       - in: query
 *         name: maxAmount
 *         schema:
 *           type: number
 *         description: Maximum expense amount
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter expenses from this date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter expenses up to this date (YYYY-MM-DD)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [amount, date, category, title]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of filtered and sorted expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       category:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date
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
 *       201:
 *         description: Expense added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
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
 *       400:
 *         description: Validation error
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
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
 *         description: Expense details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.get(
  "/expenses/:id",
  [param("id").notEmpty().withMessage("Expense ID is required")],
  validateRequest,
  getExpenseById
);

module.exports = router;
