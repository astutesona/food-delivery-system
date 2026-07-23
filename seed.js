require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const initialProducts = [
  {
    name: "Fresh Apple",
    image: "images/apple.png", // Fixed image path from script.js to match reality
    price: 120,
    oldPrice: 150,
    rating: "★★★★☆",
    discount: "20% OFF",
    category: "Fruits"
  },
  {
    name: "Fresh Banana",
    image: "images/banana.png", // Added placeholder for missing image just in case
    price: 60,
    oldPrice: 80,
    rating: "★★★★★",
    discount: "25% OFF",
    category: "Fruits"
  },
  {
    name: "Fresh Milk",
    image: "images/milk.png",
    price: 55,
    oldPrice: 70,
    rating: "★★★★☆",
    discount: "15% OFF",
    category: "Dairy"
  },
  {
    name: "Premium Coffee",
    image: "images/coffee.png",
    price: 220,
    oldPrice: 260,
    rating: "★★★★★",
    discount: "18% OFF",
    category: "Beverages"
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log('Old products cleared.');
    await Product.insertMany(initialProducts);
    console.log('Database seeded successfully with initial products.');
    process.exit();
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();
