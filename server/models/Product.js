const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  price: {
    current: {
      type: Number,
      required: true,
      min: 0
    },
    original: {
      type: Number
    }
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  unit: {
    type: String,
    enum: ['kg', 'gm', 'ltr', 'ml', 'pcs', 'pack'],
    default: 'pcs'
  },
  quantity: {
    type: Number,
    default: 0
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String
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
  stock: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Limited Stock'],
    default: 'In Stock'
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
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

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
