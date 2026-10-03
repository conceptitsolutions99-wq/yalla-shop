const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getIsConnected, memoryDb, saveDbToFile } = require('../db');
const User = require('../models/User');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.userId)
        .select('-password')
        .populate('favorites', 'name images price')
        .populate('favoriteStores', 'name logo rating');

      return res.json({ success: true, user });
    }

    // Memory fallback
    const user = memoryDb.users.find(u => u._id.toString() === req.userId.toString());

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { password, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    if (getIsConnected()) {
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (avatar) updates.avatar = avatar;

      const user = await User.findByIdAndUpdate(
        req.userId,
        { $set: updates },
        { new: true }
      ).select('-password');

      return res.json({ success: true, user });
    }

    // Memory fallback
    const user = memoryDb.users.find(u => u._id.toString() === req.userId.toString());
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    saveDbToFile();

    const { password, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/users/favorites/:productId
// @desc    Add product to favorites
// @access  Private
router.post('/favorites/:productId', auth, async (req, res) => {
  try {
    const uid = req.userId.toString();

    if (getIsConnected()) {
      const user = await User.findById(req.userId);

      if (user.favorites.includes(req.params.productId)) {
        return res.status(400).json({
          success: false,
          message: 'Product already in favorites'
        });
      }

      user.favorites.push(req.params.productId);
      await user.save();

      return res.json({ success: true, message: 'Product added to favorites' });
    }

    // Memory fallback
    const user = memoryDb.users.find(u => u._id.toString() === uid);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.favorites.includes(req.params.productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product already in favorites'
      });
    }

    user.favorites.push(req.params.productId);
    saveDbToFile();

    res.json({ success: true, message: 'Product added to favorites' });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/users/favorites/:productId
// @desc    Remove product from favorites
// @access  Private
router.delete('/favorites/:productId', auth, async (req, res) => {
  try {
    const uid = req.userId.toString();

    if (getIsConnected()) {
      const user = await User.findById(req.userId);
      user.favorites = user.favorites.filter(
        id => id.toString() !== req.params.productId
      );
      await user.save();

      return res.json({ success: true, message: 'Product removed from favorites' });
    }

    // Memory fallback
    const user = memoryDb.users.find(u => u._id.toString() === uid);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.productId
    );
    saveDbToFile();

    res.json({ success: true, message: 'Product removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/users/favorites
// @desc    Get user favorites
// @access  Private
router.get('/favorites', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.userId)
        .populate({
          path: 'favorites',
          populate: { path: 'store', select: 'name' }
        });

      return res.json({ success: true, favorites: user.favorites });
    }

    // Memory fallback
    const user = memoryDb.users.find(u => u._id.toString() === req.userId.toString());
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, favorites: user.favorites || [] });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;