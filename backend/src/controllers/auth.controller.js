// backend/src/controllers/auth.controller.js
import {
  registerService,
  loginService,
  getProfileService,
} from "../services/auth.service.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);

    res.status(201).json({
      message: "Register success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json({
      message: "Login success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.user.id);

    res.status(200).json({
      message: "Get profile success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};