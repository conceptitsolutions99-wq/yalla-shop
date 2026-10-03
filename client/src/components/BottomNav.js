import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, ShoppingCart, Package, List } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const { totalCount } = useCart();
  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/favorites', icon: Heart, label: 'Favourite' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalCount },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/menu', icon: List, label: 'Menu' },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map(({ path, icon: Icon, label, badge }) => (
        <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''} style={{ position: 'relative' }}>
          <Icon size={22} strokeWidth={isActive => isActive ? 2.5 : 1.5} />
          <span>{label}</span>
          {badge > 0 && <span className="badge">{badge}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;