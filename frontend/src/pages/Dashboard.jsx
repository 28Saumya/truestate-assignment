import React, { useEffect, useState } from "react";
import { fetchDashboardSummary, fetchSales } from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import SalesTable from "../components/SalesTable";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  // table states
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: undefined,
    gender: undefined,
    ageMin: undefined,
    ageMax: undefined,
    category: undefined,
    paymentMethod: undefined,
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  // load dashboard summary once
  useEffect(() => {
    fetchDashboardSummary()
      .then(setSummary)
      .catch(console.error);
  }, []);

  // load table whenever search/filters/sort/page change
  useEffect(() => {
    async function loadSales() {
      setLoadingTable(true);
      try {
        const res = await fetchSales({
          search,
          region: filters.region,
          gender: filters.gender,
          ageMin: filters.ageMin,
          ageMax: filters.ageMax,
          category: filters.category,
          paymentMethod: filters.paymentMethod,
          sortBy,
          sortOrder,
          page,
          pageSize: 10,
        });
        setRows(res.data);
        setMeta(res.meta);
      } catch (err) {
        console.error("Failed to load sales", err);
      } finally {
        setLoadingTable(false);
      }
    }
    loadSales();
  }, [search, filters, sortBy, sortOrder, page]);

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPage(1); // reset to first page on filter change
  };

  const handleSortChange = (by, order) => {
    setSortBy(by);
    setSortOrder(order);
    setPage(1);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>📊 TruEstate Dashboard</h1>

      {/* KPI Cards */}
      {summary && (
        <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
          <StatCard
            title="Total Transactions"
            value={summary.totalTransactions.toLocaleString()}
          />
          <StatCard
            title="Total Revenue"
            value={`₹ ${summary.totalRevenue.toLocaleString()}`}
          />
          <StatCard
            title="Average Price"
            value={`₹ ${summary.avgPrice.toFixed(2)}`}
          />
        </div>
      )}

      <hr style={{ margin: "32px 0" }} />

      {/* Transactions section */}
      <h2>Transactions</h2>

      <SearchBar
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />

      <FilterPanel
        region={filters.region}
        gender={filters.gender}
        ageMin={filters.ageMin}
        ageMax={filters.ageMax}
        category={filters.category}
        paymentMethod={filters.paymentMethod}
        onChange={handleFilterChange}
      />

      <SortDropdown
        sortBy={sortBy}
        sortOrder={sortOrder}
        onChange={handleSortChange}
      />

      {loadingTable ? <p>Loading sales...</p> : <SalesTable rows={rows} />}

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        flex: "0 0 220px",
        padding: 18,
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontSize: 16, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
