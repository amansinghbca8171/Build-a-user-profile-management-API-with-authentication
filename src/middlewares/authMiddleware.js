const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorHandler');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

exports.authorize = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      new ErrorResponse('Not authorized to access this profile', 403)
    );
  }
  next();
};