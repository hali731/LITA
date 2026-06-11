// backend/src/routes/table.routes.js
import express from "express";
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  updateTableStatus,
  getTableByCode,
  getTablesPublic
} from "../controllers/table.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===== PUBLIC (QR) =====
router.get("/code/:code", getTableByCode);

router.get("/public", getTablesPublic);

// ===== ADMIN =====
router.get("/", protect, requireRole("admin", "staff"), getTables);

router.get("/:id", protect, requireRole("admin", "staff"), getTableById);

router.post("/", protect, requireRole("admin"), createTable);

router.put("/:id", protect, requireRole("admin"), updateTable);

router.delete("/:id", protect, requireRole("admin"), deleteTable);

router.patch(
  "/:id/status",
  protect,
  requireRole("admin", "staff"),
  updateTableStatus
);

export default router;