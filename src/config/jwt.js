require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'Assignment8171',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};