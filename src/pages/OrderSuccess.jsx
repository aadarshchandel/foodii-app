// src/pages/OrderSuccess.jsx (Updated with notification display)
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const order = location.state?.order;
  const notifications = location.state?.notifications || [];

  if (!order) {
    navigate('/menu');
    return null;
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for ordering with Foodii</p>
        
        <div className="order-details-card">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
          <p><strong>Items:</strong> {order.items}</p>
          <p><strong>Total Amount:</strong> ₹{order.total}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> <span className="confirmed-status">{order.status}</span></p>
        </div>

        {/* Notification Status Section */}
        {notifications.length > 0 && (
          <div className="notification-status">
            <h3>📧 Notification Status</h3>
            {notifications.map((notif, idx) => (
              <div key={idx} className={`notification-item ${notif.success ? 'success' : 'error'}`}>
                <span>{notif.type === 'email' ? '📧' : '📱'}</span>
                <div>
                  <strong>{notif.type.toUpperCase()}</strong>
                  <p>{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="delivery-info">
          <h3>Delivery Information</h3>
          <p>📍 Estimated Delivery Time: 25-35 minutes</p>
          <p>📞 Delivery Partner will contact you shortly</p>
          <p>📧 Confirmation sent to: {user?.email}</p>
          {user?.phone && <p>📱 SMS sent to: {user?.phone}</p>}
        </div>

        <div className="success-buttons">
          <button onClick={() => navigate('/')} className="home-btn">
            🏠 Back to Home
          </button>
          <button onClick={() => navigate('/profile')} className="orders-btn">
            📦 View My Orders
          </button>
          <button onClick={() => navigate('/menu')} className="order-again-btn">
            🍕 Order Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;