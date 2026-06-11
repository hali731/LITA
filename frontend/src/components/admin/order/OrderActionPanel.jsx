export default function OrderActionPanel({
  order,
  onUpdateStatus,
  onPay,
}) {
  if (!order) return null;

  return (
    <div className="order-actions">
      <h4>Hành động</h4>

      <div className="order-actions-buttons">
        <button onClick={() => onUpdateStatus("confirmed")}>
          Confirm
        </button>
        <button onClick={() => onUpdateStatus("preparing")}>
          Preparing
        </button>
        <button onClick={() => onUpdateStatus("ready")}>
          Ready
        </button>
        <button onClick={() => onUpdateStatus("completed")}>
          Complete
        </button>
        <button onClick={() => onUpdateStatus("cancelled")}>
          Cancel
        </button>
      </div>

      <button className="order-pay-btn" onClick={onPay}>
        {order.paymentStatus === "paid"
          ? "Đã thanh toán"
          : "Thanh toán"}
      </button>
    </div>
  );
}