# FreshRoutes - Premium Online Grocery Store 🛒🍅

FreshRoutes is a full-stack, production-ready e-commerce grocery delivery platform designed with a modern, high-end UI/UX. It bridges the gap between local farmers and consumers by offering fresh fruits, vegetables, dairy, and household essentials with blazing-fast delivery.

## 🌟 Key Features

- **Modern & Premium UI**: Features a custom-built, responsive CSS architecture with glassmorphism, smooth animations, and high-quality product cards inspired by platforms like Zepto, Blinkit, and BigBasket.
- **Product Catalog**: Dynamic product rendering with filtering and category sorting.
- **Shopping Cart**: Real-time shopping cart with quantity adjustments and dynamic total calculations.
- **User Authentication**: Secure user login and registration system.
- **Checkout & Payments**: Integrated mock payment gateway for a seamless checkout experience.
- **Order Management**: Users can view their order history directly from their profile dashboard.

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Variables, Flexbox/Grid), Vanilla JavaScript (ES6+), Bootstrap 5 (for utility layout), FontAwesome.
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens), bcrypt.js

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/astutesona/food-delivery-system.git
   cd food-delivery-system
   ```

2. **Install server dependencies:**
   ```bash
   npm install
   ```

3. **Database Seeding (Optional but recommended):**
   To populate the database with initial products, run:
   ```bash
   node seed.js
   ```

4. **Start the application:**
   ```bash
   npm run dev
   # OR
   node server.js
   ```

5. **View in Browser:**
   Open your browser and navigate to: `http://localhost:3000`

## 🎨 Design Highlights

- **CSS Variables Architecture**: Easily themeable and scalable stylesheet structure.
- **Micro-Interactions**: Hover effects on cards, floating hero elements, and pulse animations on call-to-action buttons.
- **Responsive Layout**: Perfectly adapts to mobile, tablet, and desktop screens for a unified shopping experience.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
