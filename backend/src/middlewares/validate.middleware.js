// src/middlewares/validate.middleware.js

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};