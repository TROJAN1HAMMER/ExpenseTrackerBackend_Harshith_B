// src/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userUid: { type: String, required: true, index: true }, 
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// optional: auto-sort newest first
expenseSchema.index({ userUid: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);
