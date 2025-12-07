// backend/src/routes/salesRoutes.js
const express = require("express");
const router = express.Router();
const {
  getSales,
  getDashboardSummary,
} = require("../controllers/salesController");

router.get("/dashboard", getDashboardSummary);
router.get("/sales", getSales);

module.exports = router;
