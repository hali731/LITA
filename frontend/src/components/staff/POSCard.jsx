import { FiPlus } from "react-icons/fi";

export default function POSCard({ item, onAdd }) {
  return (
    <div className={`menu-card ${item.stockQuantity <= 0 ? "out-stock" : ""}`}>
      <img src={item.image} alt={item.name} />

      <div className="menu-info">
        <h4>{item.name}</h4>
        <p>{item.price.toLocaleString()} đ</p>
        {item.stockQuantity <= 0 && (
          <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>Hết hàng</span>
        )}
      </div>

      <button 
        className="add-btn" 
        onClick={() => onAdd(item)}
        disabled={item.stockQuantity <= 0}
      >
        <FiPlus />
      </button>
    </div>
  );
}