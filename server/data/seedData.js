const seedData = {
  stores: [
    {
      _id: '650000000000000000000001',
      name: 'Sk General Store',
      description: 'Your one-stop general store for daily kitchen and household essentials',
      category: 'Grocery',
      logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=400&fit=crop',
      address: {
        house: '00',
        road: '00',
        city: 'City-000',
        country: 'Country',
        fullAddress: 'House: 00, Road: 00, City-000, Country'
      },
      location: {
        type: 'Point',
        coordinates: [90.4125, 23.8103]
      },
      rating: {
        average: 4.8,
        count: 142
      },
      deliveryTime: 'hours 2-3',
      minimumOrder: 0.00,
      deliveryFee: 15.00,
      isFeatured: true,
      isActive: true
    },
    {
      _id: '650000000000000000000002',
      name: 'Veggie Market',
      description: 'Fresh vegetables, fish, meat, and organic products daily',
      category: 'Grocery',
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=1200&h=400&fit=crop',
      address: {
        house: '12',
        road: '04',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: 'House: 12, Road: 04, Banani, Dhaka, Bangladesh'
      },
      location: {
        type: 'Point',
        coordinates: [90.4075, 23.7937]
      },
      rating: {
        average: 4.9,
        count: 285
      },
      deliveryTime: 'hours 1-2',
      minimumOrder: 50.00,
      deliveryFee: 20.00,
      isFeatured: true,
      isActive: true
    },
    {
      _id: '650000000000000000000003',
      name: 'Fashion Store',
      description: 'Trending fashion items, bags, jewelry, and lifestyle wear',
      category: 'Shop',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
      address: {
        house: '05',
        road: '02',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: 'House: 05, Road: 02, Gulshan, Dhaka, Bangladesh'
      },
      location: {
        type: 'Point',
        coordinates: [90.4152, 23.7925]
      },
      rating: {
        average: 4.7,
        count: 89
      },
      deliveryTime: 'hours 3-5',
      minimumOrder: 100.00,
      deliveryFee: 30.00,
      isFeatured: true,
      isActive: true
    },
    {
      _id: '650000000000000000000004',
      name: 'Smart Shopping',
      description: 'Modern supermarket for personal care, appliances, and home goods',
      category: 'Shop',
      logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200&h=400&fit=crop',
      address: {
        house: '08',
        road: '01',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: 'House: 08, Road: 01, Dhanmondi, Dhaka, Bangladesh'
      },
      location: {
        type: 'Point',
        coordinates: [90.3753, 23.7461]
      },
      rating: {
        average: 4.6,
        count: 112
      },
      deliveryTime: 'hours 2-3',
      minimumOrder: 30.00,
      deliveryFee: 25.00,
      isFeatured: true,
      isActive: true
    },
    {
      _id: '650000000000000000000005',
      name: 'Infi-Health Pharmacy',
      description: 'Licensed pharmacy offering authentic medicine, healthcare & wellness items',
      category: 'Pharmacy',
      logo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&h=400&fit=crop',
      address: {
        house: '33',
        road: '15',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: 'House: 33, Road: 15, Uttara, Dhaka, Bangladesh'
      },
      location: {
        type: 'Point',
        coordinates: [90.3984, 23.8759]
      },
      rating: {
        average: 4.9,
        count: 310
      },
      deliveryTime: 'mins 30-45',
      minimumOrder: 20.00,
      deliveryFee: 15.00,
      isFeatured: true,
      isActive: true
    },
    {
      _id: '650000000000000000000006',
      name: 'Italian Fast Food',
      description: 'Authentic Italian pizza, pasta, calzones, and gourmet appetizers',
      category: 'Food',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop',
      address: {
        house: '22',
        road: '11',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: 'House: 22, Road: 11, Banani, Dhaka, Bangladesh'
      },
      location: {
        type: 'Point',
        coordinates: [90.4032, 23.7915]
      },
      rating: {
        average: 4.8,
        count: 420
      },
      deliveryTime: 'mins 30-45',
      minimumOrder: 40.00,
      deliveryFee: 20.00,
      isFeatured: true,
      isActive: true
    },
    {
      _id: '650000000000000000000007',
      name: 'Hungry Puppets',
      description: 'Delicious burgers, loaded fries, shakes, and signature pizzas',
      category: 'Food',
      logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop',
      banner: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=400&fit=crop',
      address: {
        house: '19',
        road: '08',
        city: 'Dhaka',
        country: 'Bangladesh',
        fullAddress: 'House: 19, Road: 08, Mirpur, Dhaka, Bangladesh'
      },
      location: {
        type: 'Point',
        coordinates: [90.3643, 23.8071]
      },
      rating: {
        average: 4.5,
        count: 195
      },
      deliveryTime: 'mins 25-40',
      minimumOrder: 25.00,
      deliveryFee: 15.00,
      isFeatured: true,
      isActive: true
    }
  ],

  categories: [
    {
      _id: '651000000000000000000001',
      name: 'Grocery',
      parentCategory: 'Grocery',
      icon: 'ShoppingBasket',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
      description: 'Daily fresh grocery items',
      order: 1,
      isActive: true
    },
    {
      _id: '651000000000000000000002',
      name: 'Pharmacy',
      parentCategory: 'Pharmacy',
      icon: 'Cross',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop',
      description: 'Prescription & OTC medicines',
      order: 2,
      isActive: true
    },
    {
      _id: '651000000000000000000003',
      name: 'Shop',
      parentCategory: 'Shop',
      icon: 'ShoppingBag',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      description: 'Fashion, electronics and home essentials',
      order: 3,
      isActive: true
    },
    {
      _id: '651000000000000000000004',
      name: 'Food',
      parentCategory: 'Food',
      icon: 'Utensils',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
      description: 'Hot restaurant food delivered fast',
      order: 4,
      isActive: true
    },
    {
      _id: '651000000000000000000005',
      name: 'Parcel',
      parentCategory: 'Parcel',
      icon: 'Package',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop',
      description: 'Door-to-door courier service',
      order: 5,
      isActive: true
    },
    // Subcategories
    {
      _id: '651000000000000000000010',
      name: 'Home & Kitchen Appliances',
      parentCategory: 'Grocery',
      icon: 'CookingPot',
      order: 6,
      isActive: true
    },
    {
      _id: '651000000000000000000011',
      name: 'Fruits & Vegetables',
      parentCategory: 'Grocery',
      icon: 'Apple',
      order: 7,
      isActive: true
    },
    {
      _id: '651000000000000000000012',
      name: 'Cooking Essentials',
      parentCategory: 'Grocery',
      icon: 'Soup',
      order: 8,
      isActive: true
    },
    {
      _id: '651000000000000000000013',
      name: 'Fish & Meat',
      parentCategory: 'Grocery',
      icon: 'Fish',
      order: 9,
      isActive: true
    },
    {
      _id: '651000000000000000000014',
      name: 'Medicine',
      parentCategory: 'Pharmacy',
      icon: 'Pill',
      order: 10,
      isActive: true
    },
    {
      _id: '651000000000000000000015',
      name: 'Surgical Instrument',
      parentCategory: 'Pharmacy',
      icon: 'Scissors',
      order: 11,
      isActive: true
    },
    {
      _id: '651000000000000000000016',
      name: 'Vaccines',
      parentCategory: 'Pharmacy',
      icon: 'Syringe',
      order: 12,
      isActive: true
    },
    {
      _id: '651000000000000000000017',
      name: 'Supplements & Vitamins',
      parentCategory: 'Pharmacy',
      icon: 'HeartPulse',
      order: 13,
      isActive: true
    },
    {
      _id: '651000000000000000000018',
      name: 'Medical Devices',
      parentCategory: 'Pharmacy',
      icon: 'Activity',
      order: 14,
      isActive: true
    },
    {
      _id: '651000000000000000000019',
      name: 'Burger',
      parentCategory: 'Food',
      icon: 'Sandwich',
      order: 15,
      isActive: true
    },
    {
      _id: '651000000000000000000020',
      name: 'Biriyani',
      parentCategory: 'Food',
      icon: 'UtensilsCrossed',
      order: 16,
      isActive: true
    },
    {
      _id: '651000000000000000000021',
      name: 'Asian',
      parentCategory: 'Food',
      icon: 'Soup',
      order: 17,
      isActive: true
    },
    {
      _id: '651000000000000000000022',
      name: 'Cake',
      parentCategory: 'Food',
      icon: 'Cake',
      order: 18,
      isActive: true
    },
    {
      _id: '651000000000000000000023',
      name: 'Coffee & Drinks',
      parentCategory: 'Food',
      icon: 'Coffee',
      order: 19,
      isActive: true
    }
  ],

  products: [
    {
      _id: '652000000000000000000001',
      name: 'Stainless Steel Pan',
      description: 'Heavy duty high quality stainless steel cooking frying pan with ergonomic heat-resistant handle.',
      images: [
        'https://images.unsplash.com/photo-1584990347449-39908cfd05ca?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&h=600&fit=crop'
      ],
      price: {
        current: 203.00,
        original: 290.00
      },
      discount: 30,
      unit: 'pcs',
      quantity: 50,
      store: '650000000000000000000001',
      category: 'Home & Kitchen Appliances',
      subCategory: 'Cookware',
      rating: {
        average: 4.8,
        count: 14
      },
      stock: 'In Stock',
      tags: ['pan', 'kitchen', 'cookware', 'stainless steel'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000002',
      name: 'Stainless Steel Ice Cream Scoop',
      description: 'Professional ice cream scoop with spring release mechanism made from anti-rust food grade stainless steel.',
      images: [
        'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=600&fit=crop'
      ],
      price: {
        current: 174.00,
        original: 200.00
      },
      discount: 26,
      unit: 'pcs',
      quantity: 35,
      store: '650000000000000000000001',
      category: 'Home & Kitchen Appliances',
      subCategory: 'Utensils',
      rating: {
        average: 4.6,
        count: 8
      },
      stock: 'In Stock',
      tags: ['scoop', 'ice cream', 'kitchen', 'utensil'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000003',
      name: 'Red Seedless Grapes',
      description: 'Fresh, sweet, and juicy seedless red grapes directly sourced from premium organic fruit gardens.',
      images: [
        'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=600&fit=crop'
      ],
      price: {
        current: 400.00,
        original: 500.00
      },
      discount: 20,
      unit: 'kg',
      quantity: 120,
      store: '650000000000000000000001',
      category: 'Fruits & Vegetables',
      subCategory: 'Fruits',
      rating: {
        average: 4.9,
        count: 32
      },
      stock: 'In Stock',
      tags: ['grapes', 'fruits', 'organic', 'fresh'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000004',
      name: 'Basa Fish Fillet (± 50 gm)',
      description: 'One can avail BASA/PANKAS FILLETS from us at the best prices. We supply FILLETS in bulk quantities to hotels, restaurants and other food industries at best market price. This food product is hygienically deboned. FILLETS is rich in nutrients and can be used for cook various dishes.',
      images: [
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1534948216015-843149f72be3?w=600&h=600&fit=crop'
      ],
      price: {
        current: 430.00,
        original: 500.00
      },
      discount: 14,
      unit: 'kg',
      quantity: 40,
      store: '650000000000000000000002',
      category: 'Fish & Meat',
      subCategory: 'Fresh Fish',
      rating: {
        average: 4.9,
        count: 27
      },
      stock: 'In Stock',
      tags: ['fish', 'basa fillet', 'meat', 'fresh', 'seafood'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000005',
      name: 'Kitchen Cooking Spoon Set',
      description: 'Premium stainless steel ladle and cooking spoon set for versatile kitchen preparation.',
      images: [
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&h=600&fit=crop'
      ],
      price: {
        current: 920.00,
        original: 1000.00
      },
      discount: 8,
      unit: 'pcs',
      quantity: 25,
      store: '650000000000000000000001',
      category: 'Home & Kitchen Appliances',
      subCategory: 'Utensils',
      rating: {
        average: 4.7,
        count: 19
      },
      stock: 'In Stock',
      tags: ['spoon', 'cooking', 'kitchen', 'utensil'],
      isFeatured: false,
      isActive: true
    },
    {
      _id: '652000000000000000000006',
      name: 'Vegetable Chips Crisp Pack',
      description: 'Crunchy farm-fresh mixed vegetable chips salted with Himalayan pink salt.',
      images: [
        'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=600&fit=crop'
      ],
      price: {
        current: 500.00,
        original: 550.00
      },
      discount: 10,
      unit: 'pack',
      quantity: 75,
      store: '650000000000000000000001',
      category: 'Cooking Essentials',
      subCategory: 'Snacks',
      rating: {
        average: 4.5,
        count: 11
      },
      stock: 'In Stock',
      tags: ['chips', 'vegetable', 'crisp', 'snack'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000007',
      name: 'Maggi Clear Vegeta Seasoning',
      description: 'Aromatic vegetable bouillon and seasoning mix for soups, stews, and roasted dishes.',
      images: [
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop'
      ],
      price: {
        current: 300.00,
        original: 320.00
      },
      discount: 6,
      unit: 'pack',
      quantity: 110,
      store: '650000000000000000000001',
      category: 'Cooking Essentials',
      subCategory: 'Spices & Seasoning',
      rating: {
        average: 4.8,
        count: 45
      },
      stock: 'In Stock',
      tags: ['maggi', 'vegeta', 'seasoning', 'cooking'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000008',
      name: 'BetterBody Organic Superfood Formula',
      description: 'Rich nutrient organic superfood powder packed with vitamins, antioxidants, and greens.',
      images: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop'
      ],
      price: {
        current: 1.00,
        original: 5.00
      },
      discount: 80,
      unit: 'pcs',
      quantity: 99,
      store: '650000000000000000000002',
      category: 'Fruits & Vegetables',
      subCategory: 'Superfood',
      rating: {
        average: 4.9,
        count: 88
      },
      stock: 'In Stock',
      tags: ['organic', 'superfood', 'health'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000009',
      name: 'Original Green Chilli Pickle Jar',
      description: 'Traditional spiced green chilli pickle preserved in mustard oil and aromatic spices.',
      images: [
        'https://images.unsplash.com/photo-1589135233689-d56d817b3c20?w=600&h=600&fit=crop'
      ],
      price: {
        current: 82.80,
        original: 90.00
      },
      discount: 8,
      unit: 'kg',
      quantity: 30,
      store: '650000000000000000000001',
      category: 'Cooking Essentials',
      subCategory: 'Pickles',
      rating: {
        average: 4.7,
        count: 16
      },
      stock: 'In Stock',
      tags: ['pickle', 'chilli', 'spice', 'jar'],
      isFeatured: false,
      isActive: true
    },
    {
      _id: '652000000000000000000010',
      name: 'Citron Luxury Bath Soap Bar Pack',
      description: 'Refreshing citrus herbal exfoliating soap bars infused with lemon oil and moisturizers.',
      images: [
        'https://images.unsplash.com/photo-1607006314544-77e8a9f6ecae?w=600&h=600&fit=crop'
      ],
      price: {
        current: 77.00,
        original: 95.00
      },
      discount: 19,
      unit: 'pcs',
      quantity: 85,
      store: '650000000000000000000004',
      category: 'Shop',
      subCategory: 'Personal Care',
      rating: {
        average: 4.8,
        count: 22
      },
      stock: 'In Stock',
      tags: ['soap', 'citron', 'bath', 'personal care'],
      isFeatured: false,
      isActive: true
    },
    {
      _id: '652000000000000000000011',
      name: 'Prostatan Herbal Health Capsules',
      description: 'Natural herbal formula capsules formulated for men wellness and vitality.',
      images: [
        'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=600&fit=crop'
      ],
      price: {
        current: 120.00,
        original: 150.00
      },
      discount: 20,
      unit: 'pack',
      quantity: 45,
      store: '650000000000000000000005',
      category: 'Pharmacy',
      subCategory: 'Medicine',
      rating: {
        average: 4.9,
        count: 35
      },
      stock: 'In Stock',
      tags: ['capsules', 'prostatan', 'medicine', 'pharmacy'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000012',
      name: 'Ensure Adult Nutrition Milk Powder (400g)',
      description: 'Complete and balanced nutrition powder with 28 essential vitamins and minerals for active adults.',
      images: [
        'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&h=600&fit=crop'
      ],
      price: {
        current: 100.00,
        original: 120.00
      },
      discount: 16,
      unit: 'pack',
      quantity: 60,
      store: '650000000000000000000005',
      category: 'Pharmacy',
      subCategory: 'Supplements & Vitamins',
      rating: {
        average: 4.9,
        count: 70
      },
      stock: 'In Stock',
      tags: ['ensure', 'nutrition', 'milk', 'adults', 'vitamins'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000013',
      name: 'Munchkin Snack Catcher (2 Pack, Blue/Green)',
      description: 'Toddler snack container with spill-proof soft silicone flaps for easy self-feeding on the go.',
      images: [
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=600&fit=crop'
      ],
      price: {
        current: 53.10,
        original: 59.00
      },
      discount: 10,
      unit: 'pcs',
      quantity: 40,
      store: '650000000000000000000004',
      category: 'Shop',
      subCategory: 'Baby Care',
      rating: {
        average: 4.7,
        count: 18
      },
      stock: 'In Stock',
      tags: ['munchkin', 'snack catcher', 'baby', 'toddler'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000014',
      name: 'Soft Plush Teddy Bear Toy',
      description: 'Ultra-soft premium plush stuffed teddy bear toy with cute ribbon, safe for all ages.',
      images: [
        'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&h=600&fit=crop'
      ],
      price: {
        current: 33.00,
        original: 45.00
      },
      discount: 26,
      unit: 'pcs',
      quantity: 50,
      store: '650000000000000000000003',
      category: 'Shop',
      subCategory: 'Toys & Gifts',
      rating: {
        average: 4.9,
        count: 40
      },
      stock: 'In Stock',
      tags: ['teddy bear', 'toy', 'plush', 'gift'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000015',
      name: 'Women Trendy Charm Cuff Bracelet',
      description: 'Elegant gold-plated open cuff bracelet with sparkling zircon crystals for parties and casual wear.',
      images: [
        'https://images.unsplash.com/photo-1611591475102-468ae392a95c?w=600&h=600&fit=crop'
      ],
      price: {
        current: 150.00,
        original: 200.00
      },
      discount: 25,
      unit: 'pcs',
      quantity: 30,
      store: '650000000000000000000003',
      category: 'Shop',
      subCategory: 'Jewelry',
      rating: {
        average: 4.8,
        count: 15
      },
      stock: 'In Stock',
      tags: ['bracelet', 'jewelry', 'women', 'fashion'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000016',
      name: 'VE Casual Shoulder Bag - Blue',
      description: 'Spacious waterproof canvas tote shoulder bag with multiple zippered compartments for daily work & travel.',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop'
      ],
      price: {
        current: 70.00,
        original: 85.00
      },
      discount: 17,
      unit: 'pcs',
      quantity: 20,
      store: '650000000000000000000003',
      category: 'Shop',
      subCategory: 'Bags & Shoes',
      rating: {
        average: 4.6,
        count: 24
      },
      stock: 'In Stock',
      tags: ['bag', 'handbag', 'tote', 'fashion'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000017',
      name: 'Italian Fettuccine Pasta with Sauce',
      description: 'Handmade fresh egg fettuccine pasta tossed in creamy garlic parmesan sauce with fresh herbs.',
      images: [
        'https://images.unsplash.com/photo-1621996346565-e3adc644d942?w=600&h=600&fit=crop'
      ],
      price: {
        current: 200.00,
        original: 240.00
      },
      discount: 16,
      unit: 'pcs',
      quantity: 60,
      store: '650000000000000000000006',
      category: 'Food',
      subCategory: 'Pasta',
      rating: {
        average: 4.9,
        count: 52
      },
      stock: 'In Stock',
      tags: ['pasta', 'fettuccine', 'italian', 'food', 'restaurant'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000018',
      name: 'Meat Lover Deluxe Pizza (12 inch)',
      description: 'Crispy stone-baked crust topped with marinara sauce, mozzarella cheese, pepperoni, smoked beef, and sausages.',
      images: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop'
      ],
      price: {
        current: 370.00,
        original: 400.00
      },
      discount: 8,
      unit: 'pcs',
      quantity: 40,
      store: '650000000000000000000007',
      category: 'Food',
      subCategory: 'Pizza',
      rating: {
        average: 4.8,
        count: 84
      },
      stock: 'In Stock',
      tags: ['pizza', 'meat', 'cheese', 'food', 'fast food'],
      isFeatured: true,
      isActive: true
    },
    {
      _id: '652000000000000000000019',
      name: 'Tea Glass Original Drink Bottle',
      description: 'Chilled iced refreshing herbal tea in a classic retro glass bottle.',
      images: [
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop'
      ],
      price: {
        current: 227.50,
        original: 250.00
      },
      discount: 9,
      unit: 'ltr',
      quantity: 80,
      store: '650000000000000000000002',
      category: 'Food',
      subCategory: 'Coffee & Drinks',
      rating: {
        average: 4.7,
        count: 31
      },
      stock: 'In Stock',
      tags: ['tea', 'drink', 'beverage', 'bottle'],
      isFeatured: true,
      isActive: true
    }
  ]
};

module.exports = seedData;
