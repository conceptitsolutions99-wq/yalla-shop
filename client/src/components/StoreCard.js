import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

const StoreCard = ({ store }) => (
  <div className="card store-card" style={{ minWidth: 200, marginRight: 12 }}>
    <img className="banner" src={store.banner || store.logo} alt={store.name} />
    <div className="body">
      <div className="name">{store.name}</div>
      <div className="addr"><MapPin size={10} /> {store.address}</div>
      <div className="stars">
        <Star size={11} fill="#F59E0B" /> {store.rating}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-light)' }}>
        <Clock size={10} /> {store.deliveryTime || '30 min'}
      </div>
    </div>
  </div>
);

export default StoreCard;