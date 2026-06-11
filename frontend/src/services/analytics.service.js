// frontend/src/services/analytics.service.js
import api from "./api";

// doanh thu theo ngày
export const getRevenueByDay = (filter) => {
  return api.get(`/analytics/revenue/day?filter=${filter}`);
};

// best seller
export const getBestSeller = () => {
  return api.get("/analytics/best-seller");
};

// summary dashboard
export const getSummary = () => {
  return api.get("/analytics/summary");
};