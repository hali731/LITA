import MenuCard from "./MenuCard";

export default function MenuGrid(props) {
  return (
    <div className="menu-grid">
      {props.menus.map((item) => (
        <MenuCard key={item._id} {...props} item={item} />
      ))}
    </div>
  );
}