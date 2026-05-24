// src/pages/Payment.jsx (Updated with notifications)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { sendPaymentNotifications, sendOrderNotifications } from '../services/notificationService';

const Payment = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [showNotificationStatus, setShowNotificationStatus] = useState(false);
  const [notificationResults, setNotificationResults] = useState([]);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  if (cart.length === 0) {
    navigate('/menu');
    return null;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setShowNotificationStatus(true);

    // Simulate payment processing
    setTimeout(async () => {
      const orderId = '#ORD' + Date.now();
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart.length,
        total: getCartTotal(),
        status: 'Confirmed',
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
        itemsList: [...cart]
      };
      
      addOrder(order);
      
      // Send Order Notifications (Email & SMS)
      const orderDetails = {
        orderId: orderId,
        items: cart,
        total: getCartTotal(),
        address: selectedAddress,
        method: order.paymentMethod
      };
      
      const orderNotifications = await sendOrderNotifications(user, orderDetails);
      
      // Send Payment Notifications
      const paymentDetails = {
        orderId: orderId,
        amount: getCartTotal(),
        method: order.paymentMethod
      };
      
      const paymentNotifications = await sendPaymentNotifications(user, paymentDetails);
      
      setNotificationResults([...orderNotifications, ...paymentNotifications]);
      
      clearCart();
      setProcessing(false);
      
      // Show success message with notification details
      setTimeout(() => {
        navigate('/order-success', { state: { order, notifications: [...orderNotifications, ...paymentNotifications] } });
      }, 2000);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>💳 Payment Details</h2>
        <p>Complete your payment to place order</p>
      </div>

      {showNotificationStatus && processing && (
        <div className="notification-toast">
          <div className="toast-content">
            <span className="toast-icon">📧</span>
            <div>
              <strong>Sending notifications...</strong>
              <p>Sending email and SMS confirmation</p>
            </div>
          </div>
        </div>
      )}

      <div className="payment-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item, idx) => (
              <div key={idx} className="summary-item">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <span className="total-amount">₹{getCartTotal()}</span>
          </div>
        </div>

        {/* Payment Form */}
        <form className="payment-form" onSubmit={handlePayment}>
          <div className="delivery-address">
            <h3>Delivery Address</h3>
            <select 
              value={selectedAddress} 
              onChange={(e) => setSelectedAddress(e.target.value)}
              required
            >
              <option value="">Select delivery address</option>
              {user?.addresses?.map(addr => (
                <option key={addr.id} value={`${addr.line1}, ${addr.city} - ${addr.pincode}`}>
                  {addr.line1}, {addr.city} - {addr.pincode}
                </option>
              ))}
              <option value="new">+ Add New Address</option>
            </select>
          </div>

          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="method-options">
              <label className="method-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Credit/Debit Card</span>
              </label>
              <label className="method-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>📱 UPI</span>
              </label>
              <label className="method-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💵 Cash on Delivery</span>
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-details">
              <h3>Card Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                required
              />
              <div className="card-row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength="3"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="upi-details">
              <h3>UPI Details</h3>
              <input
                type="text"
                placeholder="Enter UPI ID (e.g., name@okhdfcbank)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
              <small>We'll send payment confirmation to your UPI app</small>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="cod-info">
              <p>✅ Pay in cash when your order is delivered</p>
              <p>📧 Order confirmation will be sent to your email and SMS</p>
            </div>
          )}

          <button type="submit" className="pay-now-btn" disabled={processing}>
            {processing ? '⏳ Processing & Sending Notifications...' : `Pay ₹${getCartTotal()}`}
          </button>
          
          <div className="notification-info">
            <small>📧 Email confirmation will be sent to: {user?.email}</small>
            {user?.phone && <small>📱 SMS confirmation will be sent to: {user?.phone}</small>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;