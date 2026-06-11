import CartItem from "./CartItem";
import OrderToolbox from "./OrderToolbox";

export default function CartPanel({
  cart,
  setCart,
  tables,
  selectedTable,
  setSelectedTable,
  customer,
  setCustomer,
   note,        // 👈 thêm
  setNote,
  onCheckout,
  loading,
}) {
  return (
    <div className="cart-panel">
      <h3>Giỏ hàng</h3>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} setCart={setCart} />
        ))}
      </div>

      <OrderToolbox
        cart={cart}
        tables={tables}
        table={selectedTable}
        setTable={setSelectedTable}
        customer={customer}
        setCustomer={setCustomer}
        note={note}              // 👈 thêm
  setNote={setNote}   
        onCheckout={onCheckout}
        loading={loading}
      />
    </div>
  );
}