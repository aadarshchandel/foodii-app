// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(`cartData_${user?.id || 'guest'}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const storageKey = `cartData_${user?.id || 'guest'}`;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (food) => {
    setCart(prev => [...prev, food]);
    // Show animation feedback
    const btn = document.activeElement;
    if (btn) {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    }
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal,
      getCartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};