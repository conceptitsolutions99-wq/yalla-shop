const express = require('express');
const router = express.Router();
const { getIsConnected, memoryDb } = require('../db');
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      store,
      category,
      search,
      featured,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20
    } = req.query;

    if (getIsConnected()) {
      const query = { isActive: true };

      if (store) {
        query.store = store;
      }

      if (category) {
        query.category = category;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (search) {
        query.$text = { $search: search };
      }

      if (minPrice || maxPrice) {
        query['price.current'] = {};
        if (minPrice) query['price.current'].$gte = Number(minPrice);
        if (maxPrice) query['price.current'].$lte = Number(maxPrice);
      }

      const products = await Product.find(query)
        .populate('store', 'name logo rating')
        .sort({ isFeatured: -1, createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await Product.countDocuments(query);

      return res.json({
        success: true,
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      });
    }

    // Memory fallback
    let products = [...memoryDb.products];

    if (store) {
      products = products.filter(p => p.store && p.store.toString() === store);
    }

    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (featured === 'true') {
      products = products.filter(p => p.isFeatured);
    }

    if (search) {
      const lower = search.toLowerCase();
      products = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(lower)) ||
        (p.description && p.description.toLowerCase().includes(lower))
      );
    }

    const minP = minPrice ? Number(minPrice) : null;
    const maxP = maxPrice ? Number(maxPrice) : null;
    if (minP !== null || maxP !== null) {
      products = products.filter(p => {
        const price = p.price?.current;
        if (price == null) return false;
        if (minP !== null && price < minP) return false;
        if (maxP !== null && price > maxP) return false;
        return true;
      });
    }

    products = products.filter(p => p.isActive !== false);

    products.sort((a, b) => {
      if (b.isFeatured !== a.isFeatured) return b.isFeatured - a.isFeatured;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const count = products.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const paged = products.slice(start, start + limitNum);

    res.json({
      success: true,
      products: paged,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      total: count
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (getIsConnected()) {
      const product = await Product.findById(req.params.id)
        .populate('store', 'name logo rating deliveryTime');

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      return res.json({ success: true, product });
    }

    // Memory fallback
    const product = memoryDb.products.find(p => p._id.toString() === req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;