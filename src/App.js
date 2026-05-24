// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Navbar from './components/Navbar';
import CartPopup from './components/CartPopup';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import AuthGuard from './pages/AuthGuard';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import './App.css';

// Wrapper component to use hooks
const AppWrapper = () => {
  const [cartOpen, setCartOpen] = useState(false);
  
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/auth-guard" element={<AuthGuard />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        
        {/* Redirect old admin path to login */}
        <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div className="cart-icon" onClick={() => setCartOpen(true)}>
        🛒
        <span className="cart-count" id="cartCount">0</span>
      </div>
      <CartPopup isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminAuthProvider>
          <CartProvider>
            <AppWrapper />
          </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;