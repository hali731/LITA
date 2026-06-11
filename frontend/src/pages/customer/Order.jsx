// frontend/src/pages/customer/Order.jsx
import { useEffect, useState, useMemo } from "react";
import { getMyOrders } from "../../services/order.service";

import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";

import "../../assets/style/admin/order.css";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileView, setMobileView] = useState("list");

  // ================= LOAD MY ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await getMyOrders();

        setOrders(res.data.data || []);
      } catch (err) {
        console.log("❌ GET MY ORDERS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ================= FILTER =================
  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  // ================= SELECT ORDER =================
  const handleSelect = (order) => {
    setSelectedOrder(order);
    setMobileView("detail");
  };

  return (
    <div className="order-page">
      <h2>Đơn hàng của bạn</h2>

      {/* FILTER */}
      <OrderFilter
        status={statusFilter}
        setStatus={setStatusFilter}
      />

      {/* LOADING */}
      {loading && <p>Đang tải đơn hàng...</p>}

      {/* EMPTY STATE */}
      {!loading && orders.length === 0 && (
        <p>Bạn chưa có đơn hàng nào</p>
      )}

      <div className="order-content">
        {/* LEFT LIST */}
        <div
          className={`order-left ${
            mobileView === "detail" ? "hide-mobile" : ""
          }`}
        >
          <OrderList
            orders={filteredOrders}
            onSelect={handleSelect}
          />
        </div>

        {/* RIGHT DETAIL */}
        <div
          className={`order-right ${
            mobileView === "list" ? "hide-mobile" : ""
          }`}
        >
          <button
            className="back-btn"
            onClick={() => setMobileView("list")}
          >
            ← Quay lại
          </button>

          <OrderDetail order={selectedOrder} />
        </div>
      </div>
    </div>
  );
}