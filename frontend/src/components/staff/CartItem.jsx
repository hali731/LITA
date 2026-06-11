import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";

export default function CartItem({ item, setCart }) {
  const updateQty = (delta) => {
    if (delta > 0 && item.quantity >= item.stockQuantity) {
      alert(`Chỉ còn ${item.stockQuantity} phần`);
      return;
    }

    setCart((prev) =>
      prev
        .map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + delta }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const remove = () => {
    setCart((prev) => prev.filter((p) => p._id !== item._id));
  };

  return (
   <div className="cart-item">
  <img src={item.image} alt="" />

  <div className="info">
    <p className="name">{item.name}</p>
    <small>{item.price.toLocaleString()} đ</small>
  </div>

  <div className="actions">
    <button onClick={() => updateQty(-1)}><FiMinus /></button>
    <span>{item.quantity}</span>
    <button onClick={() => updateQty(1)}><FiPlus /></button>
  </div>

  <button className="remove" onClick={remove}>
    <FiTrash />
  </button>
</div>
  );
}