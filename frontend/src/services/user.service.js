import api from "./api";

export const getUsers = (role) =>
  api.get("/users", { params: role ? { role } : {} });
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ✅ LẤY PROFILE CỦA CHÍNH USER
export const getMyProfile = () => {
  return api.get("/users/me");
};

// ✅ UPDATE PROFILE
export const updateMyProfile = (data) => {
  return api.put("/users/me", data);
};