import { FiPlus } from "react-icons/fi";

export default function POSCard({
  item,
  onAdd,
}) {
  const isOut =
    item.stockQuantity <= 0;

  return (
    <div
      className={`menu-card ${
        isOut ? "out-stock" : ""
      }`}
    >
      <img
        src={item.image}
        alt={item.name}
      />

      <div className="menu-info">
        <h4>{item.name}</h4>

        <p>
          {item.price.toLocaleString()} đ
        </p>

        {/* STOCK */}
        <p
          className={`stock-label ${
            isOut ? "out" : ""
          }`}
        >
          {isOut
            ? "Hết hàng"
            : `Còn ${item.stockQuantity} phần`}
        </p>
      </div>

      <button
        className="add-btn"
        disabled={isOut}
        onClick={() => onAdd(item)}
      >
        <FiPlus />
      </button>
    </div>
  );
}