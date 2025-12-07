const { querySales } = require("../utils/querySales");
const { loadDashboardSummary } = require("../utils/loadDashboard");

async function getSalesService(options) {
  return querySales(options);
}

async function getDashboardSummaryService() {
  return loadDashboardSummary();
}

module.exports = {
  getSalesService,
  getDashboardSummaryService,
};
