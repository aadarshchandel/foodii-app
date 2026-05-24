// src/pages/Menu.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { initialFoods } from '../data/foodData';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredFoods, setFilteredFoods] = useState(initialFoods);
  const { addToCart } = useCart();
  const location = useLocation();

  // Get unique categories from food data
  const categories = ['All', ...new Set(initialFoods.map(food => food.category))];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    
    if (searchQuery) {
      const searched = initialFoods.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoods(searched);
      setActiveCategory('All');
    } else {
      filterByCategory(activeCategory);
    }
  }, [location.search, activeCategory]);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredFoods(initialFoods);
    } else {
      const filtered = initialFoods.filter(food => food.category === category);
      setFilteredFoods(filtered);
    }
  };

  const getFoodEmoji = (name) => {
    const emojiMap = {
      'Burger': '🍔', 'Pizza': '🍕', 'Pasta': '🍝', 'French Fries': '🍟',
      'Cold Coffee': '☕', 'Mojito': '🍹', 'Chocolate Cake': '🍰', 'Ice Cream': '🍦',
      'Dosa': '🥞', 'Idli': '🍚', 'Biryani': '🍛', 'Samosa': '🥟',
      'Gulab Jamun': '🍬', 'Jalebi': '🍩', 'Paneer Tikka': '🍢', 'Naan': '🥙'
    };
    return emojiMap[name] || '🍽️';
  };

  return (
    <div className="container">
      <div className="menu-header">
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="result-count">Found {filteredFoods.length} items</p>
      </div>

      <div className="menu-grid">
        {filteredFoods.map(food => (
          <div className="food-card" key={food.id}>
            <img src={food.img} alt={food.name} />
            <div className="food-card-content">
              <div className="food-emoji">{getFoodEmoji(food.name)}</div>
              <h3>{food.name}</h3>
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
  );
};

export default Menu;