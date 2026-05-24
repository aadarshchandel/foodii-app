// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
  const { cart, getCartTotal, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, name: 'Home', address: '123 Main Street, Sector 15, Near City Mall', city: 'Mumbai', pincode: '400001', default: true },
    { id: 2, name: 'Office', address: 'Tech Park, 5th Floor, Business Bay', city: 'Mumbai', pincode: '400093', default: false }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedTime, setSelectedTime] = useState('ASAP');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    landmark: ''
  });

  const deliveryFee = 40;
  const packagingFee = 10;
  const gst = Math.round(getCartTotal() * 0.05);
  const platformFee = 5;
  const subtotal = getCartTotal();
  const totalAmount = subtotal + deliveryFee + packagingFee + gst + platformFee - (appliedCoupon?.discount || 0);

  const applyCoupon = () => {
    if (couponCode === 'SAVE20') {
      setAppliedCoupon({ code: 'SAVE20', discount: Math.min(100, subtotal * 0.2) });
      alert('Coupon applied! ₹' + Math.min(100, subtotal * 0.2) + ' discount');
    } else if (couponCode === 'FIRST50') {
      setAppliedCoupon({ code: 'FIRST50', discount: 50 });
      alert('Coupon applied! ₹50 discount');
    } else if (couponCode) {
      alert('Invalid coupon code');
    }
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', '/payment');
      sessionStorage.setItem('pendingCart', JSON.stringify(cart));
      alert('Please login or signup to continue with payment');
      navigate('/auth-guard');
    } else if (!selectedAddress && !showNewAddress) {
      alert('Please select a delivery address');
    } else {
      // Save checkout details for payment page
      const checkoutDetails = {
        address: showNewAddress ? newAddress : savedAddresses.find(a => a.id === selectedAddress),
        deliveryInstructions,
        selectedTime,
        appliedCoupon,
        subtotal,
        deliveryFee,
        packagingFee,
        gst,
        platformFee,
        total: totalAmount
      };
      sessionStorage.setItem('checkoutDetails', JSON.stringify(checkoutDetails));
      navigate('/payment');
    }
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart-container">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button className="browse-menu-btn" onClick={() => navigate('/menu')}>
            Browse Menu →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order and complete payment</p>
      </div>

      <div className="checkout-grid">
        {/* Left Section - Delivery & Payment Details */}
        <div className="checkout-left">
          {/* Delivery Address Section */}
          <div className="checkout-card">
            <div className="card-header">
              <span className="step-number">1</span>
              <h3>Delivery Address</h3>
            </div>
            
            {!showNewAddress ? (
              <>
                <div className="address-list">
                  {savedAddresses.map(addr => (
                    <label key={addr.id} className={`address-card ${selectedAddress === addr.id ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                      />
                      <div className="address-content">
                        <div className="address-header">
                          <strong>{addr.name}</strong>
                          {addr.default && <span className="default-badge">Default</span>}
                        </div>
                        <p className="address-text">{addr.address}</p>
                        <p className="address-city">{addr.city} - {addr.pincode}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button className="add-new-address-btn" onClick={() => setShowNewAddress(true)}>
                  + Add New Address
                </button>
              </>
            ) : (
              <div className="new-address-form">
                <h4>Add New Address</h4>
                <input
                  type="text"
                  placeholder="Address Label (Home, Office, etc.)"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Address Line"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={newAddress.landmark}
                  onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                />
                <div className="address-row">
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                  />
                </div>
                <div className="address-buttons">
                  <button className="save-address-btn" onClick={() => {
                    if (newAddress.name && newAddress.address && newAddress.city && newAddress.pincode) {
                      setSavedAddresses([...savedAddresses, { ...newAddress, id: Date.now(), default: false }]);
                      setShowNewAddress(false);
                      setNewAddress({ name: '', address: '', city: '', pincode: '', landmark: '' });
                      alert('Address added successfully!');
                    } else {
                      alert('Please fill all required fields');
                    }
                  }}>Save Address</button>
                  <button className="cancel-address-btn" onClick={() => setShowNewAddress(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Instructions */}
          <div className="checkout-card">
            <div className="card-header">
              <span className="step-number">2</span>
              <h3>Delivery Instructions</h3>
            </div>
            <textarea
              className="instructions-input"
              placeholder="Any special instructions for delivery? (e.g., Ring the bell, Leave at door, etc.)"
              rows="3"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </div>

          {/* Delivery Time */}
          <div className="checkout-card">
            <div className="card-header">
              <span className="step-number">3</span>
              <h3>Delivery Time</h3>
            </div>
            <div className="time-slots">
              <button className={`time-slot ${selectedTime === 'ASAP' ? 'active' : ''}`} onClick={() => setSelectedTime('ASAP')}>
                ⚡ ASAP
                <span>25-35 min</span>
              </button>
              <button className={`time-slot ${selectedTime === 'Later' ? 'active' : ''}`} onClick={() => setSelectedTime('Later')}>
                📅 Later
                <span>Schedule for later</span>
              </button>
            </div>
          </div>

          {/* Payment Method Preview */}
          <div className="checkout-card">
            <div className="card-header">
              <span className="step-number">4</span>
              <h3>Payment Method</h3>
            </div>
            <div className="payment-preview">
              <div className="payment-option-preview">
                <span>💳 Credit/Debit Card</span>
                <span>UPI</span>
                <span>💵 Cash on Delivery</span>
              </div>
              <p className="payment-note">You'll select payment method on next step</p>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            
            {/* Cart Items */}
            <div className="order-items">
              {cart.map((item, idx) => (
                <div key={idx} className="order-item">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">₹{item.price}</div>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(idx, (cart.filter(i => i.name === item.name).length) - 1)}>−</button>
                    <span>{cart.filter(i => i.name === item.name).length}</span>
                    <button onClick={() => {
                      const newCart = [...cart];
                      newCart.push(item);
                      // This is simplified - you might want to implement proper quantity management
                    }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="Apply Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
              {appliedCoupon && (
                <div className="applied-coupon">
                  <span>🎉 {appliedCoupon.code} applied - ₹{appliedCoupon.discount} off</span>
                  <button onClick={removeCoupon}>Remove</button>
                </div>
              )}
              <div className="available-coupons">
                <span>💡 Available: SAVE20 (20% off up to ₹100) | FIRST50 (₹50 off)</span>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bill-details">
              <h4>Bill Details</h4>
              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="bill-row">
                <span>Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>
              <div className="bill-row">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="bill-row">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              {appliedCoupon && (
                <div className="bill-row discount">
                  <span>Coupon Discount</span>
                  <span>-₹{appliedCoupon.discount}</span>
                </div>
              )}
              <div className="bill-row total">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Savings Info */}
            <div className="savings-info">
              <span>🎉 You saved ₹{deliveryFee + (appliedCoupon?.discount || 0)} on this order</span>
            </div>

            {/* Proceed Button */}
            <button className="proceed-payment-btn" onClick={handleProceedToPayment}>
              Proceed to Payment 💳
            </button>

            {/* Secure Payment Info */}
            <div className="secure-info">
              <span>🔒 100% Secure Payment</span>
              <span>✅ Free Cancellation within 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;