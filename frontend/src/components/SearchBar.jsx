// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Search by customer name or phone..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #ddd",
        marginBottom: 16,
      }}
    />
  );
}
