// frontend/src/services/tables.service.js
import api from "./api";

export const getTables = () => api.get("/tables");

export const createTable = (data) => api.post("/tables", data);

export const updateTable = (id, data) =>
  api.put(`/tables/${id}`, data);

export const deleteTable = (id) =>
  api.delete(`/tables/${id}`);

export const getPublicTables = () =>
  api.get("/tables/public");