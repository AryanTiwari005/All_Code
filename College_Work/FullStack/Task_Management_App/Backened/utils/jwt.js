import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '15m' });

const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

export { generateAccessToken, generateRefreshToken };