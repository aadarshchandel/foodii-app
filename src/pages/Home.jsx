// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { initialFoods } from '../data/foodData';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  // Show top 8 popular Indian dishes
  const popularDishes = initialFoods.slice(0, 8);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Delicious Indian Food</h1>
          <h2>Delivered Fresh & Fast</h2>
          <p>Explore 200+ authentic Indian dishes from across the country</p>
          <button className="explore-btn" onClick={() => navigate('/menu')}>
            Explore Full Menu →
          </button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Delicious Indian Food" />
        </div>
      </section>

      <div className="container">
        <div className="section-header">
          <h2>🔥 Popular Indian Dishes</h2>
          <button className="view-all-btn" onClick={() => navigate('/menu')}>View All (200+ items) →</button>
        </div>

        <div className="menu-grid">
          {popularDishes.map(food => (
            <div className="food-card" key={food.id}>
              <img src={food.img} alt={food.name} />
              <div className="food-card-content">
                <h3>{food.name}</h3>
                <div className="category-tag">{food.category}</div>
                <div className="rating">
                  <span>★</span> {food.rating.split('⭐').length - 1}.0
                </div>
                <div className="price">₹{food.price}</div>
                <button className="add-to-cart-btn" onClick={() => addToCart(food)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat">
            <h3>200+</h3>
            <p>Indian Dishes</p>
          </div>
          <div className="stat">
            <h3>25+</h3>
            <p>Cities Served</p>
          </div>
          <div className="stat">
            <h3>1000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat">
            <h3>30min</h3>
            <p>Fast Delivery</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;