// src/utils/logout.js
export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};