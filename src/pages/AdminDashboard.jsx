// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { initialFoods } from '../data/foodData';

const AdminDashboard = () => {
  const { adminUser, adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem('adminFoods');
    return saved ? JSON.parse(saved) : initialFoods;
  });
  const [newFood, setNewFood] = useState({ 
    name: '', 
    price: '', 
    rating: '⭐⭐⭐⭐', 
    category: '', 
    img: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' 
  });
  const [editingFood, setEditingFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    return savedOrders ? JSON.parse(savedOrders) : [
      { id: '#1001', customer: 'Rahul Sharma', items: 2, amount: 448, status: 'Delivered', date: '2024-05-20', payment: 'Online' },
      { id: '#1002', customer: 'Priya Singh', items: 3, amount: 747, status: 'Processing', date: '2024-05-20', payment: 'COD' },
      { id: '#1003', customer: 'Aman Verma', items: 1, amount: 199, status: 'Delivered', date: '2024-05-19', payment: 'Online' },
      { id: '#1004', customer: 'Neha Patel', items: 2, amount: 548, status: 'Cancelled', date: '2024-05-19', payment: 'Online' },
      { id: '#1005', customer: 'Rajesh Kumar', items: 4, amount: 890, status: 'Processing', date: '2024-05-20', payment: 'COD' },
      { id: '#1006', customer: 'Sneha Reddy', items: 2, amount: 430, status: 'Delivered', date: '2024-05-18', payment: 'Online' },
    ];
  });
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('adminUsers');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', orders: 5, joined: '2024-01-15', status: 'Active' },
      { id: 2, name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', orders: 8, joined: '2024-01-20', status: 'Active' },
      { id: 3, name: 'Aman Verma', email: 'aman@example.com', phone: '9876543212', orders: 3, joined: '2024-02-01', status: 'Inactive' },
      { id: 4, name: 'Neha Patel', email: 'neha@example.com', phone: '9876543213', orders: 6, joined: '2024-01-10', status: 'Active' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('adminFoods', JSON.stringify(foods));
    localStorage.setItem('adminOrders', JSON.stringify(orders));
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [foods, orders, users]);

  const stats = {
    totalFoods: foods.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    revenue: orders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.amount : sum, 0),
    pendingOrders: orders.filter(o => o.status === 'Processing').length,
    deliveredOrders: orders.filter(o => o.status === 'Delivered').length
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    if (newFood.name && newFood.price) {
      const foodItem = {
        id: Date.now(),
        name: newFood.name,
        price: Number(newFood.price),
        rating: newFood.rating,
        img: newFood.img,
        category: newFood.category
      };
      setFoods([...foods, foodItem]);
      setNewFood({ name: '', price: '', rating: '⭐⭐⭐⭐', category: '', img: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' });
      alert('Food item added successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleUpdateFood = (e) => {
    e.preventDefault();
    if (editingFood) {
      setFoods(foods.map(food => food.id === editingFood.id ? editingFood : food));
      setEditingFood(null);
      alert('Food item updated successfully!');
    }
  };

  const handleDeleteFood = (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      setFoods(foods.filter(food => food.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (food.category && food.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-sidebar-new">
        <div className="admin-sidebar-header">
          <div className="admin-logo-small">🍴 Foodii</div>
          <div className="admin-user-info">
            <img src={adminUser?.avatar} alt="Admin" />
            <div>
              <h4>{adminUser?.name}</h4>
              <p>{adminUser?.role}</p>
            </div>
          </div>
        </div>
        
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'add-food' ? 'active' : ''} onClick={() => setActiveTab('add-food')}>
            ➕ Add Food
          </button>
          <button className={activeTab === 'manage-foods' ? 'active' : ''} onClick={() => setActiveTab('manage-foods')}>
            📋 Manage Foods
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            📦 Orders
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Users
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            ⚙️ Settings
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="admin-dashboard-view">
            <h1>Dashboard Overview</h1>
            
            <div className="stats-grid-new">
              <div className="stat-card-new">
                <div className="stat-icon">🍔</div>
                <div className="stat-info">
                  <h3>{stats.totalFoods}</h3>
                  <p>Total Foods</p>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>{stats.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>₹{stats.revenue.toLocaleString()}</h3>
                  <p>Revenue</p>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <h3>{stats.pendingOrders}</h3>
                  <p>Pending Orders</p>
                </div>
              </div>
              <div className="stat-card-new">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>{stats.deliveredOrders}</h3>
                  <p>Delivered Orders</p>
                </div>
              </div>
            </div>

            <div className="recent-activities">
              <h2>Recent Orders</h2>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.items}</td>
                        <td>₹{order.amount}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Food */}
        {activeTab === 'add-food' && (
          <div className="admin-add-food">
            <h1>Add New Food Item</h1>
            <form onSubmit={handleAddFood} className="add-food-form-new">
              <div className="form-group">
                <label>Food Name *</label>
                <input
                  type="text"
                  placeholder="Enter food name"
                  value={newFood.name}
                  onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newFood.price}
                    onChange={(e) => setNewFood({...newFood, price: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newFood.category}
                    onChange={(e) => setNewFood({...newFood, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Street Food">Street Food</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Tandoori">Tandoori</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <select
                  value={newFood.rating}
                  onChange={(e) => setNewFood({...newFood, rating: e.target.value})}
                >
                  <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐ (5)</option>
                  <option value="⭐⭐⭐⭐">⭐⭐⭐⭐ (4)</option>
                  <option value="⭐⭐⭐">⭐⭐⭐ (3)</option>
                  <option value="⭐⭐">⭐⭐ (2)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newFood.img}
                  onChange={(e) => setNewFood({...newFood, img: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-btn">➕ Add Food Item</button>
            </form>
          </div>
        )}

        {/* Manage Foods */}
        {activeTab === 'manage-foods' && (
          <div className="admin-manage-foods">
            <div className="manage-header">
              <h1>Manage Food Items</h1>
              <input
                type="text"
                placeholder="Search foods..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {editingFood && (
              <div className="edit-food-modal">
                <h3>Edit Food Item</h3>
                <form onSubmit={handleUpdateFood}>
                  <input
                    type="text"
                    value={editingFood.name}
                    onChange={(e) => setEditingFood({...editingFood, name: e.target.value})}
                    placeholder="Food Name"
                  />
                  <input
                    type="number"
                    value={editingFood.price}
                    onChange={(e) => setEditingFood({...editingFood, price: Number(e.target.value)})}
                    placeholder="Price"
                  />
                  <select
                    value={editingFood.rating}
                    onChange={(e) => setEditingFood({...editingFood, rating: e.target.value})}
                  >
                    <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                    <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                    <option value="⭐⭐⭐">⭐⭐⭐</option>
                  </select>
                  <div className="modal-buttons">
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditingFood(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="foods-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map(food => (
                    <tr key={food.id}>
                      <td><img src={food.img} alt={food.name} className="food-thumbnail" /></td>
                      <td>{food.name}</td>
                      <td>{food.category || 'General'}</td>
                      <td>₹{food.price}</td>
                      <td>{food.rating}</td>
                      <td>
                        <button className="edit-btn" onClick={() => setEditingFood(food)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDeleteFood(food.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="admin-orders">
            <h1>Order Management</h1>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.items}</td>
                      <td>₹{order.amount}</td>
                      <td>{order.payment}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="admin-users">
            <h1>User Management</h1>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Orders</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.orders}</td>
                      <td>{user.joined}</td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="admin-settings">
            <h1>Admin Settings</h1>
            <div className="settings-card">
              <h3>Change Password</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Password change feature coming soon!');
              }}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button type="submit" className="submit-btn">Update Password</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;