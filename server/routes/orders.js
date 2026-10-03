const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getIsConnected, memoryDb, saveDbToFile } = require('../db');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      deliveryAddress,
      deliveryType,
      deliveryInstruction,
      deliveryTip,
      paymentMethod,
      additionalNote
    } = req.body;

    if (getIsConnected()) {
      // Get user's cart
      const cart = await Cart.findOne({ user: req.userId })
        .populate('items.product')
        .populate('store');

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Cart is empty'
        });
      }

      // Calculate pricing
      const itemTotal = cart.items.reduce(
        (sum, item) => sum + (item.product.price.current * item.quantity),
        0
      );

      const discount = cart.items.reduce(
        (sum, item) => {
          const discountAmount = item.product.discount > 0
            ? (item.product.price.original - item.product.price.current) * item.quantity
            : 0;
          return sum + discountAmount;
        },
        0
      );

      const deliveryFee = deliveryType === 'Home Delivery'
        ? (cart.store?.deliveryFee || 0)
        : 0;

      const total = itemTotal + deliveryFee + (deliveryTip || 0);

      // Prepare order items
      const orderItems = cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images[0],
        quantity: item.quantity,
        unit: item.product.unit,
        price: item.product.price.current
      }));

      // Create order
      const order = new Order({
        user: req.userId,
        store: cart.store._id,
        items: orderItems,
        deliveryAddress,
        deliveryType,
        deliveryInstruction,
        deliveryTip: deliveryTip || 0,
        pricing: {
          itemTotal,
          discount,
          deliveryFee,
          total
        },
        paymentMethod,
        additionalNote
      });

      await order.save();

      // Clear cart
      await Cart.findOneAndDelete({ user: req.userId });

      return res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order
      });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const cart = memoryDb.carts[uid];

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate pricing
    const itemTotal = cart.items.reduce(
      (sum, item) => sum + (typeof item.product === 'object' ? item.product.price.current : 0) * item.quantity,
      0
    );

    const discount = cart.items.reduce(
      (sum, item) => {
        const discountAmount = typeof item.product === 'object' && item.product.discount > 0
          ? (item.product.price.original - item.product.price.current) * item.quantity
          : 0;
        return sum + discountAmount;
      },
      0
    );

    const deliveryFee = deliveryType === 'Home Delivery'
      ? (cart.store?.deliveryFee || 0)
      : 0;

    const total = itemTotal + deliveryFee + (deliveryTip || 0);

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: typeof item.product === 'object' ? item.product._id : item.product,
      name: typeof item.product === 'object' ? item.product.name : item.product,
      image: typeof item.product === 'object' ? item.product.images[0] : '',
      quantity: item.quantity,
      unit: typeof item.product === 'object' ? item.product.unit : 'pcs',
      price: typeof item.product === 'object' ? item.product.price.current : 0
    }));

    // Create order
    const order = {
      _id: '653' + Date.now().toString().slice(-9),
      user: uid,
      store: cart.store,
      items: orderItems,
      deliveryAddress,
      deliveryType,
      deliveryInstruction: deliveryInstruction || '',
      deliveryTip: deliveryTip || 0,
      pricing: {
        itemTotal,
        discount,
        deliveryFee,
        total
      },
      paymentMethod,
      additionalNote,
      orderStatus: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Clear cart
    delete memoryDb.carts[uid];
    saveDbToFile();

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const { page = 1, limit = 10, status } = req.query;

      const query = { user: req.userId };
      if (status) {
        query.orderStatus = status;
      }

      const orders = await Order.find(query)
        .populate('store', 'name logo')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await Order.countDocuments(query);

      return res.json({
        success: true,
        orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const orders = memoryDb.orders
      .filter(o => o.user === uid)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const paged = orders.slice(start, start + limitNum);
    const count = orders.length;

    res.json({
      success: true,
      orders: paged,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      total: count
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const order = await Order.findOne({
        _id: req.params.id,
        user: req.userId
      }).populate('store', 'name logo phone address');

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      return res.json({ success: true, order });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const order = memoryDb.orders.find(o => o._id.toString() === req.params.id && o.user === uid);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;