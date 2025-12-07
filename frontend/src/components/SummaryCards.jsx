// frontend/src/components/SummaryCards.jsx
import React from "react";

function Card({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "white",
        padding: "12px 16px",
        borderRadius: "10px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        minWidth: "0",
      }}
    >
      <div style={{ fontSize: "13px", color: "#6b7280" }}>{title}</div>
      <div style={{ fontSize: "20px", fontWeight: 600, marginTop: "4px" }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function SummaryCards({ summary }) {
  const formatCurrency = (n) =>
    "₹" + (n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
      }}
    >
      <Card
        title="Total Sales"
        value={formatCurrency(summary.totalSales)}
        subtitle="All orders"
      />
      <Card
        title="Total Profit"
        value={formatCurrency(summary.totalProfit)}
        subtitle="Net profit"
      />
      <Card
        title="Total Orders"
        value={summary.totalOrders}
        subtitle="Rows in dataset"
      />
      <Card
        title="Total Quantity"
        value={summary.totalQuantity}
        subtitle="Units sold"
      />
    </div>
  );
}

export default SummaryCards;
