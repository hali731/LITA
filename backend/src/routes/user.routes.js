import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===== USER =====
router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);

// ===== ADMIN =====
router.get("/", protect, requireRole("admin"), getAllUsers);

router.get("/:id", protect, requireRole("admin", "staff"), getUserById);

router.post("/", protect, requireRole("admin"), createUser);

router.put("/:id", protect, requireRole("admin"), updateUser);

router.delete("/:id", protect, requireRole("admin"), deleteUser);

export default router;