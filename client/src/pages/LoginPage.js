import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, Check, Facebook, Google } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, guestLogin, socialLogin } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ phone, password });
  };

  return (
    <div className="auth-page">
      <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 24 }}>Yalla Shop</div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div className="field">
          <label>Phone Number</label>
          <div className="field-row">
            <select style={{ width: 80 }}>+880</select>
            <input placeholder="Enter your phone" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <div className="pwd-wrap" style={{ position: 'relative' }}>
            <input type={showPwd ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <label className="checkbox-row" style={{ margin: 0 }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
          </label>
          <Link to="#" style={{ color: 'var(--primary)', fontSize: 13 }}>Forgot Password?</Link>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 12 }}>By signing in you agree to Terms & Conditions</p>
        <button type="submit" className="btn-green">Sign In</button>
      </form>
      <div className="social">
        <button onClick={() => socialLogin('google')}><Google size={20} /></button>
        <button onClick={() => socialLogin('facebook')}><Facebook size={20} /></button>
      </div>
      <div className="link-row">Don't have account? <Link to="/register">Sign Up</Link></div>
      <div className="guest" onClick={() => guestLogin()} style={{ cursor: 'pointer' }}>Continue as Guest</div>
    </div>
  );
};

export default LoginPage;