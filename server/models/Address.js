const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['home', 'office', 'other'],
    default: 'home'
  },
  house: {
    type: String,
    required: true
  },
  street: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Bangladesh'
  },
  fullAddress: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

addressSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Address', addressSchema);
