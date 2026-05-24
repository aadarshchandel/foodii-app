// src/pages/AuthGuard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const AuthGuard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      // Check if there's a redirect after login
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      const pendingCart = sessionStorage.getItem('pendingCart');
      
      if (pendingCart) {
        // Restore cart items
        const cartItems = JSON.parse(pendingCart);
        cartItems.forEach(item => addToCart(item));
        sessionStorage.removeItem('pendingCart');
      }
      
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, addToCart]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password, email.split('@')[0]);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password && phone) {
      signup(name, email, password, phone);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleSkip = () => {
    sessionStorage.removeItem('redirectAfterLogin');
    sessionStorage.removeItem('pendingCart');
    navigate('/');
  };

  return (
    <div className="auth-guard-page">
      <div className="auth-guard-container">
        <button className="skip-btn" onClick={handleSkip}>Skip →</button>
        
        <div className="auth-logo-large">🍴 Foodii</div>
        <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <p>{isLogin ? 'Login to continue and explore amazing food.' : 'Sign up to start ordering delicious food.'}</p>
        
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          )}
          
          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-divider">or</div>
        
        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthGuard;