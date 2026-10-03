const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  icon: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  parentCategory: {
    type: String,
    enum: ['Grocery', 'Pharmacy', 'Shop', 'Food', 'Parcel'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
