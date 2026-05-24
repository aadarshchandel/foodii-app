// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { sendWelcomeNotifications, sendLoginNotificationEmail } from '../services/notificationService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('foodieUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('foodieUser') !== null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('foodieUser', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('foodieUser');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = async (email, password, name) => {
    const newUser = {
      id: Date.now(),
      email,
      name: name || email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=ff5722&color=fff`,
      joinDate: new Date().toISOString(),
      orders: [],
      addresses: [],
      phone: ''
    };
    setUser(newUser);
    
    // Send login notification email
    await sendLoginNotificationEmail(newUser.email, newUser.name, new Date().toLocaleString());
    
    // Show notification to user
    alert(`📧 Welcome back ${newUser.name}! Login notification sent to ${newUser.email}`);
    
    return true;
  };

  const signup = async (name, email, password, phone) => {
    const newUser = {
      id: Date.now(),
      email,
      name,
      phone,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff5722&color=fff`,
      joinDate: new Date().toISOString(),
      orders: [],
      addresses: [],
      favoriteFoods: []
    };
    setUser(newUser);
    
    // Send welcome notifications (Email + SMS)
    const notifications = await sendWelcomeNotifications(newUser);
    
    // Show notification to user
    let message = `🎉 Welcome to Foodii, ${name}! `;
    notifications.forEach(notif => {
      if (notif.success) {
        message += `\n✅ ${notif.type.toUpperCase()}: ${notif.message}`;
      }
    });
    alert(message);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('foodieUser');
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const addOrder = (order) => {
    setUser(prev => ({
      ...prev,
      orders: [order, ...(prev.orders || [])]
    }));
  };

  const addAddress = (address) => {
    setUser(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), { ...address, id: Date.now() }]
    }));
  };

  const removeAddress = (addressId) => {
    setUser(prev => ({
      ...prev,
      addresses: (prev.addresses || []).filter(addr => addr.id !== addressId)
    }));
  };

  const toggleFavorite = (foodId) => {
    setUser(prev => {
      const favorites = prev.favoriteFoods || [];
      if (favorites.includes(foodId)) {
        return { ...prev, favoriteFoods: favorites.filter(id => id !== foodId) };
      } else {
        return { ...prev, favoriteFoods: [...favorites, foodId] };
      }
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile,
      addOrder,
      addAddress,
      removeAddress,
      toggleFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};