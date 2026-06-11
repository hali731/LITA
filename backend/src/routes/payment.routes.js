import express from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
} from "../controllers/payment.controller.js";

import {
  protect,
  requireRole,
  optionalAuth,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===== STAFF / ADMIN =====

// thanh toán
router.post(
  "/",
  optionalAuth,
  createPayment
);

// xem danh sách
router.get(
  "/",
  protect,
  requireRole("admin"),
  getPayments
);

// xem chi tiết
router.get(
  "/:id",
  protect,
  requireRole("admin"),
  getPaymentById
);

export default router;