import React, { useState } from 'react';
import { ChevronLeft, Truck, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { totalAmount } = useCart();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState('Home');
  const [tip, setTip] = useState(0);
  const [savelater, setSaveLater] = useState(false);
  const [note, setNote] = useState('');

  const deliveryFee = deliveryType === 'Home' ? 2.99 : 0;
  const subtotal = totalAmount + deliveryFee + tip;

  const handleConfirm = () => {
    navigate('/order-success');
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ChevronLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        <h2>Checkout</h2>
      </div>

      <div className="checkout-section">
        <h3>Delivery Type</h3>
        <div className="toggle-row">
          <button className={`toggle-btn ${deliveryType === 'Home' ? 'active' : ''}`} onClick={() => setDeliveryType('Home')}><Truck size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Home Delivery</button>
          <button className={`toggle-btn ${deliveryType === 'Pickup' ? 'active' : ''}`} onClick={() => setDeliveryType('Pickup')}><Utensils size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Take Away</button>
        </div>
      </div>

      <div className="checkout-section">
        <h3>Delivery Information</h3>
        <div className="field" style={{ marginBottom: 10 }}>
          <input placeholder="Address" />
        </div>
        <div className="field" style={{ marginBottom: 10 }}>
          <select>
            <option>Home</option>
            <option>Office</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field-row" style={{ marginBottom: 10 }}>
          <input placeholder="Full Name" />
          <input placeholder="Phone" />
        </div>
        <div className="field" style={{ marginBottom: 10 }}>
          <input placeholder="Floor / Apartment" />
        </div>
        <div className="field">
          <input placeholder="Email" type="email" />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={savelater} onChange={e => setSaveLater(e.target.checked)} /> Save for later
        </label>
      </div>

      <div className="checkout-section">
        <h3>Delivery Man Tips</h3>
        <div className="chips">
          {[0, 15, 10, 20, 40].map(t => (
            <button key={t} className={`chip ${tip === t ? 'active' : ''}`} onClick={() => setTip(t)}>
              {t === 0 ? 'Not now' : `$${t}`}
            </button>
          ))}
        </div>
      </div>

      <div className="checkout-section">
        <h3>Payment Method <span style={{ float: 'right', color: 'var(--primary)', cursor: 'pointer', fontSize: 13 }} onClick={() => navigate('/payment-method')}>Edit</span></h3>
        <div style={{ padding: 12, background: 'var(--primary-light)', borderRadius: 8, fontWeight: 600 }}>Cash on Delivery - ${subtotal.toFixed(2)}</div>
      </div>

      <div className="checkout-section">
        <h3>Additional Note</h3>
        <textarea placeholder="Any special instructions..." value={note} onChange={e => setNote(e.target.value)} style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: 10, minHeight: 60, resize: 'vertical' }} />
      </div>

      <div style={{ background: '#fff', margin: '16px', padding: 16, borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
        <div className="summary-row total"><span>Total Amount</span><span style={{ color: 'var(--primary)' }}>${subtotal.toFixed(2)}</span></div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: 16, borderTop: '1px solid var(--border)' }}>
        <button onClick={handleConfirm} style={{ width: '100%', padding: 14, background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700, fontSize: 16 }}>Confirm Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;