// src/components/FoodCard.jsx
import React from 'react';

const FoodCard = ({ food, onAddToCart }) => {
  return (
    <div className="food-card">
      <img src={food.img} alt={food.name} />
      <div className="food-card-content">
        <h3>{food.name}</h3>
        <div className="price">₹{food.price}</div>
        <div className="rating">{food.rating}</div>
        <button className="add-btn" onClick={() => onAddToCart(food)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;