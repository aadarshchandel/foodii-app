// src/contexts/AdminAuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('adminToken') === 'admin_authenticated';
  });

  const [adminUser, setAdminUser] = useState(() => {
    const savedAdmin = localStorage.getItem('adminData');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const adminLogin = (email, password) => {
    // Admin credentials (you can change these)
    if (email === 'admin@foodii.com' && password === 'Admin@123') {
      const adminData = {
        id: 'admin_001',
        name: 'Foodii Admin',
        email: 'admin@foodii.com',
        role: 'super_admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=ff5722&color=fff'
      };
      localStorage.setItem('adminToken', 'admin_authenticated');
      localStorage.setItem('adminData', JSON.stringify(adminData));
      setIsAdminAuthenticated(true);
      setAdminUser(adminData);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAdminAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminAuthenticated,
      adminUser,
      adminLogin,
      adminLogout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};