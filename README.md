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

## 🚀 Getting Started (Manual Steps to Run Locally)

Follow these manual steps to get the project running on your own machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed. You will also need [MongoDB](https://www.mongodb.com/) installed and running on your machine (or use a free MongoDB Atlas cloud cluster).

### Step-by-Step Installation

1. **Clone the repository:**
   Open your terminal (Command Prompt, PowerShell, or Mac Terminal) and run:
   ```bash
   git clone https://github.com/astutesona/food-delivery-system.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd food-delivery-system
   ```

3. **Install the required packages:**
   This project uses Express and Mongoose. Install them by running:
   ```bash
   npm install
   ```

4. **Start your local MongoDB Server:**
   Ensure your local MongoDB instance is running. If you have MongoDB Community Server installed, it usually runs automatically in the background on `mongodb://localhost:27017`.

5. **Populate the Database with dummy data (Optional):**
   To easily see products on the website without manually adding them, run the seed file once:
   ```bash
   node seed.js
   ```

6. **Start the Web Server:**
   Launch the backend server by running:
   ```bash
   node server.js
   ```
   *You should see a message saying the server is running on port 3000.*

7. **View the Website:**
   Open your favorite web browser (Chrome, Edge, Safari) and go to:
   👉 **[http://localhost:3000](http://localhost:3000)**

## 🎨 Design Highlights

- **CSS Variables Architecture**: Easily themeable and scalable stylesheet structure.
- **Micro-Interactions**: Hover effects on cards, floating hero elements, and pulse animations on call-to-action buttons.
- **Responsive Layout**: Perfectly adapts to mobile, tablet, and desktop screens for a unified shopping experience.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
