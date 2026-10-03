const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    image: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unit: String,
    price: {
      type: Number,
      required: true
    }
  }],
  deliveryAddress: {
    name: String,
    phone: String,
    house: String,
    street: String,
    city: String,
    country: String,
    fullAddress: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number]
    }
  },
  deliveryType: {
    type: String,
    enum: ['Home Delivery', 'Take Away'],
    default: 'Home Delivery'
  },
  deliveryInstruction: {
    type: String
  },
  deliveryTip: {
    type: Number,
    default: 0
  },
  pricing: {
    itemTotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Paypal', 'Bkash', 'Stripe', 'Razorpay', 'Senang pay', 'Flutterwave', 'Paystack'],
    default: 'Cash on Delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  additionalNote: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate order ID
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    this.orderId = '10' + Math.floor(Math.random() * 90000 + 10000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
