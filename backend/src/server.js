// src/server.js
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const startServer = async () => {
  try {
    // 🔌 Connect DB
    await connectDB();
    console.log("✅ Database connected");

    // 🔥 Tạo HTTP server
    const httpServer = http.createServer(app);

    // 🔥 Init Socket.IO
    const socketOrigins = (ENV.CLIENT_URL || "http://localhost:5173")
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    const io = new Server(httpServer, {
      cors: {
        origin: socketOrigins,
        credentials: true,
      },
    });

    // gắn vào app để dùng global
    app.set("io", io);

    // ================= SOCKET EVENTS =================
    io.on("connection", (socket) => {
      console.log("🟢 Client connected:", socket.id);

      //  user join room (quan trọng nhất)
      socket.on("join", (userId) => {
        socket.join(userId);
        console.log("👤 User joined:", userId);
      });

      //  join order room (theo dõi đơn hàng)
      socket.on("joinOrder", (orderId) => {
        socket.join(orderId);
        console.log("📦 Joined order:", orderId);
      });

      socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
      });
    });

    // 🚀 Start server
    httpServer.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });

    // 🛑 Graceful shutdown
    process.on("SIGINT", () => {
      console.log("🛑 Shutting down server...");
      httpServer.close(() => {
        console.log("❌ Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ Server start failed:", error);
    process.exit(1);
  }
};

startServer();