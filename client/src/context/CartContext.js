import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, removeCartItem, updateCartItem, clearCart } from '../api';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);

  // Load cart from API on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCart();
        if (data.success && data.cart) {
          const cartItems = (data.cart.items || []).map(i => ({
            id: i.product?._id || i.product,
            name: i.product?.name || i.name,
            image: i.product?.images?.[0] || i.image,
            price: i.product?.price?.current || i.price || 0,
            originalPrice: i.product?.price?.original || (i.product?.price?.current ? i.product.price.current * 1.2 : 0),
            qty: i.quantity,
            unit: i.product?.unit || i.unit || 'pcs',
            rating: i.product?.rating?.average || i.rating || 4.5,
          }));
          setItems(cartItems);
        }
      } catch (_) { /* ignore */ }
    };
    load();
  }, []);

  const addItem = useCallback(async (product) => {
    try {
      await addToCart(product.id || product._id, 1);
      setItems(prev => {
        const existing = prev.find(i => i.id === (product.id || product._id));
        if (existing) {
          return prev.map(i => i.id === (product.id || product._id) ? { ...i, qty: i.qty + 1 } : i);
        }
        return [...prev, {
          id: product.id || product._id,
          name: product.name,
          image: product.image || product.images?.[0],
          price: product.price?.current || product.price || 0,
          originalPrice: product.price?.original || (product.price?.current ? product.price.current * 1.2 : 0),
          qty: 1,
          unit: product.unit || 'pcs',
          rating: product.rating?.average || product.rating || 4.5,
        }];
      });
      setToastMsg(`${product.name} added to cart`);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (_) {}
  }, []);

  const removeItem = useCallback(async (productId) => {
    try { await removeCartItem(productId); } catch (_) {}
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const updateQty = useCallback(async (productId, qty) => {
    if (qty <= 0) return removeItem(productId);
    try { await updateCartItem(productId, qty); } catch (_) {}
    setItems(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
  }, [removeItem]);

  const clearCartFn = useCallback(async () => {
    try { await clearCart(); } catch (_) {}
    setItems([]);
  }, []);

  const totalCount = items.reduce((sum, i) => sum + (i.qty || 0), 0);
  const totalAmount = items.reduce((sum, i) => sum + ((i.price || 0) * (i.qty || 0)), 0);
  const originalTotal = items.reduce((sum, i) => sum + (((i.originalPrice || i.price || 0)) * (i.qty || 0)), 0);
  const discount = Math.max(0, originalTotal - totalAmount);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart: clearCartFn, totalCount, totalAmount, originalTotal, discount, toastMsg, setToastMsg }}>
      {children}
    </CartContext.Provider>
  );
};
