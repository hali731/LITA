import express from "express";
import {
  getRevenueByDay,
  getRevenueByMonth,
  getBestSeller,
  getDashboardSummary,
} from "../controllers/analytics.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// chỉ admin xem dashboard
router.get(
  "/revenue/day",
  protect,
  requireRole("admin", "staff"),
  getRevenueByDay
);

router.get(
  "/revenue/month",
  protect,
  requireRole("admin", "staff"),
  getRevenueByMonth
);

router.get(
  "/best-seller",
  protect,
  requireRole("admin", "staff"),
  getBestSeller
);

router.get(
  "/summary",
  protect,
  requireRole("admin", "staff"),
  getDashboardSummary
);

export default router;