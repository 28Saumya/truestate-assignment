// backend/src/controllers/salesController.js
const {
  getDashboardSummary,
  getSalesPage,
} = require("../utils/csvService");

// GET /api/dashboard
exports.getDashboardSummary = async (req, res) => {
  try {
    const summary = await getDashboardSummary();
    res.json(summary);
  } catch (err) {
    console.error("Error in getDashboardSummary:", err);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

// GET /api/sales
exports.getSales = async (req, res) => {
  try {
    const {
      search = "",
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      paymentMethod,
      startDate,
      endDate,
      sortBy = "date",
      sortOrder = "desc",
      page = "1",
      pageSize = "10",
    } = req.query;

    const result = await getSalesPage({
      search,
      region,
      gender,
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      category,
      tags,
      paymentMethod,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
    });

    res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: "Failed to load sales data" });
  }
};
