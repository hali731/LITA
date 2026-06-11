// src/middlewares/error.middleware.js

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFound = (req, res, next) => {
  next(new ApiError(404, "API not found"));
};

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};