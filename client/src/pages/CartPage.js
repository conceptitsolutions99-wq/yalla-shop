import React from 'react';
import { ChevronLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeItem, updateQty, totalAmount, totalCount, discount, originalTotal } = useCart();
  if (items.length === 0) {
    return (
      <div className="page" style={{ padding: 32, textAlign: 'center' }}>
        <ShoppingCart size={48} color="#D1D5DB" />
        <p style={{ color: 'var(--text-light)', margin: '12px 0' }}>Your cart is empty</p>
        <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Browse Products</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/"><ChevronLeft size={24} /></Link>
        <h2>My Cart ({totalCount})</h2>
      </div>
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: 12, padding: 16, background: '#fff', margin: '8px 16px', borderRadius: 'var(--radius)' }}>
          <img src={item.image} alt={item.name} style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-light)' }}><span className="unit-badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 6px', borderRadius: 4 }}>{item.unit}</span></div>
            <div style={{ fontSize: 12, color: 'var(--warning)' }}><Star size={10} fill="#F59E0B" /> {item.rating}</div>
            <div style={{ marginTop: 4 }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>${item.price.toFixed(2)}</span>
              {item.originalPrice && <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-light)', textDecoration: 'line-through' }}>${item.originalPrice.toFixed(2)}</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border)' }}><Minus size={14} /></button>
              <span style={{ fontWeight: 600 }}>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border)' }}><Plus size={14} /></button>
              <button onClick={() => removeItem(item.id)} style={{ marginLeft: 'auto', color: 'var(--danger)', fontSize: 12 }}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      <Link to="/" style={{ display: 'block', padding: '0 16px', color: 'var(--primary)', fontWeight: 600, fontSize: 14 }}>+ Add More Items</Link>

      <div style={{ background: '#fff', margin: '16px', padding: 16, borderRadius: 'var(--radius)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Order Summary</h3>
        <details style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 8 }}>
          <summary style={{ cursor: 'pointer' }}>If any product is not available</summary>
          <p style={{ marginTop: 4 }}>Please contact support</p>
        </details>
        <div className="summary-row"><span>Item Price</span><span>${originalTotal.toFixed(2)}</span></div>
        <div className="summary-row"><span>Discount</span><span style={{ color: 'var(--primary)' }}>-${discount.toFixed(2)}</span></div>
        <div className="progress-bar"><div className="fill" style={{ width: `${Math.min(100, (totalAmount / 50) * 100)}%` }} /></div>
        <div style={{ fontSize: 12, color: 'var(--text-light)' }}>$ {Math.max(0, 50 - totalAmount).toFixed(2)} more for free delivery</div>
        <div className="summary-row total"><span>Subtotal</span><span>${totalAmount.toFixed(2)}</span></div>
      </div>

      <div style={{ position: 'fixed', bottom: 64, left: 0, right: 0, background: '#fff', padding: 16, borderTop: '1px solid var(--border)' }}>
        <Link to="/checkout">
          <button style={{ width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700, fontSize: 16 }}>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

const Star = ({ size, fill, color }) => <span style={{ color: fill ? '#F59E0B' : color, fontSize: size }}>★</span>;

export default CartPage;