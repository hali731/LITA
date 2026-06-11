//frontend/src/services/auth.service.js
import api from "./api";

// REGISTER
export const registerApi = (data) => {
  return api.post("/auth/register", data);
};

// LOGIN
export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

// PROFILE
export const getProfileApi = () => {
  return api.get("/auth/profile");
};
