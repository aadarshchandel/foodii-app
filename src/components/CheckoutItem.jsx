// src/components/CheckoutItem.jsx
import React from 'react';

const CheckoutItem = ({ item }) => {
  return (
    <div className="checkout-item">
      <span>{item.name}</span>
      <span>₹{item.price}</span>
    </div>
  );
};

export default CheckoutItem;