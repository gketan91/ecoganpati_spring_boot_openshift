// EcoGanpati Store JavaScript - Spring Boot Version

// Product data will be fetched from Spring Boot API
let products = [];
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    fetchProducts();
    updateCartCount();
});

function initializeEventListeners() {
    // Cart button
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }

    // Explore collection button
    const exploreBtn = document.getElementById('explore-collection-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Close cart when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Fetch products from Spring Boot API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            products = await response.json();
            console.log('Products loaded from Spring Boot API:', products.length);
        } else {
            console.error('Failed to fetch products:', response.status);
            // Fallback to static data if API fails
            loadStaticProducts();
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        loadStaticProducts();
    }
}

// Fallback static product data
function loadStaticProducts() {
    products = [
        {
            id: 1,
            name: "Classic Seated Ganpati - Eco Edition",
            description: "Handcrafted from natural grass fibers and lime plaster. Traditional seated pose with intricate details. 100% biodegradable.",
            image: "4927287a-b2b7-4d46-9118-3d25cc8c5c6e",
            sizes: [
                {size: "Small (6\")", price: 899},
                {size: "Medium (10\")", price: 1599},
                {size: "Large (14\")", price: 2899}
            ]
        },
        {
            id: 2,
            name: "Majestic Standing Ganpati",
            description: "Elegant standing pose crafted from sustainable grass-based materials. Perfect for home temples and offices.",
            image: "ef53c80c-92b4-4dfc-95bb-3a2040262ebe",
            sizes: [
                {size: "Small (8\")", price: 1199},
                {size: "Medium (12\")", price: 2199},
                {size: "Large (16\")", price: 3899}
            ]
        },
        {
            id: 3,
            name: "Divine Dancing Ganpati",
            description: "Dynamic dancing pose representing joy and celebration. Made from eco-friendly grass plaster with natural pigments.",
            image: "af79bbb3-0ba6-441a-8675-0149db3df535",
            sizes: [
                {size: "Small (7\")", price: 1399},
                {size: "Medium (11\")", price: 2599},
                {size: "Large (15\")", price: 4299}
            ]
        },
        {
            id: 4,
            name: "Lotus Bliss Ganpati",
            description: "Serene Ganpati on lotus base. Compact design perfect for small spaces. Completely biodegradable after festivals.",
            image: "ab4ce778-be52-44c0-b148-9d35366a051b",
            sizes: [
                {size: "Small (5\")", price: 749},
                {size: "Medium (8\")", price: 1399},
                {size: "Large (12\")", price: 2499}
            ]
        }
    ];
}

// Update product price when size changes
function updatePrice(productId) {
    const select = document.getElementById(`size-${productId}`);
    const priceElement = document.getElementById(`price-${productId}`);
    const selectedIndex = select.value;

    const product = products.find(p => p.id === productId);
    if (product && product.sizes[selectedIndex]) {
        const newPrice = product.sizes[selectedIndex].price;
        priceElement.textContent = `₹${newPrice}`;

        // Add a subtle animation
        priceElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            priceElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add item to cart
async function addToCart(productId) {
    const select = document.getElementById(`size-${productId}`);
    const selectedIndex = parseInt(select.value);

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selectedSize = product.sizes[selectedIndex];

    const cartItem = {
        id: Date.now(), // Unique cart item id
        productId: productId,
        name: product.name,
        size: selectedSize.size,
        price: selectedSize.price,
        image: product.image,
        quantity: 1
    };

    // Check if item already exists in cart
    const existingItem = cart.find(item => 
        item.productId === productId && item.size === selectedSize.size
    );

    if (existingItem) {
        existingItem.quantity += 1;
        showNotification('Quantity updated in cart!', 'success');
    } else {
        cart.push(cartItem);
        showNotification('Added to cart successfully!', 'success');
    }

    updateCartCount();
    updateCartDisplay();

    // Add visual feedback to button
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#28a745';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);

    // Send to Spring Boot backend
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItem)
        });

        if (response.ok) {
            console.log('Cart item synced with Spring Boot backend');
        }
    } catch (err) {
        console.log('Cart sync failed:', err);
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');

    if (cartSidebar && overlay) {
        const isOpen = cartSidebar.classList.contains('open');

        if (isOpen) {
            closeCart();
        } else {
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateCartDisplay();
        }
    }
}

// Close cart sidebar
function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');

    if (cartSidebar && overlay) {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Update cart item count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Add animation
        if (totalItems > 0) {
            cartCountElement.parentElement.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                cartCountElement.parentElement.style.animation = '';
            }, 300);
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #6c757d;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                <p>Your cart is empty</p>
                <p>Add some divine idols to get started!</p>
            </div>
        `;
        cartTotalElement.textContent = '0';
        return;
    }

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/${item.image}.png" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>Qty: ${item.quantity}</p>
                <div class="cart-item-price">₹${item.price * item.quantity}</div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 1.2rem; padding: 0.5rem;">&times;</button>
        </div>
    `).join('');

    cartItemsContainer.innerHTML = cartHTML;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toLocaleString();
}

// Remove item from cart
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const orderSummary = `
        Order Summary:
        ${itemCount} item(s) - Total: ₹${total.toLocaleString()}

        ${cart.map(item => `${item.name} (${item.size}) x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

        Thank you for choosing EcoGanpati!
        Your order will be processed shortly.
    `;

    alert(orderSummary);

    // Clear cart after checkout
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCart();

    showNotification('Order placed successfully! 🎉', 'success');
}

// Quick view function
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-header">
                <h3>${product.name}</h3>
                <button onclick="closeQuickView()" class="close-btn">&times;</button>
            </div>
            <div class="quick-view-body">
                <img src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/${product.image}.png" alt="${product.name}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 1rem;">
                <p style="color: #6c757d; line-height: 1.6; margin-bottom: 1.5rem;">${product.description}</p>
                <div style="margin-bottom: 1rem;">
                    <strong>Available Sizes & Prices:</strong>
                    <ul style="margin-top: 0.5rem;">
                        ${product.sizes.map(size => `<li>${size.size} - ₹${size.price}</li>`).join('')}
                    </ul>
                </div>
                <button onclick="closeQuickView(); document.getElementById('collection').scrollIntoView({behavior: 'smooth'});" class="btn btn--primary">View in Collection</button>
            </div>
        </div>
    `;

    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        padding: 20px;
        box-sizing: border-box;
    `;

    modal.querySelector('.quick-view-content').style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
    `;

    modal.querySelector('.quick-view-header').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e8f5e8;
    `;

    modal.querySelector('.close-btn').style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
        padding: 0.5rem;
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeQuickView();
        }
    });
}

// Close quick view modal
function closeQuickView() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

console.log('🌱 EcoGanpati Spring Boot Store initialized successfully!');
