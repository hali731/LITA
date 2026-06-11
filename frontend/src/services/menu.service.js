// frontend/src/services/menu.service.js
import api from "./api";

// GET ALL
export const getMenus = () => {
  return api.get("/products");
};

// CREATE
export const createMenu = (data) => {
  return api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateMenu = (id, data) => {
  return api.put(`/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteMenu = (id) => {
  return api.delete(`/products/${id}`);
};

// TOGGLE ACTIVE
export const toggleMenu = (id) => {
  return api.patch(`/products/${id}/toggle`);
};
export const getMenusAdmin = () => {
  return api.get("/products/admin"); // 🔥 đổi sang admin
};