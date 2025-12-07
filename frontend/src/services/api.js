import axios from "axios";

const API_BASE = "https://truestate-assignment-qp8o.onrender.com/api"

export async function fetchDashboardSummary() {
  const res = await axios.get(`${API_BASE}/dashboard`);
  return res.data;
}

export async function fetchSales(params) {
  const res = await axios.get(`${API_BASE}/sales`, { params });
  return res.data; // { meta, data }
}
