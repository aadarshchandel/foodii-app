// src/data/foodData.js
export const initialFoods = [
  // North Indian Delights (10 items)
  { 
    id: 1, 
    name: "Butter Chicken", 
    price: 350, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Butter-Chicken-.jpg", 
    category: "North Indian",
    description: "Creamy tomato-based curry with tender chicken pieces"
  },
  { 
    id: 2, 
    name: "Paneer Butter Masala", 
    price: 280, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Paneer-Butter-Masala-1.jpg", 
    category: "North Indian",
    description: "Soft paneer cubes in rich buttery gravy"
  },
  { 
    id: 3, 
    name: "Dal Makhani", 
    price: 220, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Dal-Makhani.jpg", 
    category: "North Indian",
    description: "Slow cooked black lentils with cream and butter"
  },
  { 
    id: 4, 
    name: "Chicken Tikka Masala", 
    price: 320, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala.jpg", 
    category: "North Indian",
    description: "Grilled chicken in spiced tomato-cream sauce"
  },
  { 
    id: 5, 
    name: "Palak Paneer", 
    price: 260, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Palak-Paneer-1.jpg", 
    category: "North Indian",
    description: "Paneer in creamy spinach gravy"
  },
  { 
    id: 6, 
    name: "Shahi Paneer", 
    price: 290, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Shahi-Paneer.jpg", 
    category: "North Indian",
    description: "Royal paneer curry with nuts and cream"
  },
  { 
    id: 7, 
    name: "Chole Bhature", 
    price: 150, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Chole-Bhature.jpg", 
    category: "Street Food",
    description: "Spicy chickpeas with fluffy fried bread"
  },
  { 
    id: 8, 
    name: "Rajma Chawal", 
    price: 160, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Rajma-Chawal.jpg", 
    category: "North Indian",
    description: "Red kidney beans curry with steamed rice"
  },
  { 
    id: 9, 
    name: "Garlic Naan", 
    price: 50, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Garlic-Naan.jpg", 
    category: "Breads",
    description: "Soft leavened bread with garlic butter"
  },
  { 
    id: 10, 
    name: "Butter Naan", 
    price: 45, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Butter-Naan.jpg", 
    category: "Breads",
    description: "Classic naan topped with melted butter"
  },

  // South Indian Specialties (8 items)
  { 
    id: 11, 
    name: "Masala Dosa", 
    price: 120, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Masala-Dosa.jpg", 
    category: "South Indian",
    description: "Crispy rice crepe with spiced potato filling"
  },
  { 
    id: 12, 
    name: "Idli Sambhar", 
    price: 60, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Idli-Sambar.jpg", 
    category: "South Indian",
    description: "Steamed rice cakes with lentil soup"
  },
  { 
    id: 13, 
    name: "Medu Vada", 
    price: 55, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Medu-Vada.jpg", 
    category: "South Indian",
    description: "Crispy lentil donuts with coconut chutney"
  },
  { 
    id: 14, 
    name: "Uttapam", 
    price: 90, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Uttapam.jpg", 
    category: "South Indian",
    description: "Thick rice pancake with onion & tomato toppings"
  },
  { 
    id: 15, 
    name: "Rava Dosa", 
    price: 100, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Rava-Dosa.jpg", 
    category: "South Indian",
    description: "Crispy semolina crepe"
  },
  { 
    id: 16, 
    name: "Lemon Rice", 
    price: 90, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Lemon-Rice.jpg", 
    category: "South Indian",
    description: "Tangy rice flavored with lemon and peanuts"
  },
  { 
    id: 17, 
    name: "Bisibele Bath", 
    price: 120, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Bisibele-Bath.jpg", 
    category: "South Indian",
    description: "Spicy rice-lentil dish with vegetables"
  },
  { 
    id: 18, 
    name: "Pongal", 
    price: 85, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Pongal.jpg", 
    category: "South Indian",
    description: "Comforting rice and lentil porridge"
  },

  // Biryani & Rice (6 items)
  { 
    id: 19, 
    name: "Hyderabadi Chicken Biryani", 
    price: 280, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-Chicken-Biryani.jpg", 
    category: "Biryani",
    description: "Aromatic basmati rice with tender chicken"
  },
  { 
    id: 20, 
    name: "Mutton Biryani", 
    price: 350, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Mutton-Biryani.jpg", 
    category: "Biryani",
    description: "Slow-cooked mutton with fragrant spices"
  },
  { 
    id: 21, 
    name: "Vegetable Biryani", 
    price: 180, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Vegetable-Biryani.jpg", 
    category: "Biryani",
    description: "Colorful veggie rice with aromatic spices"
  },
  { 
    id: 22, 
    name: "Egg Biryani", 
    price: 200, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Egg-Biryani.jpg", 
    category: "Biryani",
    description: "Spicy rice layered with boiled eggs"
  },
  { 
    id: 23, 
    name: "Veg Fried Rice", 
    price: 140, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Veg-Fried-Rice.jpg", 
    category: "Chinese",
    description: "Indo-Chinese style fried rice with vegetables"
  },
  { 
    id: 24, 
    name: "Jeera Rice", 
    price: 120, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Jeera-Rice.jpg", 
    category: "Rice",
    description: "Fragrant cumin flavored rice"
  },

  // Tandoori Delights (6 items)
  { 
    id: 25, 
    name: "Tandoori Chicken", 
    price: 280, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Tandoori-Chicken.jpg", 
    category: "Tandoori",
    description: "Yogurt-marinated chicken grilled in clay oven"
  },
  { 
    id: 26, 
    name: "Paneer Tikka", 
    price: 220, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Paneer-Tikka.jpg", 
    category: "Tandoori",
    description: "Marinated cottage cheese cubes grilled to perfection"
  },
  { 
    id: 27, 
    name: "Seekh Kebab", 
    price: 250, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Seekh-Kebab.jpg", 
    category: "Tandoori",
    description: "Minced meat skewers with Indian spices"
  },
  { 
    id: 28, 
    name: "Chicken Tikka", 
    price: 260, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka.jpg", 
    category: "Tandoori",
    description: "Boneless chicken pieces marinated in spices"
  },
  { 
    id: 29, 
    name: "Malai Tikka", 
    price: 240, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Malai-Tikka.jpg", 
    category: "Tandoori",
    description: "Creamy cheese & cream marinated chicken"
  },
  { 
    id: 30, 
    name: "Fish Tikka", 
    price: 320, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Fish-Tikka.jpg", 
    category: "Tandoori",
    description: "Spiced boneless fish grilled in tandoor"
  },

  // Street Food Favorites (8 items)
  { 
    id: 31, 
    name: "Pani Puri", 
    price: 50, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Pani-Puri.jpg", 
    category: "Street Food",
    description: "Crispy hollow puris filled with spicy water"
  },
  { 
    id: 32, 
    name: "Pav Bhaji", 
    price: 130, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Pav-Bhaji.jpg", 
    category: "Street Food",
    description: "Mixed vegetable mash served with buttered bread"
  },
  { 
    id: 33, 
    name: "Samosa", 
    price: 20, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Samosa.jpg", 
    category: "Street Food",
    description: "Crispy pastry filled with spiced potatoes"
  },
  { 
    id: 34, 
    name: "Vada Pav", 
    price: 40, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Vada-Pav.jpg", 
    category: "Street Food",
    description: "Mumbai-style potato fritter burger"
  },
  { 
    id: 35, 
    name: "Dahi Puri", 
    price: 50, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Dahi-Puri.jpg", 
    category: "Street Food",
    description: "Puri topped with yogurt and chutneys"
  },
  { 
    id: 36, 
    name: "Aloo Tikki", 
    price: 30, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Aloo-Tikki.jpg", 
    category: "Street Food",
    description: "Crispy potato patty with spices"
  },
  { 
    id: 37, 
    name: "Bhel Puri", 
    price: 40, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Bhel-Puri.jpg", 
    category: "Street Food",
    description: "Puffed rice snack with tangy tamarind sauce"
  },
  { 
    id: 38, 
    name: "Kachori", 
    price: 25, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Kachori.jpg", 
    category: "Street Food",
    description: "Flaky pastry filled with spiced lentils"
  },

  // Desserts (7 items)
  { 
    id: 39, 
    name: "Gulab Jamun", 
    price: 80, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Gulab-Jamun.jpg", 
    category: "Desserts",
    description: "Soft milk dumplings in sugar syrup"
  },
  { 
    id: 40, 
    name: "Jalebi", 
    price: 100, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Jalebi.jpg", 
    category: "Desserts",
    description: "Crispy spiral-shaped sweet in sugar syrup"
  },
  { 
    id: 41, 
    name: "Rasmalai", 
    price: 120, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Rasmalai.jpg", 
    category: "Desserts",
    description: "Soft paneer balls in creamy milk"
  },
  { 
    id: 42, 
    name: "Gajar Ka Halwa", 
    price: 110, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Gajar-ka-Halwa.jpg", 
    category: "Desserts",
    description: "Slow-cooked carrot pudding with nuts"
  },
  { 
    id: 43, 
    name: "Kulfi", 
    price: 60, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Kulfi.jpg", 
    category: "Ice Cream",
    description: "Traditional Indian ice cream"
  },
  { 
    id: 44, 
    name: "Rasgulla", 
    price: 90, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Rasgulla.jpg", 
    category: "Desserts",
    description: "Bengali sponge in light sugar syrup"
  },
  { 
    id: 45, 
    name: "Kheer", 
    price: 90, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Kheer.jpg", 
    category: "Desserts",
    description: "Creamy rice pudding with cardamom"
  },

  // Beverages (5 items)
  { 
    id: 46, 
    name: "Masala Chai", 
    price: 20, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Masala-Chai.jpg", 
    category: "Beverages",
    description: "Spiced Indian tea with ginger and cardamom"
  },
  { 
    id: 47, 
    name: "Mango Lassi", 
    price: 70, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Mango-Lassi.jpg", 
    category: "Beverages",
    description: "Sweet mango yogurt smoothie"
  },
  { 
    id: 48, 
    name: "Filter Coffee", 
    price: 25, 
    rating: "⭐⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Filter-Coffee.jpg", 
    category: "Beverages",
    description: "South Indian style strong coffee"
  },
  { 
    id: 49, 
    name: "Buttermilk", 
    price: 30, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Buttermilk.jpg", 
    category: "Beverages",
    description: "Spiced yogurt drink (Chaas)"
  },
  { 
    id: 50, 
    name: "Badam Milk", 
    price: 60, 
    rating: "⭐⭐⭐⭐", 
    img: "https://www.chefspencil.com/wp-content/uploads/Badam-Milk.jpg", 
    category: "Beverages",
    description: "Rich almond milk flavored with saffron"
  }
];