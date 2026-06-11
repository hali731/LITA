import OrderStatusBadge from "./OrderStatusBadge";
export default function OrderCard({ order, onSelect }) {
  return (
    <div
      className="order-card"
      onClick={() => onSelect(order)}
    >
      <h4>{order.table?.name || "Không rõ bàn"}</h4>
      <p className="customer-name">
        {order.customer?.name || order.guestName || "Khách lẻ"}
      </p>
      <p>{order.totalAmount.toLocaleString()}đ</p>

      <div className="order-card-row">
        <span className={`status-badge status-${order.status}`}>
          <OrderStatusBadge status={order.status} />
        </span>

        <span
          className={
            order.paymentStatus === "paid"
              ? "payment-paid"
              : "payment-unpaid"
          }
        >
          {order.paymentStatus === "paid"
            ? "Đã thanh toán"
            : "Chưa thanh toán"}
        </span>
      </div>
    </div>
  );
}