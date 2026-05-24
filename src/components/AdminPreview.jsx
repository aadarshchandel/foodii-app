// src/components/AdminPreview.jsx
import React from 'react';
import FoodCard from './FoodCard';

const AdminPreview = ({ foods, onDeleteLast }) => {
  return (
    <div className="admin-card">
      <h2>Food Preview</h2>
      <div className="menu-grid">
        {foods.map(food => (
          <FoodCard key={food.id} food={food} onAddToCart={() => {}} />
        ))}
      </div>
      <button onClick={onDeleteLast} className="admin-btn delete-btn" style={{ marginTop: '20px' }}>
        ❌ Delete Last Food
      </button>
    </div>
  );
};

export default AdminPreview;