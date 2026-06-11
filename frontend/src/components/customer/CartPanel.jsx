import OrderSummaryCustomer from "./OrderSummaryCustomer";
import CartItem from "../staff/CartItem";

export default function CartPanel({
  cart,
  setCart,
  tableId,
  note,        // 👈 thêm
  setNote,     // 👈 thêm
  onCheckout
}) {
  return (
    <div className="cart-panel">
      <h3>Giỏ hàng</h3>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} setCart={setCart} />
        ))}
      </div>

      <OrderSummaryCustomer
  cart={cart}
  tableId={tableId}
  note={note}          // 👈 thêm
  setNote={setNote}    // 👈 thêm
  onCheckout={onCheckout}
/>
    </div>
  );
}