import express from "express";
import {
  getCategories,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategory,
} from "../controllers/category.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===== PUBLIC (QR MENU) =====
router.get("/", getCategories);

// ===== ADMIN =====
router.get("/admin", protect, requireRole("admin"), getAllCategories);

router.get("/:id", protect, requireRole("admin"), getCategoryById);

router.post("/", protect, requireRole("admin"), createCategory);

router.put("/:id", protect, requireRole("admin"), updateCategory);

router.delete("/:id", protect, requireRole("admin"), deleteCategory);

router.patch(
  "/:id/toggle",
  protect,
  requireRole("admin"),
  toggleCategory
);

export default router;