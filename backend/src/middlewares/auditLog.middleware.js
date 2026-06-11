// src/middlewares/auditLog.middleware.js

export const auditLog = () => {
  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;

      console.log("📊 AUDIT LOG:", {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        user: req.user?._id || "guest",
        duration: `${duration}ms`,
        time: new Date().toISOString(),
      });
    });

    next();
  };
};