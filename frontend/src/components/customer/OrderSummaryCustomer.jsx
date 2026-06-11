//frontend/src/components/customer/OrderSummaryCustomer.jsx
import { useState } from "react";

export default function OrderSummaryCustomer({
  cart,
  tableId,
  note,
  setNote,
  onCheckout,
  loading,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [provider, setProvider] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (paymentMethod === "banking" && !provider) {
      return alert("Vui lòng chọn ngân hàng / ví điện tử!");
    }
    onCheckout({ paymentMethod, provider });
  };

  return (
    <div className="order-toolbox">
      <p>🪑 Bàn: <b>{tableId}</b></p>

      <textarea
        placeholder="Ghi chú (ít đá, không cay...)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* ===== CHỌN PHƯƠNG THỨC THANH TOÁN ===== */}
      <div className="payment-box">
        <h4>💳 Phương thức thanh toán</h4>

        <label>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => {
              setPaymentMethod("cash");
              setProvider("");
            }}
          />
          💵 Tiền mặt (thanh toán tại quầy)
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="banking"
            checked={paymentMethod === "banking"}
            onChange={() => setPaymentMethod("banking")}
          />
          🏦 Chuyển khoản / Ví điện tử
        </label>

        {paymentMethod === "banking" && (
          <div className="banking-methods">
            {["momo", "vnpay", "paypal"].map((p) => (
              <button
                key={p}
                type="button"
                className={provider === p ? "active" : ""}
                onClick={() => setProvider(p)}
              >
                {p === "momo" && "📱 MoMo"}
                {p === "vnpay" && "🏧 VNPay"}
                {p === "paypal" && "💳 PayPal"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      <button
        className={`checkout-btn ${loading ? "loading-btn" : ""}`}
        onClick={handleOrder}
        disabled={loading || !cart.length}
      >
        {loading ? "Đang xử lý" : "Đặt hàng"}
      </button>
    </div>
  );
}