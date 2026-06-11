//frontend/src/services/payment.service.js
import api from "./api";

// GET ALL PAYMENTS (admin)
export const getPayments = () => api.get("/payments");

// GET BY ID
export const getPaymentById = (id) => api.get(`/payments/${id}`);

// CREATE PAYMENT (staff)
export const createPayment = (data) => api.post("/payments", data);
