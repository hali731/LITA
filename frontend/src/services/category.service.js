import api from "./api";

// GET ALL (public)
export const getCategories = () => api.get("/categories");

// GET ALL (admin)
export const getCategoriesAdmin = () => api.get("/categories/admin");

// CREATE
export const createCategory = (data) => api.post("/categories", data);

// UPDATE
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);

// DELETE
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// TOGGLE
export const toggleCategory = (id) => api.patch(`/categories/${id}/toggle`);
