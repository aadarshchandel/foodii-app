// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">🍴 Foodii</Link>
      </div>
      
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search 200+ Indian foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="cart-info" onClick={() => {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) cartIcon.click();
      }}>
        🛒 <span className="cart-count-nav">{cart.length}</span>
      </div>

      {isAuthenticated && user ? (
        <div className="profile-dropdown">
          <div className="profile-trigger" onClick={() => setProfileDropdown(!profileDropdown)}>
            <img src={user.avatar} alt={user.name} className="profile-avatar-small" />
            <span className="profile-name">{user.name.split(' ')[0]}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          {profileDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <img src={user.avatar} alt={user.name} />
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <Link to="/profile" onClick={() => setProfileDropdown(false)}>👤 My Profile</Link>
              <Link to="/orders" onClick={() => setProfileDropdown(false)}>📦 My Orders</Link>
              <Link to="/favorites" onClick={() => setProfileDropdown(false)}>❤️ Favorites</Link>
              <Link to="/addresses" onClick={() => setProfileDropdown(false)}>📍 Addresses</Link>
              <hr />
              <button onClick={handleLogout}>🚪 Logout</button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/auth-guard" className="login-btn">Login</Link>
      )}

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
    </header>
  );
};

export default Navbar;