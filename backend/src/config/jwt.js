// src/config/jwt.js
import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

// tạo token
export const generateToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};

// verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (error) {
    return null;
  }
};