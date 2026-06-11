export default function OrderItemRow({ item }) {
  return (
    <div className="order-item-row">
      <span>{item.name}</span>
      <span>x{item.quantity}</span>
      <span>{item.price.toLocaleString()}đ</span>
      <span>
        {(item.price * item.quantity).toLocaleString()}đ
      </span>
    </div>
  );
}