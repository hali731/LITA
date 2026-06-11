// frontend/src/pages/admin/Menu.jsx
import { useState, useMemo, useEffect } from "react";

import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import MenuGrid from "../../components/admin/menu/MenuGrid";
import MenuEditorPanel from "../../components/admin/menu/MenuEditorPanel";

import "../../assets/style/admin/Menu.css";
import { UPLOADS_URL } from "../../config/env.js";

import {
  createMenu,
  updateMenu,
  deleteMenu,
  toggleMenu,
  getMenusAdmin,
} from "../../services/menu.service";

import { getCategories } from "../../services/category.service";
import { removeVietnameseTones } from "../../utils/stringUtils";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState(null);

  const [category, setCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");

  // ===== LOAD MENU =====
  const fetchMenus = async () => {
    try {
      const res = await getMenusAdmin();

      const formatted = res.data.data.map((item) => ({
  _id: item._id,

  name: item.name,

  price: item.price,

  stockQuantity: item.stockQuantity || 0,

  // category id gửi backend
  category: item.category?._id || item.category || "",

  // category name hiển thị (tránh hiện ID nếu mất liên kết)
  categoryName: item.category?.name || "Khác",

  image: item.image
    ? `${UPLOADS_URL}/${item.image}`
    : "",

  isActive: item.isAvailable,
}));

      setMenus(formatted);
    } catch (error) {
      console.error("FETCH MENU ERROR:", error);
    }
  };

  // ===== LOAD CATEGORY =====
  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      setCategoriesData(res.data.data || []);
    } catch (error) {
      console.error("FETCH CATEGORY ERROR:", error);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  // ===== CATEGORY FILTER =====
  const categories = useMemo(() => {
    const unique = [
      ...new Set(menus.map((item) => item.categoryName)),
    ];

    return ["Tất cả", ...unique];
  }, [menus]);

  // ===== SEARCH + FILTER =====
  const filteredMenus = useMemo(() => {
    return menus.filter((item) => {
      const matchCategory =
        category === "Tất cả" ||
        item.categoryName === category;

      const normalizedSearch = removeVietnameseTones(search);
      const normalizedName = removeVietnameseTones(item.name);

      const matchSearch = normalizedName.includes(normalizedSearch);

      return matchCategory && matchSearch;
    });
  }, [menus, category, search]);

  // ===== EDIT =====
  const handleEdit = (item) => {
    setSelectedMenu(item);
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (!window.confirm("Xóa món này?")) return;

    try {
      await deleteMenu(id);

      fetchMenus();
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  // ===== TOGGLE =====
  const handleToggle = async (id) => {
    try {
      await toggleMenu(id);

      fetchMenus();
    } catch (error) {
      console.error("TOGGLE ERROR:", error);
    }
  };

  // ===== SUBMIT =====
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);

          formData.append(
      "stockQuantity",
      data.stockQuantity || 0
    );

      // IMPORTANT
      formData.append("category", data.category);

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
      console.error(
        "SUBMIT ERROR:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="menu-page">
      <MenuSearchBar
        search={search}
        setSearch={setSearch}
      />

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
            categories={categoriesData}
          />
        </div>
      </div>
    </div>
  );
}