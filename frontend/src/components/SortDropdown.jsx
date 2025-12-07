// src/components/SortDropdown.jsx
import React from "react";

export default function SortDropdown({ sortBy, sortOrder, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value, sortOrder)}
      >
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customer">Customer Name (A–Z)</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => onChange(sortBy, e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
