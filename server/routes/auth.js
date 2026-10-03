const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { getIsConnected, memoryDb, saveDbToFile } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'yalla_secret_key_2024';

// Helper to generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
    }

    const { phoneNumber, password, countryCode = '+880', name = 'Guest User', email = '' } = req.body;

    if (getIsConnected()) {
      let user = await User.findOne({ phoneNumber });
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'User with this phone number already exists'
        });
      }

      user = new User({
        phoneNumber,
        password,
        countryCode,
        name,
        email
      });

      await user.save();
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          countryCode: user.countryCode,
          name: user.name,
          email: user.email,
          favorites: user.favorites || []
        }
      });
    } else {
      // Memory / local database
      const cleanPhone = phoneNumber.trim();
      const existing = memoryDb.users.find(u => u.phoneNumber === cleanPhone);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'User with this phone number already exists'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newId = '659' + Date.now().toString(16);

      const newUser = {
        _id: newId,
        phoneNumber: cleanPhone,
        countryCode,
        password: hashedPassword,
        name: name || 'User ' + cleanPhone.slice(-4),
        email: email || `${cleanPhone}@example.com`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
        favorites: [],
        favoriteStores: [],
        isActive: true,
        createdAt: new Date().toISOString()
      };

      memoryDb.users.push(newUser);
      saveDbToFile();

      const token = generateToken(newId);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: newUser._id,
          phoneNumber: newUser.phoneNumber,
          countryCode: newUser.countryCode,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          favorites: newUser.favorites
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
    }

    const { phoneNumber, password } = req.body;
    const cleanPhone = phoneNumber.trim();

    if (getIsConnected()) {
      const user = await User.findOne({ phoneNumber: cleanPhone });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number or password'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number or password'
        });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          countryCode: user.countryCode,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          favorites: user.favorites || []
        }
      });
    } else {
      // Find in memoryDb
      const user = memoryDb.users.find(u =>
        u.phoneNumber === cleanPhone ||
        cleanPhone.endsWith(u.phoneNumber) ||
        u.phoneNumber.endsWith(cleanPhone)
      );

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number or password'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number or password'
        });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          countryCode: user.countryCode,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          favorites: user.favorites || []
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/social-login
// @desc    Social Login (Google, Facebook, Apple)
// @access  Public
router.post('/social-login', async (req, res) => {
  try {
    const { provider = 'google', name = 'Social User', email = 'user@social.com' } = req.body;
    const phone = '01' + Math.floor(Math.random() * 90000000 + 10000000);

    let user = memoryDb.users.find(u => u.email === email);
    if (!user) {
      const newId = '659' + Date.now().toString(16);
      user = {
        _id: newId,
        phoneNumber: phone,
        countryCode: '+880',
        name,
        email,
        authProvider: provider,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
        favorites: [],
        favoriteStores: [],
        isActive: true,
        createdAt: new Date().toISOString()
      };
      memoryDb.users.push(user);
      saveDbToFile();
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: `Signed in with ${provider}`,
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        favorites: user.favorites
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Social login error' });
  }
});

// @route   POST /api/auth/guest-login
// @desc    Continue as guest
// @access  Public
router.post('/guest-login', (req, res) => {
  const guestUser = {
    _id: 'guest_' + Date.now(),
    phoneNumber: '+880 1700000000',
    countryCode: '+880',
    name: 'Guest Customer',
    email: 'guest@yallashop.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
    favorites: [],
    isGuest: true
  };

  const token = generateToken(guestUser._id);

  res.json({
    success: true,
    message: 'Browsing as Guest',
    token,
    user: guestUser
  });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.userId).select('-password');
      return res.json({ success: true, user });
    } else {
      const user = memoryDb.users.find(u => u._id.toString() === req.userId.toString());
      if (!user) {
        return res.json({
          success: true,
          user: {
            _id: req.userId,
            name: 'Sohel Chowdhury',
            phoneNumber: '1700000000',
            countryCode: '+880',
            email: 'sohel@example.com',
            favorites: ['652000000000000000000004']
          }
        });
      }
      const { password, ...safeUser } = user;
      return res.json({ success: true, user: safeUser });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
