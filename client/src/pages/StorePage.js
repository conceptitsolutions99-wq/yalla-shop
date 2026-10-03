import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Store, MapPin, Star, Clock, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts, getStores } from '../api';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Fresh Apples', price: 5.99, originalPrice: 7.99, stock: 30, image: 'https://via.placeholder.com/150?text=Apples', rating: 4.5, unit: 'Kg', storeName: 'Yalla Grocery', category: 'Fruits' },
  { id: 2, name: 'Banana Bunch', price: 3.50, originalPrice: 4.00, stock: 50, image: 'https://via.placeholder.com/150?text=Banana', rating: 4.2, unit: 'Pcs', storeName: 'Yalla Grocery', category: 'Fruits' },
  { id: 3, name: 'Whole Milk 1L', price: 8.99, originalPrice: 9.99, stock: 20, image: 'https://via.placeholder.com/150?text=Milk', rating: 4.4, unit: 'Ltr', storeName: 'Yalla Grocery', category: 'Dairy' },
  { id: 4, name: 'Bread Loaf', price: 2.99, originalPrice: 3.49, stock: 40, image: 'https://via.placeholder.com/150?text=Bread', rating: 4.0, unit: 'Pcs', storeName: 'Yalla Grocery', category: 'Bakery' },
  { id: 5, name: 'Eggs 12ct', price: 6.50, originalPrice: 7.50, stock: 15, image: 'https://via.placeholder.com/150?text=Eggs', rating: 4.6, unit: 'Pcs', storeName: 'Yalla Grocery', category: 'Dairy' },
  { id: 6, name: 'Rice 5kg', price: 18.00, originalPrice: 20.00, stock: 25, image: 'https://via.placeholder.com/150?text=Rice', rating: 4.3, unit: 'Kg', storeName: 'Yalla Grocery', category: 'Grains' },
];

const MOCK_STORE = {
  id: 101, name: 'Yalla Grocery', logo: 'https://via.placeholder.com/80?text=Yalla', address: '123 Market Street, Dhaka', rating: 4.6, deliveryTime: '1 hour', banner: 'https://via.placeholder.com/750x180?text=Yalla+Grocery',
};

const StorePage = () => {
  const { id } = useParams();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const allProducts = MOCK_PRODUCTS;
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];
  const filtered = allProducts.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const store = MOCK_STORE;
  const totalItems = filtered.reduce((s, p) => s + p.stock, 0);
  return (
    <div className="page">
      <img src={store.banner} alt={store.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
      <div style={{ padding: '16px', background: '#fff', borderRadius: '16px 16px 0 0', marginTop: -24, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={store.logo} alt="" style={{ width: 48, height: 48, borderRadius: '50%', background: '#f3f4f6' }} />
          <div>
            <div style={{ fontWeight: 700 }}>{store.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}><MapPin size={10} /> {store.address}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 13 }}>
          <span><Star size={12} fill="#F59E0B" /> {store.rating}</span>
          <span><MapPin size={12} /> {store.address.split(',')[0]}</span>
          <span><Clock size={12} /> {store.deliveryTime}</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px', background: '#fff', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
        <Search size={16} color="#6B7280" />
        <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }} />
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategoryFilter(c)} className={`chip ${categoryFilter === c ? 'active' : ''}`}>{c}</button>
        ))}
      </div>

      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtered.map(p => <ProductCard key={p.id} product={{ ...p, storeName: store.name }} />)}
      </div>

      <div style={{ position: 'fixed', bottom: 64, left: 0, right: 0, background: '#fff', padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Total Items</div>
          <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{totalItems} items</div>
        </div>
        <button style={{ padding: '12px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700 }}>View Cart</button>
      </div>
    </div>
  );
};

export default StorePage;