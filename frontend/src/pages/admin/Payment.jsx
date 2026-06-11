import { useState, useMemo, useEffect } from "react";
import { getPayments } from "../../services/payment.service.js";
import "../../assets/style/admin/payment.css";

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState("all");

  // ================= FETCH =================
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data.data);
    } catch (err) {
      console.error("Fetch payments error:", err);
    }
  };

  // ================= FILTER =================
  const filtered = useMemo(() => {
    if (filter === "all") return payments;
    return payments.filter((p) => p.status === filter);
  }, [payments, filter]);

  return (
    <div className="payment-page">
      <h2>Thanh toán</h2>

      {/* FILTER */}
      <div className="payment-filter">
        {["all", "success", "pending", "failed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="payment-table">
        <table>
          <thead>
            <tr>
              <th>Bàn</th>
              <th>Số tiền</th>
              <th>Phương thức</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id}>
                <td>{p.order?.table?.name || "N/A"}</td>
                <td>{p.amount.toLocaleString()}đ</td>
                <td>{p.method}</td>

                <td>
                  <span className={`status ${p.status}`}>
                    {p.status}
                  </span>
                </td>

                <td>
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ✅ MOBILE (ĐỂ NGOÀI TABLE) */}
<div className="payment-mobile">
  {filtered.map((p) => (
    <div key={p._id} className="payment-card">
      <p><b>Bàn:</b> {p.order?.table?.name || "N/A"}</p>
      <p><b>Số tiền:</b> {p.amount.toLocaleString()}đ</p>
      <p><b>Phương thức:</b> {p.method}</p>

      <p>
        <b>Trạng thái:</b>{" "}
        <span className={`status ${p.status}`}>
          {p.status}
        </span>
      </p>

      <p>
        <b>Thời gian:</b>{" "}
        {new Date(p.createdAt).toLocaleString()}
      </p>
    </div>
  ))}
</div>
    </div>
  );
}