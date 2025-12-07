// src/components/FilterPanel.jsx
import React from "react";

export default function FilterPanel({
  region,
  gender,
  ageMin,
  ageMax,
  category,
  paymentMethod,
  onChange,
}) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <h3>Filters</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <div>
          <label>Region</label>
          <input
            value={region || ""}
            onChange={(e) => onChange({ region: e.target.value })}
            placeholder="e.g. North, South..."
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            value={gender || ""}
            onChange={(e) => onChange({ gender: e.target.value || undefined })}
          >
            <option value="">All</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label>Age Min</label>
          <input
            type="number"
            value={ageMin || ""}
            onChange={(e) => onChange({ ageMin: e.target.value || undefined })}
            style={{ width: 80 }}
          />
        </div>

        <div>
          <label>Age Max</label>
          <input
            type="number"
            value={ageMax || ""}
            onChange={(e) => onChange({ ageMax: e.target.value || undefined })}
            style={{ width: 80 }}
          />
        </div>

        <div>
          <label>Product Category</label>
          <input
            value={category || ""}
            onChange={(e) => onChange({ category: e.target.value })}
            placeholder="e.g. Electronics"
          />
        </div>

        <div>
          <label>Payment Method</label>
          <input
            value={paymentMethod || ""}
            onChange={(e) =>
              onChange({ paymentMethod: e.target.value })
            }
            placeholder="e.g. UPI, Card"
          />
        </div>
      </div>
    </div>
  );
}
