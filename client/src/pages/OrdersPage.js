import React from 'react';
import { Package, Clock, MapPin, DollarSign } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 1001, status: 'Delivered', items: ['Organic Green Tea', 'Bread'], total: 28.99, date: '2026-09-28' },
  { id: 1002, status: 'Cancelled', items: ['Banana Bunch'], total: 7.00, date: '2026-09-25' },
  { id: 1003, status: 'Out for Delivery', items: ['Milk 1L', 'Eggs 12ct'], total: 15.49, date: '2026-09-30' },
];

const statusColors = { Delivered: '#10B981', Cancelled: '#EF4444', 'Out for Delivery': '#039D55' };

const OrdersPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>My Orders</h2>
    </div>
    {MOCK_ORDERS.map(order => (
      <div key={order.id} style={{ background: '#fff', margin: '8px 16px', borderRadius: 'var(--radius)', padding: 16, boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-light)' }}>Order #{order.id}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: statusColors[order.status] }}>{order.status}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-light)' }}>
          {order.items.map(i => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Package size={12} /> {i}</div>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
          <span style={{ color: 'var(--text-light)' }}><DollarSign size={12} /> {order.total.toFixed(2)}</span>
          <span style={{ color: 'var(--text-light)' }}><Clock size={12} /> {order.date}</span>
        </div>
      </div>
    ))}
  </div>
);

export default OrdersPage;