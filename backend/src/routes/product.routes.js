// backend/src/routes/product.routes.js 
import express from "express";
import {
  getProducts,
  getProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProduct,
} from "../controllers/product.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  requireRole("admin"),
  getProductsAdmin
);

// ===== PUBLIC (QR MENU) =====
router.get("/", getProducts); // menu
router.get("/:id", getProductById);

// ===== ADMIN =====
router.post(
  "/",
  protect,
  requireRole("admin"),
  upload.single("image"), // 👈 THÊM DÒNG NÀY
  createProduct
);



router.put(
  "/:id",
  protect,
  requireRole("admin"),
  upload.single("image"), // 👈 UPDATE cũng cần
  updateProduct
);

router.delete("/:id", protect, requireRole("admin"), deleteProduct);

router.patch(
  "/:id/toggle",
  protect,
  requireRole("admin"),
  toggleProduct
);

export default router;