import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  payOrder,
  getMyOrders,
} from "../controllers/order.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ================= CREATE ORDER =================
// CUSTOMER QR + STAFF + APP → dùng chung 1 API
router.post(
  "/",
  protect,
  createOrder
);
router.get("/me", protect, getMyOrders);

// ================= GET ORDERS (STAFF / ADMIN) =================
router.get(
  "/",
  protect,
  requireRole("admin", "staff"),
  getOrders
);

// ================= GET DETAIL =================
router.get(
  "/:id",
  protect,
  requireRole("admin", "staff"),
  getOrderById
);

// ================= UPDATE STATUS =================
router.patch(
  "/:id/status",
  protect,
  requireRole("admin", "staff"),
  updateOrderStatus
);

// ================= PAYMENT =================
router.patch(
  "/:id/pay",
  protect,
  requireRole("admin", "staff"),
  payOrder
);

// ================= DELETE =================
router.delete(
  "/:id",
  protect,
  requireRole("admin"),
  deleteOrder
);

export default router;