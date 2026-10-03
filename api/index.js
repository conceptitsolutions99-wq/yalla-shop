require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDb } = require('../server/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images if stored locally
app.use('/images', express.static(path.join(__dirname, '../Images')));

// Connect Database
connectDb();

// Routes
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/users', require('../server/routes/users'));
app.use('/api/stores', require('../server/routes/stores'));
app.use('/api/products', require('../server/routes/products'));
app.use('/api/categories', require('../server/routes/categories'));
app.use('/api/cart', require('../server/routes/cart'));
app.use('/api/orders', require('../server/routes/orders'));
app.use('/api/addresses', require('../server/routes/addresses'));
app.use('/api/parcel', require('../server/routes/parcel'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Yalla Shop API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
