// MenuSearchBar.jsx
import { FiSearch } from "react-icons/fi";

export default function MenuSearchBar({ search, setSearch }) {
  return (
    <div className="menu-search">
      <FiSearch />
      <input
        type="text"
        placeholder="Tìm món..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}