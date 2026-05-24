// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert('Login Successful!');
      navigate('/');
    } else {
      alert('Please enter credentials');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome to Foodie</h2>
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
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '12px' }}>Demo: any email/password</p>
      </div>
    </div>
  );
};

export default AuthForm;