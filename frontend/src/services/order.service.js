import api from "./api";

// ============ GET ============
export const getOrders = (params) => {
  return api.get("/orders", { params });
};

export const getMyOrders = () => {
  return api.get("/orders/me");
};

// ============ UPDATE ============
export const updateOrderStatus = (id, status) => {
  return api.patch(`/orders/${id}/status`, { status });
};

export const payOrder = (id) => {
  return api.patch(`/orders/${id}/pay`);
};

// ============ CREATE (CHUẨN THEO BACKEND) ============

// 👤 QR customer
export const createQrOrder = (data) => {
  return api.post("/orders/qr", data);
};

// 👨‍💼 STAFF (QUAN TRỌNG: KHÔNG /staff)
export const createStaffOrder = (data) => {
  return api.post("/orders", data);
};

// 📱 APP user
export const createAppOrder = (data) => {
  return api.post("/orders/app", data);
};

// 👉 OPTIONAL: alias nếu bạn lỡ dùng createOrder ở đâu đó
export const createOrder = createStaffOrder;

