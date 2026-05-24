// src/components/CartPopup.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPopup = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Update cart icon count in navbar
  React.useEffect(() => {
    const cartCountElements = document.querySelectorAll('.cart-count, .cart-count-nav');
    cartCountElements.forEach(el => {
      if (el) el.textContent = cart.length;
    });
  }, [cart]);

  return (
    <div className={`cart-popup ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart 🛒</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>✕</button>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Cart is empty</p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price}</div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(idx)}>X</button>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>₹{getCartTotal()}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPopup;