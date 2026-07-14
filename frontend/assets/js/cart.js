/**
 * cart.js — Shopping Cart Module
 * Persists cart to localStorage. Ready to sync with backend.
 */

const CART_KEY = 'dailycore_cart';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = total > 0 ? total : '';
    badge.style.display = total > 0 ? 'inline-block' : 'none';
  }
}

// ── Cart Operations ───────────────────────────────────────────────────────────

function addToCart(productId, productName, productPrice, productImage) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  saveCart(cart);
  showCartNotification(productName);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  item.quantity = quantity;
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// ── Notification Toast ────────────────────────────────────────────────────────

function showCartNotification(productName) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.style.cssText = `
      position: fixed; bottom: 30px; right: 30px; z-index: 99999;
      background: #8037de; color: white; padding: 14px 22px;
      border-radius: 12px; font-size: 15px; font-weight: 600;
      box-shadow: 0 4px 20px rgba(0,0,0,.3);
      transform: translateY(100px); opacity: 0;
      transition: all .35s cubic-bezier(.34,1.56,.64,1);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = `✓ ${productName} added to cart`;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  clearTimeout(window._cartToastTimer);
  window._cartToastTimer = setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 2800);
}

// ── Render Cart Page ──────────────────────────────────────────────────────────

function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const totalEl = document.getElementById('cart-total');
  const emptyState = document.getElementById('cart-empty');
  const cartBody = document.getElementById('cart-body');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'flex';
    if (cartBody) cartBody.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartBody) cartBody.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
      </div>
      <div class="cart-item-qty">
        <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1}); Cart.renderCartPage();">−</button>
        <span>${item.quantity}</span>
        <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1}); Cart.renderCartPage();">+</button>
      </div>
      <p class="cart-item-subtotal">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
      <button class="cart-item-remove" onclick="Cart.removeFromCart('${item.id}'); Cart.renderCartPage();">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');

  if (totalEl) {
    totalEl.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartPage();
});

window.Cart = {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCart,
  getCartTotal,
  getCartCount,
  renderCartPage,
};
