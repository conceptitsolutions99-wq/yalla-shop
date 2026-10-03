import React from 'react';
import { CheckCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => (
  <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fff', textAlign: 'center', padding: 32 }}>
    <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
      <CheckCircle size={64} color="var(--primary)" />
    </div>
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>You Place The Order Successfully</h2>
    <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 16 }}>Order ID: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>100103</span></p>
    <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 24 }}>Thank you for your order. Your item will be delivered soon.</p>
    <Link to="/">
      <button style={{ padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 24, fontWeight: 700 }}>Back to Home</button>
    </Link>
  </div>
);

export default OrderSuccessPage;