import React from 'react';
import { User, MapPin, Globe, HelpCircle, FileText, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MenuPage = () => {
  const { logout } = useAuth();
  const items = [
    { icon: User, label: 'My Profile' },
    { icon: MapPin, label: 'Addresses' },
    { icon: Globe, label: 'Language' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: FileText, label: 'About Us' },
    { icon: ShieldCheck, label: 'Terms & Conditions' },
    { icon: ShieldCheck, label: 'Privacy Policy' },
  ];
  return (
    <div className="page">
      <div className="page-header"><h2>Menu</h2></div>
      <div style={{ background: '#fff', padding: 16, borderRadius: 'var(--radius)', margin: '0 16px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><User size={28} /></div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Guest User</div>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>+880 123456789</div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        {items.map(it => (
          <button key={it.label} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '14px 16px', background: '#fff', borderBottom: '1px solid var(--border)', fontSize: 14, fontWeight: 500, textAlign: 'left' }}>
            <it.icon size={20} color="var(--primary)" /> {it.label}
          </button>
        ))}
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '14px 16px', background: '#fff', fontSize: 14, fontWeight: 500, color: 'var(--danger)', textAlign: 'left' }}>
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default MenuPage;