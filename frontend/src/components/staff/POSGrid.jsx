import POSCard from "./POSCard";

export default function POSGrid({ menus, onAdd }) {
  return (
    <div className="menu-grid">
      {menus.map((item) => (
        <POSCard key={item._id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}