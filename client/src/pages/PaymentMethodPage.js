import React from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentMethodPage = () => (
  <div className="page" style={{ padding: 16 }}>
    <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Link to="/checkout"><ChevronLeft size={24} /></Link>
      <h2>Payment Method</h2>
    </div>
    <h3 style={{ fontWeight: 700, marginBottom: 4, paddingLeft: 4 }}>Choose Payment Method</h3>
    <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: 12, boxShadow: 'var(--shadow)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, cursor: 'pointer' }}>
        <input type="radio" name="payment" defaultChecked />
        <span style={{ flex: 1 }}><strong>Cash on Delivery</strong></span>
        <Check size={18} color="var(--primary)" />
      </label>
      <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: 4 }} />
      <div style={{ fontSize: 13, color: 'var(--text-light)', margin: '4px 8px 8px' }}>Pay Via Online</div>
      {[
        { name: 'Paypal', img: 'https://via.placeholder.com/60x24?text=PayPal' },
        { name: 'Stripe', img: 'https://via.placeholder.com/60x24?text=Stripe' },
        { name: 'Razorpay', img: 'https://via.placeholder.com/60x24?text=Razorpay' },
      ].map(p => (
        <label key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, cursor: 'pointer' }}>
          <input type="radio" name="payment" />
          <span>{p.name}</span>
          <img src={p.img} alt={p.name} style={{ height: 20, marginLeft: 'auto' }} />
        </label>
      ))}
    </div>
    <Link to="/checkout" style={{ position: 'fixed', bottom: 80, left: 0, right: 0, padding: '0 16px' }}>
      <button style={{ width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700 }}>Select</button>
    </Link>
  </div>
);

export default PaymentMethodPage;