// frontend/src/components/TransactionTable.jsx
import React from "react";

function TransactionTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p style={{ fontSize: 13 }}>No records found.</p>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 12,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  padding: "6px 8px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                  whiteSpace: "nowrap",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => {
                let v = row[col];
                if (v instanceof Date) {
                  v = new Date(v).toLocaleDateString();
                }
                return (
                  <td
                    key={col}
                    style={{
                      padding: "6px 8px",
                      borderBottom: "1px solid #f3f4f6",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v !== null && v !== undefined ? String(v) : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
