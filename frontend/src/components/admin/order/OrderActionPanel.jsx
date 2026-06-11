import InvoicePrint from "./InvoicePrint";

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
          Xác nhận
        </button>
        <button onClick={() => onUpdateStatus("preparing")}>
          Đang làm
        </button>
        <button onClick={() => onUpdateStatus("ready")}>
          Sẵn sàng
        </button>
        <button onClick={() => onUpdateStatus("completed")}>
          Hoàn thành
        </button>
        <button onClick={() => onUpdateStatus("cancelled")}>
          Hủy đơn
        </button>
      </div>

      <button className="order-pay-btn" onClick={onPay}>
        {order.paymentStatus === "paid"
          ? "✅ Đã thanh toán"
          : "💰 Thanh toán"}
      </button>

      {/* 🖨️ IN HÓA ĐƠN */}
      <InvoicePrint order={order} />
    </div>
  );
}