import { useState, useMemo, useEffect } from "react";
import OrderList from "../../components/admin/order/OrderList";
import OrderDetail from "../../components/admin/order/OrderDetail";
import OrderFilter from "../../components/admin/order/OrderFilter";
import OrderActionPanel from "../../components/admin/order/OrderActionPanel";
import { payOrder } from "../../services/order.service";
import "../../assets/style/admin/order.css";

import {
  getOrders,
  updateOrderStatus,
} from "../../services/order.service";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileView, setMobileView] = useState("list");
  
  // ✅ FETCH API
  const fetchOrders = async () => {
    try {
      const params =
        statusFilter !== "all" ? { status: statusFilter } : {};

      const res = await getOrders(params);

      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  // ✅ FILTER (không cần nữa nếu backend filter)
  const filteredOrders = useMemo(() => {
    return orders;
  }, [orders]);

  const handleSelect = (order) => {
    setSelectedOrder(order);
    setMobileView("detail");
  };

  // ✅ UPDATE STATUS
  const handleUpdateStatus = async (status) => {
  if (!selectedOrder) return;

  try {
    await updateOrderStatus(selectedOrder._id, status);

    // ✅ update UI ngay (KHÔNG cần fetch)
    setOrders((prev) =>
      prev.map((o) =>
        o._id === selectedOrder._id
          ? { ...o, status }
          : o
      )
    );

    setSelectedOrder((prev) => ({
      ...prev,
      status,
    }));

  } catch (err) {
    console.error(err);
  }
};

  const handlePay = async () => {
  if (!selectedOrder) return;

  try {
    await payOrder(selectedOrder._id);

    alert("Thanh toán thành công");

    // ✅ update local state luôn
    setOrders((prev) =>
      prev.map((o) =>
        o._id === selectedOrder._id
          ? { ...o, paymentStatus: "paid" }
          : o
      )
    );

    setSelectedOrder((prev) => ({
      ...prev,
      paymentStatus: "paid",
    }));

  } catch (err) {
    console.error(err);
    alert("Lỗi thanh toán");
  }
};

  return (
    <div className="order-page">
      <h2>Quản lý đơn hàng</h2>

      <OrderFilter
        status={statusFilter}
        setStatus={setStatusFilter}
      />

      <div className="order-content">
        {/* LEFT */}
        <div className={`order-left ${mobileView === "detail" ? "hide-mobile" : ""}`}>
          <OrderList orders={filteredOrders} onSelect={handleSelect} />
        </div>

        {/* RIGHT */}
        <div className={`order-right ${mobileView === "list" ? "hide-mobile" : ""}`}>
          <button className="back-btn" onClick={() => setMobileView("list")}>
            ← Quay lại
          </button>

          <OrderDetail order={selectedOrder} />

          <OrderActionPanel
            order={selectedOrder}
            onUpdateStatus={handleUpdateStatus}
            onPay={handlePay}
          />
        </div>
      </div>
    </div>
  );
}