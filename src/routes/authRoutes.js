const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router
  .route('/profile/:id')
  .get(protect, authorize, getProfile)
  .put(protect, authorize, updateProfile);

module.exports = router;