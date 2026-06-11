// frontend/src/pages/customer/Profile.jsx
import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../../services/user.service";
import { getMyOrders } from "../../services/order.service";

import "../../assets/style/customer/profile.css";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const profileRes = await getMyProfile();
        const orderRes = await getMyOrders();

        setForm({
          name: profileRes.data?.data?.name || "",
          email: profileRes.data?.data?.email || "",
          password: "",
        });

        setOrders(orderRes.data.data || []);
      } catch (err) {
        console.log("❌ PROFILE ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= HANDLE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateMyProfile(form);

      alert("Cập nhật thành công!");
    } catch (err) {
      console.log(err);
      alert("Lỗi cập nhật");
    }
  };

  return (
    <div className="profile-page">

      {/* PROFILE */}
      <div className="profile-card">
        <div className="avatar-box">
          <div className="avatar-large"></div>
          <p className="role">Khách hàng</p>
        </div>

        <div className="profile-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên"
          />

          <input
            name="email"
            value={form.email}
            disabled
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu mới"
          />

          <button onClick={handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>

      {/* ORDER HISTORY */}
      <div className="order-history">
        <h3>Lịch sử đơn hàng</h3>

        {loading && <p>Đang tải...</p>}

        {!loading && orders.length === 0 && (
          <p>Chưa có đơn hàng</p>
        )}

        <div className="order-list">
          {orders.map((o) => (
            <div className="order-item" key={o._id}>
              <div>
                <p className="order-id">#{o._id.slice(-6)}</p>
                <span className="order-date">
                  {new Date(o.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="order-right">
                <p className="order-total">
                  {o.totalAmount.toLocaleString()}đ
                </p>

                <span
                  className={`status ${
                    o.paymentStatus === "paid" ? "done" : "pending"
                  }`}
                >
                  {o.paymentStatus === "paid"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}