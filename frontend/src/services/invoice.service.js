import api from "./api";

// lấy hóa đơn = order đã thanh toán
export const getInvoices = (params) =>
  api.get("/orders", { params: { paymentStatus: "paid", ...params } });