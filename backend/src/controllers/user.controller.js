//backend/src/ controllers/user.controller.js
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  getMyProfileService,
  updateMyProfileService,
} from "../services/user.service.js";

// ADMIN
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.query);

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// USER
export const getMyProfile = async (req, res) => {
  try {
    console.log("🔥 USER:", req.user);

    const user = await getMyProfileService(req.user._id);

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const user = await updateMyProfileService(req.user.id, req.body);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};