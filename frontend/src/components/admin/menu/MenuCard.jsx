// MenuCard.jsx
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

export default function MenuCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <div className={`menu-card ${!item.isActive ? "inactive" : ""}`}>
      <img src={item.image} alt={item.name} />

      <div className="menu-info">
        <h4>{item.name}</h4>
        <p>{item.price.toLocaleString()} đ</p>
        <p
          className={`menu-stock ${
            item.stockQuantity === 0 ? "out" : ""
          }`}
        >
          {item.stockQuantity === 0
            ? "Hết hàng"
            : `Tồn: ${item.stockQuantity}`}
        </p>
        <small>{item.categoryName}</small>
      </div>

      <div className="menu-actions">
        <button onClick={() => onEdit(item)}>
          <FiEdit2 />
        </button>

        <button onClick={() => onDelete(item._id)}>
          <FiTrash2 />
        </button>

        <button onClick={() => onToggle(item._id)}>
          {item.isActive ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
    </div>
  );
}