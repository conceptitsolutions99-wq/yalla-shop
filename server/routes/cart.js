const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getIsConnected, memoryDb, saveDbToFile } = require('../db');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const cart = await Cart.findOne({ user: req.userId })
        .populate({
          path: 'items.product',
          populate: { path: 'store', select: 'name logo' }
        })
        .populate('store', 'name logo rating deliveryFee minimumOrder');

      if (!cart) {
        return res.json({
          success: true,
          cart: { items: [], totalItems: 0, totalPrice: 0 }
        });
      }

      return res.json({ success: true, cart });
    }

    // Memory fallback
    const cart = memoryDb.carts[req.userId.toString()];

    if (!cart) {
      return res.json({
        success: true,
        cart: { items: [], totalItems: 0, totalPrice: 0 }
      });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (getIsConnected()) {
      const product = await Product.findById(productId).populate('store');
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      let cart = await Cart.findOne({ user: req.userId });

      if (!cart) {
        cart = new Cart({
          user: req.userId,
          store: product.store._id,
          items: [{ product: productId, quantity }]
        });
      } else {
        if (cart.store && cart.store.toString() !== product.store._id.toString()) {
          return res.status(400).json({
            success: false,
            message: 'Cart contains items from another store. Please clear cart first.'
          });
        }

        const itemIndex = cart.items.findIndex(
          item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
          cart.store = product.store._id;
        }
      }

      await cart.populate('items.product');
      cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + (item.product.price.current * item.quantity),
        0
      );

      await cart.save();
      await cart.populate('store', 'name logo');

      return res.json({ success: true, cart, message: 'Item added to cart' });
    }

    // Memory fallback
    const product = memoryDb.products.find(p => p._id.toString() === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const uid = req.userId.toString();

    if (!memoryDb.carts[uid]) {
      memoryDb.carts[uid] = {
        items: [],
        store: product.store,
        totalItems: 0,
        totalPrice: 0
      };
    }

    const cart = memoryDb.carts[uid];

    // Check store consistency
    const storeId = typeof product.store === 'object' ? product.store._id : product.store;
    if (cart.store && cart.store.toString() !== storeId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cart contains items from another store. Please clear cart first.'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
      cart.store = storeId;
    }

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => {
        const price = typeof item.product === 'object' ? item.product.price.current : 0;
        return sum + (price * item.quantity);
      },
      0
    );

    saveDbToFile();

    res.json({ success: true, cart, message: 'Item added to cart' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/cart/update/:productId
// @desc    Update cart item quantity
// @access  Private
router.put('/update/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    if (getIsConnected()) {
      const cart = await Cart.findOne({ user: req.userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === req.params.productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Item not found in cart'
        });
      }

      cart.items[itemIndex].quantity = quantity;

      await cart.populate('items.product');
      cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + (item.product.price.current * item.quantity),
        0
      );

      await cart.save();

      return res.json({ success: true, cart, message: 'Cart updated' });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const cart = memoryDb.carts[uid];

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === req.params.productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cart.items[itemIndex].quantity = quantity;

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => {
        const price = typeof item.product === 'object' ? item.product.price.current : 0;
        return sum + (price * item.quantity);
      },
      0
    );

    saveDbToFile();

    res.json({ success: true, cart, message: 'Cart updated' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const cart = await Cart.findOne({ user: req.userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      cart.items = cart.items.filter(
        item => item.product.toString() !== req.params.productId
      );

      if (cart.items.length === 0) {
        cart.store = null;
        cart.totalItems = 0;
        cart.totalPrice = 0;
      } else {
        await cart.populate('items.product');
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce(
          (sum, item) => sum + (item.product.price.current * item.quantity),
          0
        );
      }

      await cart.save();

      return res.json({ success: true, cart, message: 'Item removed from cart' });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const cart = memoryDb.carts[uid];

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    if (cart.items.length === 0) {
      cart.store = null;
      cart.totalItems = 0;
      cart.totalPrice = 0;
    } else {
      cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (sum, item) => {
          const price = typeof item.product === 'object' ? item.product.price.current : 0;
          return sum + (price * item.quantity);
        },
        0
      );
    }

    saveDbToFile();

    res.json({ success: true, cart, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear cart
// @access  Private
router.delete('/clear', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      await Cart.findOneAndDelete({ user: req.userId });
      return res.json({ success: true, message: 'Cart cleared' });
    }

    // Memory fallback
    const uid = req.userId.toString();
    if (memoryDb.carts[uid]) {
      delete memoryDb.carts[uid];
      saveDbToFile();
    }

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;