import React from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StorePage from './pages/StorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import FavoritesPage from './pages/FavoritesPage';
import OrdersPage from './pages/OrdersPage';
import ParcelPage from './pages/ParcelPage';
import MenuPage from './pages/MenuPage';

const MainLayout = () => {
  const { toastMsg, setToastMsg } = useCart();
  const location = useLocation();
  const showNav = !['/login', '/register'].includes(location.pathname);
  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/store/:id" element={<StorePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-method" element={<PaymentMethodPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/parcel" element={<ParcelPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
      {showNav && <BottomNav />}
      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
