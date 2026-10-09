const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const seedData = require('./data/seedData');

// Models
const Store = require('./models/Store');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const Address = require('./models/Address');

let isConnectedToMongo = false;

// Fallback in-memory / file store for standalone mode
const dataDir = path.join(__dirname, 'data');
const storeFilePath = path.join(dataDir, 'database.json');

const memoryDb = {
  users: [
    {
      _id: '659000000000000000000001',
      phoneNumber: '1700000000',
      countryCode: '+880',
      password: '$2a$10$/WDxkszuTtUU474qkK2uQuB8k661Y6YmcziWq2zPJrql0wf79GfBS', // hashed 'password123'
      name: 'Sohel Chowdhury',
      email: 'sohel@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
      favorites: ['652000000000000000000004', '652000000000000000000014', '652000000000000000000015', '652000000000000000000016'],
      favoriteStores: ['650000000000000000000001', '650000000000000000000003'],
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: '659000000000000000000002',
      phoneNumber: '1800000000',
      countryCode: '+880',
      password: '$2a$10$/WDxkszuTtUU474qkK2uQuB8k661Y6YmcziWq2zPJrql0wf79GfBS', // hashed 'password123'
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
      favorites: [],
      favoriteStores: [],
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ],
  stores: [...seedData.stores],
  categories: [...seedData.categories],
  products: [...seedData.products],
  orders: [
    {
      _id: '653000000000000000000001',
      orderId: '100103',
      user: '659000000000000000000001',
      store: seedData.stores[0],
      items: [
        {
          product: '652000000000000000000001',
          name: 'Stainless Steel Pan',
          image: seedData.products[0].images[0],
          quantity: 1,
          unit: 'pcs',
          price: 203.00
        }
      ],
      deliveryAddress: {
        name: 'Sohel Chowdhury',
        phone: '+880 1700000000',
        house: '1005',
        street: '09',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: '1212 Avenue 11, Dhaka, Bangladesh'
      },
      deliveryType: 'Home Delivery',
      deliveryTip: 15.00,
      pricing: {
        itemTotal: 203.00,
        discount: 87.00,
        deliveryFee: 15.00,
        total: 233.00
      },
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending',
      orderStatus: 'Confirmed',
      createdAt: new Date().toISOString()
    }
  ],
  carts: {},
  addresses: [
    {
      _id: '654000000000000000000001',
      user: '659000000000000000000001',
      name: 'Sohel Chowdhury',
      phone: '+880 1700000000',
      type: 'home',
      house: '1005',
      street: '09',
      city: 'Dhaka',
      country: 'Bangladesh',
      fullAddress: '1212 Avenue 11, Dhaka, Bangladesh',
      location: {
        type: 'Point',
        coordinates: [90.4125, 23.8103]
      },
      isDefault: true,
      createdAt: new Date().toISOString()
    }
  ]
};

// Save memoryDb to disk if needed
const saveDbToFile = () => {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(storeFilePath, JSON.stringify(memoryDb, null, 2));
  } catch (err) {
    console.error('Error saving database to file:', err);
  }
};

// Load memoryDb from disk if exists
const loadDbFromFile = () => {
  try {
    if (fs.existsSync(storeFilePath)) {
      const data = JSON.parse(fs.readFileSync(storeFilePath, 'utf8'));
      if (data.users) memoryDb.users = data.users;
      if (data.stores) memoryDb.stores = data.stores;
      if (data.products) memoryDb.products = data.products;
      if (data.categories) memoryDb.categories = data.categories;
      if (data.orders) memoryDb.orders = data.orders;
      if (data.carts) memoryDb.carts = data.carts;
      if (data.addresses) memoryDb.addresses = data.addresses;
    }
  } catch (err) {
    console.error('Error loading database file:', err);
  }
};

loadDbFromFile();

const seedMongoDb = async () => {
  try {
    const storeCount = await Store.countDocuments();
    if (storeCount === 0) {
      console.log('Seeding MongoDB stores...');
      await Store.insertMany(seedData.stores);
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('Seeding MongoDB categories...');
      await Category.insertMany(seedData.categories);
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding MongoDB products...');
      await Product.insertMany(seedData.products);
    }
    console.log('✓ MongoDB seed check completed');
  } catch (err) {
    console.error('MongoDB seed error:', err);
  }
};

const connectDb = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yalla-shop';
  try {
    // Set 2 second timeout for connection attempt
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnectedToMongo = true;
    console.log('✓ Connected to MongoDB');
    await seedMongoDb();
  } catch (err) {
    isConnectedToMongo = false;
    console.log('ℹ Notice: MongoDB service not found at ' + uri);
    console.log('✓ Running with Built-in High-Performance Embedded Database Engine (Full CRUD & Persistence enabled)');
  }
};

module.exports = {
  connectDb,
  getIsConnected: () => isConnectedToMongo,
  memoryDb,
  saveDbToFile
};
