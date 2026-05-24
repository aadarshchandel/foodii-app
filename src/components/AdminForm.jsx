// src/components/AdminForm.jsx
import React, { useState } from 'react';

const AdminForm = ({ onAddFood }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price && rating) {
      const newFood = {
        id: Date.now(),
        name,
        price: Number(price),
        rating,
        img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092'
      };
      onAddFood(newFood);
      setName('');
      setPrice('');
      setRating('');
    }
  };

  return (
    <form className="admin-card" onSubmit={handleSubmit}>
      <h2>Add Food Item</h2>
      <input
        type="text"
        placeholder="Food Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price ₹"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Rating ⭐ (e.g., ⭐⭐⭐⭐)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <button type="submit" className="admin-btn">➕ Add Food</button>
    </form>
  );
};

export default AdminForm;