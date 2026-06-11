import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { auditLog } from "./middlewares/auditLog.middleware.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import { protect, requireRole } from "./middlewares/auth.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import tableRoutes from "./routes/table.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

// ================= GLOBAL =================
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ================= API =================
const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/categories`, categoryRoutes);
app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/tables`, tableRoutes);
app.use(`${API_PREFIX}/payments`, paymentRoutes);
app.use(`${API_PREFIX}/analytics`, analyticsRoutes);


// ===== ADMIN AUDIT =====
app.use(
  `${API_PREFIX}/admin`,
  protect,
  requireRole("admin"),
  auditLog()
);

app.use(
  `${API_PREFIX}/staff`,
  protect,
  requireRole("staff"),
  auditLog()
);

// ================= HEALTH =================
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// ================= ERROR =================
app.use(notFound);
app.use(errorHandler);

export default app;