//frontend/src/admin/CategoryFilter.jsx
export default function CategoryFilter({
  category,
  setCategory,
  categories = [],
}) {
  return (
    <div className="menu-category">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={category === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}