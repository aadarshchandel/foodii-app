// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { initialFoods } from '../data/foodData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem('adminFoods');
    return saved ? JSON.parse(saved) : initialFoods;
  });
  const [newFood, setNewFood] = useState({ name: '', price: '', rating: '', category: '' });
  const [orders] = useState([
    { id: '#1001', customer: 'Rahul Sharma', items: 2, amount: 448, status: 'Delivered', date: '12 May 2024' },
    { id: '#1002', customer: 'Priya Singh', items: 3, amount: 747, status: 'Processing', date: '12 May 2024' },
    { id: '#1003', customer: 'Aman Verma', items: 1, amount: 199, status: 'Delivered', date: '11 May 2024' },
    { id: '#1004', customer: 'Neha Patel', items: 2, amount: 548, status: 'Cancelled', date: '11 May 2024' },
  ]);

  useEffect(() => {
    localStorage.setItem('adminFoods', JSON.stringify(foods));
  }, [foods]);

  const stats = {
    totalFoods: foods.length,
    totalOrders: 120,
    totalUsers: 85,
    revenue: 24560
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    if (newFood.name && newFood.price) {
      const foodItem = {
        id: Date.now(),
        name: newFood.name,
        price: Number(newFood.price),
        rating: '⭐'.repeat(Number(newFood.rating) || 4),
        img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
        category: newFood.category
      };
      setFoods([...foods, foodItem]);
      setNewFood({ name: '', price: '', rating: '', category: '' });
      alert('Food item added successfully!');
    }
  };

  const handleDeleteFood = (id) => {
    setFoods(foods.filter(food => food.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>🍴 Foodii Admin</h2>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>
            ➕ Add Food
          </button>
          <button className={activeTab === 'manage' ? 'active' : ''} onClick={() => setActiveTab('manage')}>
            📋 Manage Foods
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            📦 Orders
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Users
          </button>
          <button className={activeTab === 'logout' ? 'active' : ''} onClick={() => window.location.href = '/'}>
            🚪 Logout
          </button>
        </nav>
      </div>

      <div className="admin-main">
        {activeTab === 'dashboard' && (
          <>
            <h1>Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Foods</h3>
                <p>{stats.totalFoods}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{stats.totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Revenue</h3>
                <p>₹{stats.revenue.toLocaleString()}</p>
              </div>
            </div>

            <h2 style={{ marginTop: '30px' }}>Recent Orders</h2>
            <table className="orders-table">
              <thead>
                <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td><td>{order.customer}</td><td>{order.items}</td>
                    <td>₹{order.amount}</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'add' && (
          <div className="add-food-form">
            <h1>Add New Food Item</h1>
            <form onSubmit={handleAddFood}>
              <input type="text" placeholder="Food Name" value={newFood.name} onChange={(e) => setNewFood({...newFood, name: e.target.value})} required />
              <input type="number" placeholder="Price ₹" value={newFood.price} onChange={(e) => setNewFood({...newFood, price: e.target.value})} required />
              <input type="number" placeholder="Rating (1-5)" step="1" min="1" max="5" value={newFood.rating} onChange={(e) => setNewFood({...newFood, rating: e.target.value})} />
              <input type="text" placeholder="Category" value={newFood.category} onChange={(e) => setNewFood({...newFood, category: e.target.value})} />
              <button type="submit">Add Food Item</button>
            </form>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="manage-foods">
            <h1>Manage Foods</h1>
            <div className="foods-list">
              {foods.map(food => (
                <div key={food.id} className="food-item">
                  <img src={food.img} alt={food.name} />
                  <div className="food-info">
                    <h4>{food.name}</h4>
                    <p>₹{food.price}</p>
                  </div>
                  <button onClick={() => handleDeleteFood(food.id)} className="delete-food-btn">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h1>All Orders</h1>
            <table className="orders-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td><td>{order.customer}</td><td>{order.items}</td>
                    <td>₹{order.amount}</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h1>Users Management</h1>
            <p>User management features coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;