const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getIsConnected, memoryDb, saveDbToFile } = require('../db');
const Address = require('../models/Address');

// @route   GET /api/addresses
// @desc    Get user addresses
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const addresses = await Address.find({ user: req.userId })
        .sort({ isDefault: -1, createdAt: -1 });

      return res.json({ success: true, addresses });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const addresses = memoryDb.addresses
      .filter(a => a.user === uid)
      .sort((a, b) => {
        if (b.isDefault !== a.isDefault) return b.isDefault - a.isDefault;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    res.json({ success: true, addresses });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/addresses
// @desc    Add new address
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      phone,
      type,
      house,
      street,
      city,
      country,
      fullAddress,
      location,
      isDefault
    } = req.body;

    if (getIsConnected()) {
      // If this address is set as default, remove default from other addresses
      if (isDefault) {
        await Address.updateMany(
          { user: req.userId },
          { $set: { isDefault: false } }
        );
      }

      const address = new Address({
        user: req.userId,
        name,
        phone,
        type,
        house,
        street,
        city,
        country,
        fullAddress,
        location,
        isDefault
      });

      await address.save();

      return res.status(201).json({
        success: true,
        message: 'Address added successfully',
        address
      });
    }

    // Memory fallback
    const uid = req.userId.toString();

    if (isDefault) {
      memoryDb.addresses.forEach(a => {
        if (a.user === uid) a.isDefault = false;
      });
    }

    const newId = '654' + Date.now().toString();
    const address = {
      _id: newId,
      user: uid,
      name,
      phone,
      type,
      house,
      street,
      city,
      country,
      fullAddress,
      location,
      isDefault,
      createdAt: new Date().toISOString()
    };

    memoryDb.addresses.push(address);
    saveDbToFile();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      address
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/addresses/:id
// @desc    Update address
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      name,
      phone,
      type,
      house,
      street,
      city,
      country,
      fullAddress,
      location,
      isDefault
    } = req.body;

    if (getIsConnected()) {
      const address = await Address.findOne({
        _id: req.params.id,
        user: req.userId
      });

      if (!address) {
        return res.status(404).json({
          success: false,
          message: 'Address not found'
        });
      }

      // If setting as default, remove default from other addresses
      if (isDefault) {
        await Address.updateMany(
          { user: req.userId, _id: { $ne: req.params.id } },
          { $set: { isDefault: false } }
        );
      }

      const updates = {
        name, phone, type, house, street, city, country, fullAddress, location, isDefault
      };

      Object.assign(address, updates);
      await address.save();

      return res.json({
        success: true,
        message: 'Address updated successfully',
        address
      });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const address = memoryDb.addresses.find(
      a => a._id.toString() === req.params.id && a.user === uid
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    if (isDefault) {
      memoryDb.addresses.forEach(a => {
        if (a.user === uid && a._id.toString() !== req.params.id) {
          a.isDefault = false;
        }
      });
    }

    if (name) address.name = name;
    if (phone) address.phone = phone;
    if (type) address.type = type;
    if (house) address.house = house;
    if (street) address.street = street;
    if (city) address.city = city;
    if (country) address.country = country;
    if (fullAddress) address.fullAddress = fullAddress;
    if (location) address.location = location;
    if (isDefault !== undefined) address.isDefault = isDefault;

    saveDbToFile();

    res.json({
      success: true,
      message: 'Address updated successfully',
      address
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/addresses/:id
// @desc    Delete address
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      const address = await Address.findOneAndDelete({
        _id: req.params.id,
        user: req.userId
      });

      if (!address) {
        return res.status(404).json({
          success: false,
          message: 'Address not found'
        });
      }

      return res.json({ success: true, message: 'Address deleted successfully' });
    }

    // Memory fallback
    const uid = req.userId.toString();
    const index = memoryDb.addresses.findIndex(
      a => a._id.toString() === req.params.id && a.user === uid
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    memoryDb.addresses.splice(index, 1);
    saveDbToFile();

    res.json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/addresses/:id/default
// @desc    Set address as default
// @access  Private
router.put('/:id/default', auth, async (req, res) => {
  try {
    if (getIsConnected()) {
      // Remove default from all addresses
      await Address.updateMany(
        { user: req.userId },
        { $set: { isDefault: false } }
      );

      // Set this address as default
      const address = await Address.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { $set: { isDefault: true } },
        { new: true }
      );

      if (!address) {
        return res.status(404).json({
          success: false,
          message: 'Address not found'
        });
      }

      return res.json({
        success: true,
        message: 'Default address updated',
        address
      });
    }

    // Memory fallback
    const uid = req.userId.toString();

    // Remove default from all addresses
    memoryDb.addresses.forEach(a => {
      if (a.user === uid) a.isDefault = false;
    });

    // Set this address as default
    const address = memoryDb.addresses.find(
      a => a._id.toString() === req.params.id && a.user === uid
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    address.isDefault = true;
    saveDbToFile();

    res.json({
      success: true,
      message: 'Default address updated',
      address
    });
  } catch (error) {
    console.error('Set default address error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;