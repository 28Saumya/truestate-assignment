// frontend/src/components/MonthlySales.jsx
import React from "react";

function MonthlySales({ data }) {
  return (
    <div
      style={{
        background: "white",
        padding: "12px 16px",
        borderRadius: "10px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: "14px" }}>Monthly Sales</h3>
      <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "6px" }}>
        Simple text-based chart (for assignment, this is enough)
      </div>
      <div style={{ maxHeight: "260px", overflowY: "auto" }}>
        {data.map((item) => (
          <div
            key={item.month}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
              gap: "8px",
            }}
          >
            <div style={{ width: "68px", fontSize: "12px" }}>{item.month}</div>
            <div
              style={{
                flex: 1,
                height: "6px",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(item.sales / (data[0]?.sales || 1) * 100, 100)}%`,
                  height: "100%",
                  background: "#2563eb",
                }}
              ></div>
            </div>
            <div style={{ width: "80px", textAlign: "right", fontSize: "11px" }}>
              ₹{Math.round(item.sales).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlySales;
