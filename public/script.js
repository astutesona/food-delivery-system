// ===============================
// STATE
// ===============================
let products = [];
let cart = [];
let currentUser = null;

// DOM Elements
const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartBtnHeader = document.querySelector(".cart");
const overlay = document.getElementById("overlay");
const checkoutBtn = document.querySelector(".checkout-btn");
const loginBtn = document.querySelector(".login-btn");
const searchInput = document.querySelector(".search-box input");

// Auth Modal Elements
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");
const authForm = document.getElementById("authForm");
const toggleAuthMode = document.getElementById("toggleAuthMode");
const authTitle = document.getElementById("authTitle");
const authSubmitBtn = document.querySelector(".auth-submit-btn");
const nameGroup = document.getElementById("nameGroup");
let isLoginMode = true;

// Payment Modal
const paymentModal = document.getElementById("paymentModal");
const closePayment = document.getElementById("closePayment");
const paymentForm = document.getElementById("paymentForm");
const paymentTotalAmount = document.getElementById("paymentTotalAmount");
const paymentLoader = document.getElementById("paymentLoader");
const payBtn = document.getElementById("payBtn");

// Profile Modal
const profileModal = document.getElementById("profileModal");
const closeProfile = document.getElementById("closeProfile");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const logoutBtn = document.getElementById("logoutBtn");
const userOrdersContainer = document.getElementById("userOrdersContainer");

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
    checkAuth();
    await fetchProducts();
    renderProducts(products);
});

// ===============================
// TOAST NOTIFICATIONS
// ===============================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===============================
// AUTHENTICATION
// ===============================
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        loginBtn.innerHTML = `<i class="fa-regular fa-user"></i> ${currentUser.name}`;
    } else {
        currentUser = null;
        loginBtn.innerHTML = `<i class="fa-regular fa-user"></i> Login`;
    }
}

loginBtn.addEventListener("click", () => {
    if (!currentUser) {
        authModal.style.display = "block";
    } else {
        openProfile();
    }
});

closeAuth.addEventListener("click", () => { authModal.style.display = "none"; });

toggleAuthMode.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        authTitle.innerText = "Login to FreshRoutes";
        authSubmitBtn.innerText = "Login";
        toggleAuthMode.innerText = "Register here";
        nameGroup.style.display = "none";
    } else {
        authTitle.innerText = "Register for FreshRoutes";
        authSubmitBtn.innerText = "Register";
        toggleAuthMode.innerText = "Login here";
        nameGroup.style.display = "block";
    }
});

authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("authName").value;
    const email = document.getElementById("authEmail").value;
    const password = document.getElementById("authPassword").value;
    
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    const body = isLoginMode ? { email, password } : { name, email, password };
    
    try {
        const res = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        const data = await res.json();
        
        if (res.ok) {
            if (isLoginMode) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                checkAuth();
                authModal.style.display = "none";
                showToast("Logged in successfully!", 'success');
            } else {
                showToast("Registered successfully! Please log in.", 'success');
                isLoginMode = true;
                toggleAuthMode.click();
            }
        } else {
            showToast(data.error || "An error occurred", 'error');
        }
    } catch (err) {
        showToast("Server error", 'error');
    }
});

// ===============================
// USER PROFILE
// ===============================
async function openProfile() {
    profileName.innerText = currentUser.name;
    profileEmail.innerText = currentUser.email; // Note: Ensure email is returned in user object during login if needed, or fallback.
    profileModal.style.display = "block";
    
    const token = localStorage.getItem('token');
    userOrdersContainer.innerHTML = 'Loading orders...';
    
    try {
        const res = await fetch('http://localhost:3000/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const orders = await res.json();
            if (orders.length === 0) {
                userOrdersContainer.innerHTML = '<p>No orders yet.</p>';
                return;
            }
            userOrdersContainer.innerHTML = orders.map(order => `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                    <p><strong>Order #${order._id.substring(18)}</strong> - ₹${order.totalAmount}</p>
                    <p style="font-size:12px; color:#666;">Status: <span style="color:#e67e22;">${order.status}</span> | Payment: ${order.paymentStatus}</p>
                    <p style="font-size:12px;">Items: ${order.items.map(i => i.quantity + 'x ' + i.name).join(', ')}</p>
                </div>
            `).join('');
        }
    } catch (err) {
        userOrdersContainer.innerHTML = '<p style="color:red;">Error loading orders.</p>';
    }
}

closeProfile.addEventListener("click", () => { profileModal.style.display = "none"; });

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    checkAuth();
    profileModal.style.display = "none";
    showToast("Logged out successfully", 'success');
});

// ===============================
// PRODUCTS & SEARCH
// ===============================
async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:3000/api/products');
        products = await res.json();
    } catch (err) {
        showToast("Failed to fetch products", 'error');
    }
}

function renderProducts(productsArray) {
    productGrid.innerHTML = '';
    if(productsArray.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }
    productsArray.forEach(product => {
        productGrid.innerHTML += `
        <div class="product-card">
            <span class="discount">${product.discount || ''}</span>
            <i class="fa-regular fa-heart favorite"></i>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/apple.png'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">${product.rating || '★★★★★'}</div>
                <div class="price">
                    <span class="current-price">₹${product.price}</span>
                    <span class="old-price">₹${product.oldPrice || ''}</span>
                </div>
                <button
                    class="cart-btn"
                    data-id="${product._id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                >
                    Add to Cart
                </button>
            </div>
        </div>
        `;
    });
    attachCartEvents();
}

searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term) || (p.category && p.category.toLowerCase().includes(term)));
    renderProducts(filtered);
});

// ===============================
// SHOPPING CART
// ===============================
function updateCartUI() {
    cartCount.textContent = cart.length;
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
        cartTotal.textContent = "0";
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:5px;">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;font-size:20px;">&times;</button>
            </div>
        `;
    });
    cartTotal.textContent = total;
}

function attachCartEvents() {
    const btns = document.querySelectorAll(".cart-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            const existingItem = cart.find(i => i.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            
            updateCartUI();
            showToast(`${name} added to cart!`);
            
            btn.innerHTML = "Added ✓";
            btn.style.background = "#4CAF50";
            btn.style.color = "white";
            setTimeout(() => {
                btn.innerHTML = "Add to Cart";
                btn.style.background = "";
                btn.style.color = "";
            }, 1000);
        });
    });
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
    showToast("Item removed from cart");
}

cartBtnHeader.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
});
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
});
overlay.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
});

// ===============================
// PAYMENT & CHECKOUT
// ===============================
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return showToast("Cart is empty!", 'error');
    if (!currentUser) {
        cartSidebar.classList.remove("active");
        overlay.classList.remove("active");
        authModal.style.display = "block";
        return showToast("Please login to checkout", 'error');
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    paymentTotalAmount.innerText = totalAmount;
    
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
    paymentModal.style.display = "block";
});

closePayment.addEventListener("click", () => { paymentModal.style.display = "none"; });

paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const cvv = document.getElementById("cardCvv").value;
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderItems = cart.map(i => ({ product: i.id, name: i.name, price: i.price, quantity: i.quantity }));

    // Show Loader
    payBtn.style.display = "none";
    paymentLoader.style.display = "block";

    try {
        // Step 1: Process Simulated Payment
        const payRes = await fetch('http://localhost:3000/api/orders/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ cvv, amount: totalAmount })
        });
        
        const payData = await payRes.json();
        
        if (!payRes.ok || !payData.success) {
            showToast(payData.message || "Payment Failed", 'error');
            payBtn.style.display = "block";
            paymentLoader.style.display = "none";
            return;
        }

        // Step 2: Place Order
        const orderRes = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                items: orderItems,
                totalAmount,
                shippingAddress: "Customer Saved Address",
                paymentStatus: "Paid"
            })
        });

        if (orderRes.ok) {
            showToast("Payment Successful! Order placed.", 'success');
            cart = [];
            updateCartUI();
            paymentModal.style.display = "none";
            paymentForm.reset();
        } else {
            showToast("Failed to save order.", 'error');
        }
    } catch (err) {
        showToast("Server error during checkout", 'error');
    } finally {
        payBtn.style.display = "block";
        paymentLoader.style.display = "none";
    }
});