const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  logo: {
    type: String
  },
  banner: {
    type: String
  },
  category: {
    type: String,
    enum: ['Grocery', 'Pharmacy', 'Shop', 'Food', 'Parcel', 'Medicine', 'Fashion', 'Electronics', 'Others'],
    required: true
  },
  address: {
    house: String,
    road: String,
    city: String,
    country: String,
    fullAddress: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  deliveryTime: {
    type: String,
    default: 'hours 2-3'
  },
  minimumOrder: {
    type: Number,
    default: 0
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

storeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Store', storeSchema);
