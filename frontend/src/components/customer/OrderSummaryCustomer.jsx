//frontend/src/components/customer/OrderSummaryCustomer.jsx
export default function OrderSummaryCustomer({ 
  cart, 
  tableId, 
  note,        // 👈 thêm
  setNote,     // 👈 thêm
  onCheckout 
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-toolbox">
      <p>🪑 Bàn: <b>{tableId}</b></p>
      <textarea
  placeholder="Ghi chú (ít đá, không cay...)"
  value={note}
  onChange={(e) => setNote(e.target.value)}
/>

      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      <button
        className="checkout-btn"
        onClick={onCheckout} // ✅ gọi thẳng
      >
        Đặt hàng
      </button>
    </div>
  );
}