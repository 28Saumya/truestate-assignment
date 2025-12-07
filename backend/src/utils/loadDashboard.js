const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

let summaryCache = null;

function loadDashboardSummary() {
  if (summaryCache) return Promise.resolve(summaryCache);
const filePath = path.join(__dirname, "../data/sales_sample.csv");

  return new Promise((resolve, reject) => {
   

    let totalTransactions = 0;
    let totalRevenue = 0;
    let priceSum = 0;
    let priceCount = 0;
    const byCity = {};
    const sampleRows = [];
    const MAX_SAMPLE = 50;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        totalTransactions++;

        // Assignment column: Final Amount
        const priceRaw = row["Final Amount"];
        const price = parseFloat(priceRaw);
        if (!Number.isNaN(price)) {
          totalRevenue += price;
          priceSum += price;
          priceCount++;
        }

        // Use Store Location as "city"
        const city = row["Store Location"] || row["Customer Region"] || "Unknown";
        if (!byCity[city]) {
          byCity[city] = { count: 0, revenue: 0 };
        }
        byCity[city].count += 1;
        if (!Number.isNaN(price)) byCity[city].revenue += price;

        if (sampleRows.length < MAX_SAMPLE) {
          sampleRows.push(row);
        }
      })
      .on("end", () => {
        const avgPrice = priceCount ? priceSum / priceCount : 0;

        const salesByCity = Object.entries(byCity).map(([city, info]) => ({
          city,
          transactions: info.count,
          revenue: info.revenue,
        }));

        summaryCache = {
          totalTransactions,
          totalRevenue,
          avgPrice,
          salesByCity,
          sampleRows,
        };

        console.log("✔ Dashboard summary prepared");
        resolve(summaryCache);
      })
      .on("error", (err) => reject(err));
  });
}

module.exports = { loadDashboardSummary };
