const Expense = require("../models/Expense");

// Get all expenses for logged-in user
// Get all expenses for logged-in user (with optional filtering/sorting)
exports.getExpenses = async (req, res, next) => {
  try {
    const { category, minAmount, maxAmount, sort, order, startDate, endDate } = req.query;
    const query = { userUid: req.user.uid };

    // 🔹 Optional filters
    if (category) query.category = category;
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // 🔹 Sorting (default: newest first)
    const sortOrder = order === "asc" ? 1 : -1;
    const sortField = sort || "date";

    const expenses = await Expense.find(query).sort({ [sortField]: sortOrder });
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
     res.json({err}); // pass to global error handler
  }
};


// Get a specific expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userUid: req.user.uid });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const expense = await Expense.create({
      userUid: req.user.uid,
      title,
      amount,
      category,
      date
    });
    res.status(201).json({ message: "Expense added successfully", id: expense._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userUid: req.user.uid },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userUid: req.user.uid });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
