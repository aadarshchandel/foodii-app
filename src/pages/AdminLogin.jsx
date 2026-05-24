// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (adminLogin(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-logo">🍴 Foodii Admin</div>
          <p>Enter your credentials to access admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@foodii.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-login-btn">
            Login to Admin Panel
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Demo Credentials:</p>
          <p>Email: admin@foodii.com</p>
          <p>Password: Admin@123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;