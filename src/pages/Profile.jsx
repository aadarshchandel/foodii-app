// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { initialFoods } from '../data/foodData';

const Profile = () => {
  const { user, logout, updateProfile, addAddress, removeAddress } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ line1: '', line2: '', city: '', pincode: '' });
  const [activeTab, setActiveTab] = useState('orders');

  const handleUpdateProfile = () => {
    updateProfile({ name: editName, phone: editPhone });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleAddAddress = () => {
    if (newAddress.line1 && newAddress.city && newAddress.pincode) {
      addAddress(newAddress);
      setNewAddress({ line1: '', line2: '', city: '', pincode: '' });
      setShowAddressForm(false);
      alert('Address added successfully!');
    } else {
      alert('Please fill required fields');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userOrders = user?.orders || [
    { id: '#ORD001', date: '2024-05-20', total: 450, status: 'Delivered', items: 3 },
    { id: '#ORD002', date: '2024-05-18', total: 320, status: 'Delivered', items: 2 },
    { id: '#ORD003', date: '2024-05-15', total: 580, status: 'Cancelled', items: 4 },
  ];

  if (!user) {
    navigate('/auth-guard');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info-wrapper">
          <img src={user.avatar} alt={user.name} className="profile-avatar-large" />
          <div className="profile-info">
            {isEditing ? (
              <div className="profile-edit-form">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="Phone"
                />
                <button onClick={handleUpdateProfile}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone || 'Add phone number'}</p>
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
          📦 Orders
        </button>
        <button className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>
          📍 Addresses
        </button>
        <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>
          ❤️ Favorites
        </button>
        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
          ⚙️ Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h3>Your Orders</h3>
            {userOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
                <div className="order-details">
                  <span>📅 {new Date(order.date).toLocaleDateString()}</span>
                  <span>📦 {order.items} items</span>
                  <span>💰 ₹{order.total}</span>
                </div>
                <button className="reorder-btn">Reorder</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="addresses-section">
            <h3>Saved Addresses</h3>
            <button className="add-address-btn" onClick={() => setShowAddressForm(!showAddressForm)}>
              + Add New Address
            </button>
            
            {showAddressForm && (
              <div className="address-form">
                <input
                  type="text"
                  placeholder="Address Line 1*"
                  value={newAddress.line1}
                  onChange={(e) => setNewAddress({...newAddress, line1: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={newAddress.line2}
                  onChange={(e) => setNewAddress({...newAddress, line2: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="City*"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Pincode*"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                />
                <button onClick={handleAddAddress}>Save Address</button>
              </div>
            )}
            
            {user.addresses && user.addresses.map(addr => (
              <div key={addr.id} className="address-card">
                <div className="address-info">
                  <p>{addr.line1}</p>
                  {addr.line2 && <p>{addr.line2}</p>}
                  <p>{addr.city}, {addr.pincode}</p>
                </div>
                <button className="remove-address-btn" onClick={() => removeAddress(addr.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-section">
            <h3>Your Favorite Foods</h3>
            <div className="favorites-grid">
              {initialFoods.slice(0, 4).map(food => (
                <div key={food.id} className="favorite-card">
                  <img src={food.img} alt={food.name} />
                  <h4>{food.name}</h4>
                  <p>₹{food.price}</p>
                  <button onClick={() => navigate('/menu')}>Order Now</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h3>Account Settings</h3>
            <div className="setting-item">
              <span>🔔 Email Notifications</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>📱 SMS Updates</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>🌙 Dark Mode</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;