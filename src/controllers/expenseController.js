// src/controllers/expenseController.js

const Expense = require("../models/Expense");

// Get all expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userUid: req.user.uid }); // ✅ lowercase i
    res.json(expenses);
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
      userUid: req.user.uid, // ✅ lowercase i
      title,
      amount,
      category,
      date
    });
    res
      .status(201)
      .json({ message: "Expense added successfully", id: expense._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userUid: req.user.uid }, // ✅ lowercase i
      req.body,
      { new: true }
    );
    if (!expense)
      return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({
      _id: id,
      userUid: req.user.uid, // ✅ lowercase i
    });
    if (!expense)
      return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
