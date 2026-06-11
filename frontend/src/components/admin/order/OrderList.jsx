import OrderCard from "./OrderCard";

export default function OrderList({ orders, onSelect }) {
  return (
    <div className="order-list">
      {orders.map((o) => (
        <OrderCard key={o._id} order={o} onSelect={onSelect} />
      ))}
    </div>
  );
}