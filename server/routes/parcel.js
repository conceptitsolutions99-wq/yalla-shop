const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getIsConnected, memoryDb, saveDbToFile } = require('../db');

// @route   POST /api/parcel/request
// @desc    Create parcel delivery request
// @access  Private / Public
router.post('/request', (req, res) => {
  try {
    const {
      category,
      senderInfo,
      receiverInfo,
      distance = '2.74 km',
      deliveryFee = 90.00,
      deliveryTip = 0,
      chargePayBy = 'Sender',
      paymentMethod = 'Cash on Delivery',
      instructions = ''
    } = req.body;

    const parcelOrder = {
      _id: '658' + Date.now().toString(16),
      orderId: 'P' + Math.floor(Math.random() * 90000 + 10000),
      type: 'Parcel',
      category: category || 'Gifts',
      senderInfo: senderInfo || {
        name: 'Sohel',
        phone: '+880 1700000000',
        house: '12',
        street: '09',
        floor: '02',
        address: 'R9W8+5C Dhaka, Bangladesh'
      },
      receiverInfo: receiverInfo || {
        name: 'Rabby',
        phone: '+880 1712345678',
        house: '1005',
        street: '08',
        floor: '02',
        address: 'R9W8+5C Dhaka, Bangladesh'
      },
      distance,
      pricing: {
        deliveryFee: Number(deliveryFee) || 90.00,
        deliveryTip: Number(deliveryTip) || 0,
        total: (Number(deliveryFee) || 90.00) + (Number(deliveryTip) || 0)
      },
      chargePayBy,
      paymentMethod,
      instructions,
      orderStatus: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    if (!memoryDb.orders) memoryDb.orders = [];
    memoryDb.orders.unshift(parcelOrder);
    saveDbToFile();

    res.status(201).json({
      success: true,
      message: 'Parcel request created successfully',
      parcel: parcelOrder
    });
  } catch (error) {
    console.error('Parcel request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/parcel/categories
// @desc    Get parcel category types
// @access  Public
router.get('/categories', (req, res) => {
  const parcelCategories = [
    {
      id: 'gifts',
      title: 'Gifts',
      description: 'Flowers, cards, chocolates, souvenirs',
      icon: 'Gift',
      color: '#ff7675'
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Important papers, letters, certificates (No cheques/passports)',
      icon: 'FileText',
      color: '#74b9ff'
    },
    {
      id: 'electronics',
      title: 'Electronics',
      description: 'Bubble wrapped small gadgets, accessories, parts',
      icon: 'Smartphone',
      color: '#a29bfe'
    },
    {
      id: 'package',
      title: 'Package',
      description: 'Non-perishable goods, clothes, home items (Max 10kg)',
      icon: 'Package',
      color: '#00b894'
    }
  ];

  res.json({ success: true, categories: parcelCategories });
});

module.exports = router;
