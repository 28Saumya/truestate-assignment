// frontend/src/components/SalesByRegion.jsx
import React from "react";

function SalesByRegion({ data }) {
  const top = [...data].sort((a, b) => b.sales - a.sales);
  const maxSales = top[0]?.sales || 1;

  return (
    <div
      style={{
        background: "white",
        padding: "12px 16px",
        borderRadius: "10px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: "14px" }}>Sales by Region</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {top.map((item) => (
          <li key={item.region} style={{ marginBottom: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBottom: "2px",
              }}
            >
              <span>{item.region}</span>
              <span>₹{Math.round(item.sales).toLocaleString("en-IN")}</span>
            </div>
            <div
              style={{
                height: "5px",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(item.sales / maxSales) * 100}%`,
                  height: "100%",
                  background: "#10b981",
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesByRegion;
