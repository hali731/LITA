const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const API_URL = API_BASE.replace(/\/$/, "");

export const UPLOADS_URL =
  import.meta.env.VITE_UPLOADS_URL ||
  API_URL.replace(/\/api\/v1$/, "") + "/uploads";
