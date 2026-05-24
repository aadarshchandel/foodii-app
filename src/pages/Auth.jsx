// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(isLogin ? 'Login Successful!' : 'Account Created!');
      if (rememberMe) {
        localStorage.setItem('userEmail', email);
      }
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🍴 Foodii</div>
        <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <p>{isLogin ? 'Login to continue and explore amazing food.' : 'Sign up to start ordering delicious food.'}</p>
        
        <form onSubmit={handleSubmit}>
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
          
          {isLogin && (
            <div className="auth-options">
              <label>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
          )}
          
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
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

export default Auth;