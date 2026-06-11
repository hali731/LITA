export default function OrderToolbox({
  cart,
  tables,
  table,
  setTable,
  customer,
  setCustomer,
   note,        // 👈 thêm
  setNote,     // 👈 thêm
  onCheckout,
  loading,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-toolbox">
      {/* TABLE */}
      <select value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="">-- Chọn bàn --</option>
        {tables.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      {/* CUSTOMER */}
      <input
  type="text"
  placeholder="Tên khách (bắt buộc với staff)"
  value={customer}
  onChange={(e) => setCustomer(e.target.value)}
/>
        <textarea
  placeholder="Ghi chú (ít đá, không cay, thêm topping...)"
  value={note}
  onChange={(e) => setNote(e.target.value)}
/>
      {/* TOTAL */}
      <div className="order-total">
        Tổng: {total.toLocaleString()} đ
      </div>

      {/* BUTTON */}
      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Thanh toán"}
      </button>
    </div>
  );
}