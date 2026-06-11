import { FiPlus } from "react-icons/fi";

export default function POSCard({ item, onAdd }) {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />

      <div className="menu-info">
        <h4>{item.name}</h4>
        <p>{item.price.toLocaleString()} đ</p>
      </div>

      <button className="add-btn" onClick={() => onAdd(item)}>
        <FiPlus />
      </button>
    </div>
  );
}