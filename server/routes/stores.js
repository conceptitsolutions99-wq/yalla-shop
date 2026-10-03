const express = require('express');
const router = express.Router();
const { getIsConnected, memoryDb } = require('../db');
const Store = require('../models/Store');

// @route   GET /api/stores
// @desc    Get all stores
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, page = 1, limit = 10 } = req.query;

    if (getIsConnected()) {
      const query = { isActive: true };

      if (category) {
        query.category = category;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      const stores = await Store.find(query)
        .sort({ isFeatured: -1, createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await Store.countDocuments(query);

      return res.json({
        success: true,
        stores,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      });
    }

    // Memory fallback
    let stores = [...memoryDb.stores];

    if (category) {
      stores = stores.filter(s => s.category === category);
    }

    if (featured === 'true') {
      stores = stores.filter(s => s.isFeatured);
    }

    if (search) {
      const lower = search.toLowerCase();
      stores = stores.filter(s => s.name && s.name.toLowerCase().includes(lower));
    }

    stores = stores.filter(s => s.isActive !== false);

    stores.sort((a, b) => {
      if (b.isFeatured !== a.isFeatured) return b.isFeatured - a.isFeatured;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const count = stores.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const paged = stores.slice(start, start + limitNum);

    res.json({
      success: true,
      stores: paged,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      total: count
    });
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/stores/:id
// @desc    Get store by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (getIsConnected()) {
      const store = await Store.findById(req.params.id);

      if (!store) {
        return res.status(404).json({
          success: false,
          message: 'Store not found'
        });
      }

      return res.json({ success: true, store });
    }

    // Memory fallback
    const store = memoryDb.stores.find(s => s._id.toString() === req.params.id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({ success: true, store });
  } catch (error) {
    console.error('Get store error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/stores/category/:category
// @desc    Get stores by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    if (getIsConnected()) {
      const stores = await Store.find({
        category: req.params.category,
        isActive: true
      }).sort({ rating: -1 });

      return res.json({ success: true, stores });
    }

    // Memory fallback
    const stores = memoryDb.stores
      .filter(s => s.category === req.params.category && s.isActive !== false)
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));

    res.json({ success: true, stores });
  } catch (error) {
    console.error('Get stores by category error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
