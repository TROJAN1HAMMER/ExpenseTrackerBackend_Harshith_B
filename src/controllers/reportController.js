const Expense = require("../models/Expense");

// GET /api/reports/monthly?month=MM&year=YYYY
exports.getMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ message: "month and year required" });
    }

    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const expenses = await Expense.find({
      userUid: req.user.uid,
      date: { $gte: start, $lt: end }
    });

    // Calculate totals
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const categories = {};
    expenses.forEach((e) => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });

    res.json({ total, categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/reports/category?category=Food
exports.getCategoryReport = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "category required" });
    }

    const expenses = await Expense.find({
      userUid: req.user.uid,
      category
    }).select("title amount date -_id");

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
