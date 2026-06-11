import OrderItemRow from "./OrderItemRow";

export default function OrderDetail({ order }) {
  if (!order) {
    return <p>Chọn đơn để xem chi tiết</p>;
  }

  return (
    <div className="order-detail">
      <h3>{order.table?.name || "Không rõ bàn"}</h3>
      
          <p>
        Khách:{" "}
        <b>
          {order.customer?.name || order.guestName || "Khách lẻ"}
        </b>
      </p>
      <div className="order-items">
        {order.items.map((item, i) => (
          <OrderItemRow key={i} item={item} />
        ))}
      </div>

      <h4>
        Tổng: {order.totalAmount.toLocaleString()}đ
      </h4>

      {order.note && <p>Ghi chú: {order.note}</p>}
    </div>
  );
}