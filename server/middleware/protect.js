import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/userSchema.js';


// Protect Route
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, No Token');
  }
});