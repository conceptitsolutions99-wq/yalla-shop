import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('yalla_shop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  if (data.token) localStorage.setItem('yalla_shop_token', data.token);
  return data;
}

export async function register(userData) {
  const { data } = await api.post('/auth/register', userData);
  if (data.token) localStorage.setItem('yalla_shop_token', data.token);
  return data;
}

export async function socialLogin(provider) {
  const { data } = await api.post('/auth/social-login', { provider });
  if (data.token) localStorage.setItem('yalla_shop_token', data.token);
  return data;
}

export async function guestLogin() {
  const { data } = await api.post('/auth/guest-login');
  if (data.token) localStorage.setItem('yalla_shop_token', data.token);
  return data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function logout() {
  localStorage.removeItem('yalla_shop_token');
  return { success: true };
}

// Products
export async function getProducts(params) {
  const { data } = await api.get('/products', { params });
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

// Stores
export async function getStores(params) {
  const { data } = await api.get('/stores', { params });
  return data;
}

export async function getStore(id) {
  const { data } = await api.get(`/stores/${id}`);
  return data;
}

// Categories
export async function getCategories() {
  const { data } = await api.get('/categories');
  return data;
}

// Cart
export async function getCart() {
  const { data } = await api.get('/cart');
  return data;
}

export async function addToCart(productId, quantity = 1) {
  const { data } = await api.post('/cart/add', { productId, quantity });
  return data;
}

export async function updateCartItem(productId, quantity) {
  const { data } = await api.put(`/cart/update/${productId}`, { quantity });
  return data;
}

export async function removeCartItem(productId) {
  const { data } = await api.delete(`/cart/remove/${productId}`);
  return data;
}

export async function clearCart() {
  const { data } = await api.delete('/cart/clear');
  return data;
}

// Orders
export async function getOrders(params) {
  const { data } = await api.get('/orders', { params });
  return data;
}

export async function createOrder(orderData) {
  const { data } = await api.post('/orders', orderData);
  return data;
}

// Addresses
export async function getAddresses() {
  const { data } = await api.get('/addresses');
  return data;
}

export async function addAddress(addressData) {
  const { data } = await api.post('/addresses', addressData);
  return data;
}

export async function updateAddress(id, addressData) {
  const { data } = await api.put(`/addresses/${id}`, addressData);
  return data;
}

export async function deleteAddress(id) {
  const { data } = await api.delete(`/addresses/${id}`);
  return data;
}

export async function setDefaultAddress(id) {
  const { data } = await api.put(`/addresses/${id}/default`);
  return data;
}

// Favorites
export async function addFavorite(productId) {
  const { data } = await api.post(`/users/favorites/${productId}`);
  return data;
}

export async function removeFavorite(productId) {
  const { data } = await api.delete(`/users/favorites/${productId}`);
  return data;
}

export async function getFavorites() {
  const { data } = await api.get('/users/favorites');
  return data;
}

// Parcel
export async function getParcelCategories() {
  const { data } = await api.get('/parcel/categories');
  return data;
}

export async function createParcelRequest(data) {
  const { data: result } = await api.post('/parcel/request', data);
  return result;
}

// Health
export async function getHealth() {
  const { data } = await api.get('/health');
  return data;
}

export default api;
