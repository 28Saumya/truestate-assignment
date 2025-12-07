// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
