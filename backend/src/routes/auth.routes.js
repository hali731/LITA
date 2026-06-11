import express from "express";
import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.post("/register", register);
router.post("/login", login);

// PRIVATE
router.get("/profile", protect, getProfile);

// ROLE TEST
router.get(
  "/admin",
  protect,
  requireRole("admin"),
  (req, res) => {
    res.json({ message: "Admin access" });
  }
);

router.get(
  "/staff",
  protect,
  requireRole("admin", "staff"),
  (req, res) => {
    res.json({ message: "Staff access" });
  }
);

router.get(
  "/customer",
  protect,
  requireRole("customer"),
  (req, res) => {
    res.json({ message: "Customer access" });
  }
);

export default router;