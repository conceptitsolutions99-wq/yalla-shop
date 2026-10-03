import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MOCK_PRODUCT = {
  id: 1, name: 'Organic Green Tea', price: 12.99, originalPrice: 15.99, stock: 24, image: 'https://via.placeholder.com/400x400?text=Tea', rating: 4.5, unit: 'Kg', storeName: 'Yalla Grocery', description: 'Premium organic green tea leaves, sourced from sustainable farms. Rich in antioxidants and promotes wellness.',
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const p = MOCK_PRODUCT;
  const total = p.price * qty;
  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/"><ChevronLeft size={24} /></Link>
        <h2>Item Details</h2>
        <ShoppingCart size={22} style={{ marginLeft: 'auto' }} />
      </div>
      <div style={{ position: 'relative', padding: '0 16px' }}>
        <img src={p.image} alt={p.name} style={{ width: '100%', borderRadius: 'var(--radius)' }} />
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? 'var(--primary)' : 'var(--border)' }} />)}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>{p.name}</h2>
        <Link to={`/store/101`} style={{ fontSize: 13, color: 'var(--primary)' }}>{p.storeName}</Link>
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>${p.price.toFixed(2)}</span>
          <span style={{ marginLeft: 8, fontSize: 14, color: 'var(--text-light)', textDecoration: 'line-through' }}>${p.originalPrice.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <span className="unit-badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{p.unit}</span>
          <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>In Stock</span>
          <span style={{ fontSize: 12, color: 'var(--warning)' }}><Star size={11} fill="#F59E0B" /> {p.rating}</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', fontSize: 18 }}>-</button>
          <span style={{ fontWeight: 600 }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', fontSize: 18 }}>+</button>
        </div>
        <div style={{ marginTop: 12, fontWeight: 700, color: 'var(--primary)' }}>Total: ${total.toFixed(2)}</div>
        <p style={{ marginTop: 12, fontSize: 14, color: 'var(--text-light)' }}>{p.description}</p>
        <button onClick={() => addItem(p)} style={{ marginTop: 16, width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700, fontSize: 16 }}>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;