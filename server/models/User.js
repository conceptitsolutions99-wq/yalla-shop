const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  countryCode: {
    type: String,
    default: '+880'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  avatar: {
    type: String
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook', 'apple'],
    default: 'local'
  },
  socialId: {
    type: String
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  favoriteStores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
