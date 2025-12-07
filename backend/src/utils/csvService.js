// backend/src/utils/csvService.js
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// ---------- DASHBOARD SUMMARY (SAFE) ----------
function getDashboardSummary() {
  return new Promise((resolve, reject) => {

const filePath = path.join(__dirname, "../data/sales_sample.csv");


    let totalTransactions = 0;
    let totalRevenue = 0;
    let priceSum = 0;
    let priceCount = 0;
    const byCity = {};
    const sampleRows = [];
    const MAX_SAMPLE = 20; // only 20 sample rows

    fs.createReadStream(filePath)
      // IMPORTANT: use first row as header
      .pipe(csv({ headers: true }))
      .on("data", (row) => {
        try {
          totalTransactions++;

          // price column from assignment
          const priceRaw = row["Final Amount"];
          const price = parseFloat(priceRaw);
          if (!Number.isNaN(price)) {
            totalRevenue += price;
            priceSum += price;
            priceCount++;
          }

          const city =
            row["Store Location"] || row["Customer Region"] || "Unknown";
          if (!byCity[city]) {
            byCity[city] = { count: 0, revenue: 0 };
          }
          byCity[city].count += 1;
          if (!Number.isNaN(price)) {
            byCity[city].revenue += price;
          }

          if (sampleRows.length < MAX_SAMPLE) {
            sampleRows.push(row);
          }
        } catch (e) {
          console.warn("Skipping bad row in summary:", e.message);
        }
      })
      .on("end", () => {
        const avgPrice = priceCount ? priceSum / priceCount : 0;

        const salesByCity = Object.entries(byCity).map(([city, info]) => ({
          city,
          transactions: info.count,
          revenue: info.revenue,
        }));

        resolve({
          totalTransactions,
          totalRevenue,
          avgPrice,
          salesByCity,
          sampleRows,
        });
      })
      .on("error", (err) => reject(err));
  });
}

// ---------- TABLE QUERY (NO BIG ARRAY) ----------
function getSalesPage(options) {
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
    sortBy = "date", // assuming CSV roughly in date order
    sortOrder = "desc",
    page = 1,
    pageSize = 10,
  } = options;

  const searchLower = search.trim().toLowerCase();
  const tagsList =
    typeof tags === "string" && tags.length
      ? tags.split(",").map((t) => t.trim().toLowerCase())
      : [];

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "../data/sales.csv");

    const pageItems = [];
    let totalMatches = 0;

    const safePage = page < 1 ? 1 : page;
    const startIndex = (safePage - 1) * pageSize + 1; // 1-based index
    const endIndex = startIndex + pageSize - 1;

    const stream = fs
      .createReadStream(filePath)
      // IMPORTANT: use first row as header
      .pipe(csv({ headers: true }));

    stream
      .on("data", (row) => {
        try {
          // ---- SEARCH by name / phone ----
          if (searchLower) {
            const name = String(row["Customer Name"] || "").toLowerCase();
            const phone = String(row["Phone Number"] || "").toLowerCase();
            if (!name.includes(searchLower) && !phone.includes(searchLower)) {
              return;
            }
          }

          // ---- FILTERS ----
          if (region && row["Customer Region"] !== region) return;
          if (gender && row["Gender"] !== gender) return;

          const ageVal = parseInt(row["Age"], 10);
          if (ageMin != null && !Number.isNaN(ageVal) && ageVal < ageMin) return;
          if (ageMax != null && !Number.isNaN(ageVal) && ageVal > ageMax) return;

          if (category && row["Product Category"] !== category) return;

          if (tagsList.length) {
            const rowTags = String(row["Tags"] || "")
              .toLowerCase()
              .split(",")
              .map((t) => t.trim());
            const hasAll = tagsList.every((t) => rowTags.includes(t));
            if (!hasAll) return;
          }

          if (paymentMethod && row["Payment Method"] !== paymentMethod) return;

          if (start || end) {
            const d = new Date(row["Date"]);
            if (start && d < start) return;
            if (end && d > end) return;
          }

          // ---- this row matches ----
          totalMatches++;

          // only keep current page rows in memory
          if (totalMatches >= startIndex && totalMatches <= endIndex) {
            pageItems.push(row);
          }
        } catch (e) {
          console.warn("Skipping bad row in sales page:", e.message);
        }
      })
      .on("end", () => {
        const totalPages = totalMatches
          ? Math.ceil(totalMatches / pageSize)
          : 1;

        resolve({
          meta: {
            page: safePage,
            pageSize,
            total: totalMatches,
            totalPages,
          },
          data: pageItems,
        });
      })
      .on("error", (err) => reject(err));
  });
}

module.exports = {
  getDashboardSummary,
  getSalesPage,
};
