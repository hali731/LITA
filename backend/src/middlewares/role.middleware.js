// src/middlewares/role.middleware.js
export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};