import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  getRevenueByDay,
  getBestSeller,
  getSummary,
} from "../../services/analytics.service";

import "../../assets/style/admin/analytics.css";

export default function Analytics() {
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });
  const [filter, setFilter] = useState("7days");

  useEffect(() => {
  fetchData();
}, [filter]);

  const fetchData = async () => {
  try {
    const [revRes, bestRes, sumRes] = await Promise.all([
      getRevenueByDay(filter),
      getBestSeller(),
      getSummary(),
    ]);

    const formattedRevenue = revRes.data.data.map((item) => ({
      name: `${item._id.day}/${item._id.month}`,
      revenue: item.totalRevenue,
    }));

    setRevenueData(formattedRevenue);

    setTopProducts(
      bestRes.data.data.map((item) => ({
        name: item.name,
        sold: item.soldCount,
      }))
    );

    setSummary(sumRes.data.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="analytics">
      <h1>📊 Thống kê Dashboard</h1>

      {/* Stats */}
      <div className="stats">
        <div className="card">
          💰 {summary.totalRevenue.toLocaleString()} VNĐ
        </div>
        <div className="card">🧾 {summary.totalOrders} đơn</div>
        <div className="card">
          👥 {summary.totalCustomers} khách
        </div>
      </div>
      <div className="filter">
  <button
    className={filter === "7days" ? "active" : ""}
    onClick={() => setFilter("7days")}
  >
    7 ngày
  </button>

  <button
    className={filter === "30days" ? "active" : ""}
    onClick={() => setFilter("30days")}
  >
    30 ngày
  </button>

  <button
    className={filter === "month" ? "active" : ""}
    onClick={() => setFilter("month")}
  >
    Tháng này
  </button>
</div>

      {/* Charts */}
      <div className="charts">
        {/* REVENUE */}
        <div className="chart-container">
          <h2>Doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BEST SELLER */}
        <div className="chart-container">
          <h2>Món bán chạy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}