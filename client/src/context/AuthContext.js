import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, guestLogin as apiGuest, socialLogin as apiSocial, logout as apiLogout, getMe } from '../api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('yalla_shop_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem('yalla_shop_token');
      if (stored) {
        try {
          const { success, user: u } = await getMe();
          if (success) setUser(u);
        } catch (_) { /* ignore */ }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = useCallback(async (credentials) => {
    const { success, token: t, user: u } = await apiLogin(credentials);
    if (t) {
      localStorage.setItem('yalla_shop_token', t);
      setToken(t);
      setUser(u);
    }
    return { success, user: u };
  }, []);

  const register = useCallback(async (userData) => {
    const { success, token: t, user: u } = await apiRegister(userData);
    if (t) {
      localStorage.setItem('yalla_shop_token', t);
      setToken(t);
      setUser(u);
    }
    return { success, user: u };
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    localStorage.removeItem('yalla_shop_token');
    setToken(null);
    setUser(null);
    return { success: true };
  }, []);

  const guestLogin = useCallback(async () => {
    const { success, token: t, user: u } = await apiGuest();
    if (t) {
      localStorage.setItem('yalla_shop_token', t);
      setToken(t);
      setUser(u);
    }
    return { success, user: u };
  }, []);

  const socialLogin = useCallback(async (provider) => {
    const { success, token: t, user: u } = await apiSocial(provider);
    if (t) {
      localStorage.setItem('yalla_shop_token', t);
      setToken(t);
      setUser(u);
    }
    return { success, user: u };
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, guestLogin, socialLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
