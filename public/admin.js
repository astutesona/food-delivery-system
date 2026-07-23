document.addEventListener("DOMContentLoaded", () => {
    checkAdminAuth();
    fetchOrders();
});

function checkAdminAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!token || !user || user.role !== 'admin') {
        alert("Access Denied! Admin only.");
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = "index.html";
}

// Fetch and display orders
async function fetchOrders() {
    const token = localStorage.getItem('token');
    const container = document.getElementById("ordersContainer");
    
    try {
        const res = await fetch('http://localhost:3000/api/orders/all', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            const orders = await res.json();
            if (orders.length === 0) {
                container.innerHTML = "<p>No orders found.</p>";
                return;
            }
            
            container.innerHTML = '';
            orders.forEach(order => {
                const itemsHtml = order.items.map(i => `${i.quantity}x ${i.name}`).join(', ');
                const date = new Date(order.createdAt).toLocaleString();
                
                const isDelivered = order.status === 'Delivered';
                
                container.innerHTML += `
                    <div class="order-card" id="order-${order._id}">
                        <div class="order-header">
                            <span>Order #${order._id.substring(18)}</span>
                            <span>₹${order.totalAmount}</span>
                        </div>
                        <div style="font-size: 13px; color: #888; margin-bottom: 10px;">
                            ${date} | User: ${order.user?.name || 'Unknown'} (${order.user?.email || ''})
                        </div>
                        <div class="order-items">
                            <strong>Items:</strong> ${itemsHtml}
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <span class="status-badge" id="badge-${order._id}">${order.status}</span>
                                <span style="font-size: 12px; margin-left:10px; color:${order.paymentStatus==='Paid'?'green':'red'};">Payment: ${order.paymentStatus}</span>
                            </div>
                            <select onchange="updateOrderStatus('${order._id}', this.value)" style="width: auto; padding: 5px;" ${isDelivered ? 'disabled' : ''}>
                                <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </div>
                    </div>
                `;
            });
        } else {
            container.innerHTML = "<p style='color:red;'>Failed to load orders.</p>";
        }
    } catch (err) {
        container.innerHTML = "<p style='color:red;'>Server error.</p>";
    }
}

window.updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) {
            document.getElementById(`badge-${orderId}`).innerText = newStatus;
            alert("Order status updated!");
        } else {
            alert("Failed to update status");
        }
    } catch(err) {
        alert("Server error");
    }
};

// Add new product
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const product = {
        name: document.getElementById("pName").value,
        price: Number(document.getElementById("pPrice").value),
        oldPrice: Number(document.getElementById("pOldPrice").value) || undefined,
        category: document.getElementById("pCategory").value,
        image: document.getElementById("pImage").value
    };
    
    if (product.oldPrice) {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        product.discount = `${discount}% OFF`;
    }

    try {
        const res = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
        });
        
        if (res.ok) {
            alert("Product added successfully!");
            document.getElementById("addProductForm").reset();
            document.getElementById("pImage").value = "images/apple.png";
        } else {
            alert("Failed to add product");
        }
    } catch (err) {
        alert("Server error");
    }
});
