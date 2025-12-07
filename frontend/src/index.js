// backend/src/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TruEstate Sales API is running" });
});

app.use("/api/sales", salesRoutes);

// Static CSV access (optional)
app.use("/static", express.static(path.join(__dirname, "data")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
