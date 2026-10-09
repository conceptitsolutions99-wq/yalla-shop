import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const showTop = !['/login', '/register'].includes(location.pathname);
  if (!showTop) return null;
  return (
    <header className="top-bar">
      <div className="location">
        <MapPin size={16} />
        <span>Dhaka, Bangladesh</span>
      </div>
      <Bell size={18} />
      <span className="brand">Yalla Shop</span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
        <button onClick={logout} style={{ color: '#fff', fontSize: 13 }}>Logout</button>
      </div>
    </header>
  );
};

const SearchBar = () => (
  <div className="search-bar">
    <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <Search size={16} color="#6B7280" />
      <input placeholder="Search products..." style={{ border: 'none', outline: 'none', flex: 1, marginLeft: 8, background: 'transparent' }} />
    </div>
  </div>
);

export { Navbar, SearchBar };
export default Navbar;