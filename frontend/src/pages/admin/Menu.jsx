import { useState, useMemo, useEffect } from "react";
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import MenuGrid from "../../components/admin/menu/MenuGrid";
import MenuEditorPanel from "../../components/admin/menu/MenuEditorPanel";
import "../../assets/style/admin/Menu.css";

import {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleMenu,
  getMenusAdmin,
} from "../../services/menu.service";
import { UPLOADS_URL } from "../../config/env.js";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [category, setCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const categories = useMemo(() => {
  const unique = [...new Set(menus.map((item) => item.category))];
  return ["Tất cả", ...unique];
}, [menus]);

  const fetchMenus = async () => {
    try {
      const res = await getMenusAdmin();

      const formatted = res.data.data.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        category: item.category?.name || "Khác",
        image: item.image ? `${UPLOADS_URL}/${item.image}` : "",
        isActive: item.isAvailable,
      }));

      setMenus(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const filteredMenus = useMemo(() => {
    return menus.filter((item) => {
      const matchCategory =
        category === "Tất cả" || item.category === category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [menus, category, search]);

  const handleEdit = (item) => setSelectedMenu(item);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa món này?")) return;

    try {
      await deleteMenu(id);
      fetchMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleMenu(id);
      fetchMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);

      if (data.file) {
        formData.append("image", data.file);
      }

      if (selectedMenu) {
        await updateMenu(selectedMenu._id, formData);
      } else {
        await createMenu(formData);
      }

      fetchMenus();
      setSelectedMenu(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="menu-page">
      <MenuSearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      <div className="menu-content">
        <div className="menu-left">
          <MenuGrid
            menus={filteredMenus}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>

        <div className="menu-right">
          <MenuEditorPanel
            selected={selectedMenu}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}