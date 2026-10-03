const express = require('express');
const router = express.Router();
const { getIsConnected, memoryDb } = require('../db');
const Category = require('../models/Category');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { parent } = req.query;

    if (getIsConnected()) {
      const query = { isActive: true };
      if (parent) {
        query.parentCategory = parent;
      }

      const categories = await Category.find(query).sort({ order: 1, name: 1 });

      return res.json({ success: true, categories });
    }

    // Memory fallback
    let categories = [...memoryDb.categories];

    if (parent) {
      categories = categories.filter(c => c.parentCategory === parent);
    }

    categories = categories.filter(c => c.isActive !== false);

    categories.sort((a, b) => {
      if ((a.order || 0) !== (b.order || 0)) return (a.order || 0) - (b.order || 0);
      return (a.name || '').localeCompare(b.name || '');
    });

    res.json({ success: true, categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;