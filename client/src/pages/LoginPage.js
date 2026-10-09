import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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
        <button onClick={() => socialLogin('google')}><svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></button>
        <button onClick={() => socialLogin('facebook')}><svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
      </div>
      <div className="link-row">Don't have account? <Link to="/register">Sign Up</Link></div>
      <div className="guest" onClick={() => guestLogin()} style={{ cursor: 'pointer' }}>Continue as Guest</div>
    </div>
  );
};

export default LoginPage;