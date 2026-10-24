import bcryptjs from "bcryptjs";
import User from "../model/UserSchema.js";
import jwt from 'jsonwebtoken';
import asyncHandler from "../utils/asynchandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";


export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Please fill all credentials" });

  const existingUser = await User.findOne({ email });
  if (existingUser)                                   // was: if (!existingUser)
    return res.status(409).json({ message: "Email already registered" });

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });

  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser._id, username: newUser.username, email: newUser.email },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;               // username no longer needed
  if (!email || !password)
    return res.status(400).json({ message: "Please fill all the credentials" });

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();
  const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.status(200).json({
    message: "Login successful",
    user: { id: user._id, username: user.username, email: user.email },
  });
});


export const refresh = (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Token refreshed" });
  } catch {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};



export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ message: "User not found" });
  res.status(200).json({
    user: { id: user._id, username: user.username, email: user.email },
  });
});

export const logoutUser = (req, res) => {
  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  res.status(200).json({ message: "Logged out" });
};