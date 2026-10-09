import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return alert('Passwords do not match');
    register({ name, email, phone, password });
  };

  return (
    <div className="auth-page">
      <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 24 }}>Yalla Shop</div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div className="field">
          <label>Full Name</label>
          <input placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Phone</label>
          <div className="field-row">
            <select style={{ width: 80 }}>+880</select>
            <input placeholder="Enter phone" value={phone} onChange={e => setPhone(e.target.value)} required />
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
        <div className="field">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        </div>
        <label className="checkbox-row">
          <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} required /> I agree to Terms & Conditions
        </label>
        <button type="submit" className="btn-green">Sign Up</button>
      </form>
      <div className="link-row">Already have account? <Link to="/login">Sign In</Link></div>
    </div>
  );
};

export default RegisterPage;