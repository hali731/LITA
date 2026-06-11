// services/user.service.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET ALL USERS (admin)
export const getAllUsersService = async (query) => {
  const filter = {};

  if (query?.role) {
    filter.role = query.role;
  }

  return await User.find(filter).select("-password");
};

// GET USER BY ID
export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

// CREATE USER (admin tạo staff/admin)
export const createUserService = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

// UPDATE USER
export const updateUserService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  if (data.role) user.role = data.role;
  if (typeof data.isActive !== "undefined") user.isActive = data.isActive;

  // update password nếu có
  if (data.password) {
  user.password = await bcrypt.hash(data.password, 10);
}

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

// DELETE USER
export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");

  return { message: "User deleted" };
};

// GET MY PROFILE
export const getMyProfileService = async (userId) => {
  return await User.findById(userId).select("-password");
};

// UPDATE MY PROFILE
export const updateMyProfileService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (data.name) user.name = data.name;
  if (data.password) user.password = data.password;

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};