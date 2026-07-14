/**
 * api.js — API Service Layer
 * All data fetching logic is centralized here.
 * When the backend is ready, swap the local JSON fetch for real API calls.
 *
 * Usage:
 *   const products = await API.getProducts();
 *   const product  = await API.getProductById('p001');
 */

const API_BASE_URL = '/api'; // Switch to this when backend is live

// Determine the correct path to products.json based on page location
function getDataPath() {
  // If current page is inside pages/ folder, go up one level
  return window.location.pathname.includes('/pages/')
    ? '../assets/data/products.json'
    : 'assets/data/products.json';
}

// Cache so we only fetch once per page load
let _productsCache = null;

/**
 * Fetch all products.
 * Currently loads from local JSON. Replace body with:
 *   return fetch(`${API_BASE_URL}/products`).then(r => r.json());
 */
async function getProducts() {
  if (_productsCache) return _productsCache;
  const res = await fetch(getDataPath());
  if (!res.ok) throw new Error('Failed to load products');
  _productsCache = await res.json();
  return _productsCache;
}


/**
 * Fetch a single product by ID.
 */
async function getProductById(id) {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

/**
 * Fetch products filtered by category slug.
 * @param {'all'|'face'|'family'|'heart'} category
 */
async function getProductsByCategory(category) {
  const products = await getProducts();
  if (category === 'all') return products;
  return products.filter(p => p.categories.includes(category));
}

/**
 * Fetch best-seller products.
 */
async function getBestSellers() {
  const products = await getProducts();
  return products.filter(p => p.isBestSeller);
}

/**
 * Fetch new-arrival products.
 */
async function getNewArrivals() {
  const products = await getProducts();
  return products.filter(p => p.isNewArrival);
}

/**
 * Fetch sale products.
 */
async function getSaleProducts() {
  const products = await getProducts();
  return products.filter(p => p.isSale);
}

// ── Auth Services (stubs — wire to backend later) ─────────────────────────────

async function loginUser(email, password) {
  // TODO: return fetch(`${API_BASE_URL}/auth/login`, { method:'POST', body: JSON.stringify({email, password}), headers:{'Content-Type':'application/json'} }).then(r=>r.json());
  console.warn('loginUser() — backend not yet connected');
  return { success: false, message: 'Backend not connected' };
}

async function registerUser(name, email, password) {
  // TODO: return fetch(`${API_BASE_URL}/auth/register`, { ... })
  console.warn('registerUser() — backend not yet connected');
  return { success: false, message: 'Backend not connected' };
}

// ── Order Services (stubs) ────────────────────────────────────────────────────

async function createOrder(orderData) {
  // TODO: return fetch(`${API_BASE_URL}/orders`, { method:'POST', ... })
  console.warn('createOrder() — backend not yet connected');
  return { success: false, message: 'Backend not connected' };
}

async function getOrdersByUser(userId) {
  // TODO: return fetch(`${API_BASE_URL}/orders/user/${userId}`)
  console.warn('getOrdersByUser() — backend not yet connected');
  return [];
}

// ── Export ────────────────────────────────────────────────────────────────────

window.API = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getBestSellers,
  getNewArrivals,
  getSaleProducts,
  loginUser,
  registerUser,
  createOrder,
  getOrdersByUser,
};
