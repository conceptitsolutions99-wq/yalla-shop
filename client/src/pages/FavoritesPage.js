import React from 'react';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FavoritesPage = () => {
  const { items, addItem } = useCart();
  const favorites = items.filter(i => true); // in real app, filter by isFavorite
  return (
    <div className="page">
      <div className="page-header">
        <h2>Favourite</h2>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
        <span style={{ padding: '8px 16px', borderBottom: '2px solid var(--primary)', fontWeight: 600, color: 'var(--primary)', fontSize: 14 }}>Item</span>
        <span style={{ padding: '8px 16px', fontSize: 14, color: 'var(--text-light)' }}>Stores</span>
      </div>
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-light)' }}>
          <Heart size={48} color="#D1D5DB" />
          <p style={{ marginTop: 12 }}>No favorites yet</p>
        </div>
      ) : (
        favorites.map(p => (
          <div key={p.id} style={{ display: 'flex', gap: 12, padding: 16, background: '#fff', margin: '8px 16px', borderRadius: 'var(--radius)' }}>
            <img src={p.image} alt="" style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{p.storeName}</div>
              <div style={{ fontSize: 12, color: 'var(--warning)' }}>★ {p.rating}</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>${p.price.toFixed(2)}</span>
                {p.originalPrice && <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-light)', textDecoration: 'line-through' }}>${p.originalPrice.toFixed(2)}</span>}
              </div>
            </div>
            <button onClick={() => addItem(p)} style={{ alignSelf: 'center', color: 'var(--danger)' }}><Heart size={22} fill="#EF4444" /></button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;