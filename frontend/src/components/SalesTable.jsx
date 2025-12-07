export default function SalesTable({ rows }) {
  if (!rows?.length) return <p>No data found.</p>;

  const headers = Object.keys(rows[0]);

  return (
    <table border="1" cellPadding="6" style={{ width: "100%", marginTop: 20 }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {headers.map((h) => (
              <td key={h}>{row[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
