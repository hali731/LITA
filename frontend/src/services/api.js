//frontend/services/api.js
import axios from "axios";
import { API_URL } from "../config/env.js";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// tự động gắn token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
