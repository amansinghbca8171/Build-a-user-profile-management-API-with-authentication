const User = require('../models/User');
const ErrorResponse = require('../utils/errorHandler');
const { jwtSecret, jwtExpiresIn } = require('../config/jwt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res, next) => {
  const { name, email, password, address } = req.body;

  try {
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('Email already in use', 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      bio: req.body.bio || '',
      profilePicture: req.body.profilePicture || '',
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    next(err);
  }
};



exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};



exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      bio: req.body.bio,
      profilePicture: req.body.profilePicture,
    };

    const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

User.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};