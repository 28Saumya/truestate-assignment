const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

/**
 * Streams CSV and returns filtered, sorted, paginated rows
 */
function querySales(options) {
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
    const matches = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        try {
          // --- SEARCH by Customer Name / Phone Number ---
          if (searchLower) {
            const name = String(row["Customer Name"] || "").toLowerCase();
            const phone = String(row["Phone Number"] || "").toLowerCase();
            if (!name.includes(searchLower) && !phone.includes(searchLower)) {
              return;
            }
          }

          // --- FILTERS ---

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

          // passed all filters
          matches.push(row);
        } catch (err) {
          console.warn("Skipping bad row:", err.message);
        }
      })
      .on("end", () => {
        // --- SORT ---
        matches.sort((a, b) => {
          let av, bv;

          switch (sortBy) {
            case "quantity":
              av = Number(a["Quantity"]);
              bv = Number(b["Quantity"]);
              break;
            case "customer":
              av = String(a["Customer Name"] || "").toLowerCase();
              bv = String(b["Customer Name"] || "").toLowerCase();
              break;
            default: // date
              av = new Date(a["Date"]);
              bv = new Date(b["Date"]);
          }

          if (av < bv) return sortOrder === "asc" ? -1 : 1;
          if (av > bv) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });

        const total = matches.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const safePage = Math.min(Math.max(page, 1), totalPages);
        const startIndex = (safePage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const pageItems = matches.slice(startIndex, endIndex);

        resolve({
          meta: {
            page: safePage,
            pageSize,
            total,
            totalPages,
          },
          data: pageItems,
        });
      })
      .on("error", (err) => reject(err));
  });
}

module.exports = { querySales };
