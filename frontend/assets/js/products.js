/**
 * products.js — Dynamic Product Renderer
 * Fetches from API service (api.js) and renders product cards into the DOM.
 * Includes sort, price-filter, and category-filter logic.
 */

// Helper to fix image paths when loaded from index.html (root level of frontend)
function fixImagePath(imagePath) {
  if (!imagePath) return '';
  const isSubpage = window.location.pathname.includes('/pages/');
  if (!isSubpage && imagePath.startsWith('../')) {
    return imagePath.replace(/^\.\.\//, ''); // Remove leading "../" -> "public/images/..."
  }
  return imagePath;
}

// Helper to determine product detail page url dynamically
function fixProductDetailPath(productId) {
  const isSubpage = window.location.pathname.includes('/pages/');
  if (isSubpage) {
    return `product-details.html?id=${productId}`;
  }
  return `pages/product-details.html?id=${productId}`;
}

// ── Card Builder ──────────────────────────────────────────────────────────────

function buildProductCard(product) {
  const detailUrl = fixProductDetailPath(product.id);
  return `
    <div class="product-card" data-price="${product.price}" data-id="${product.id}">
      <a href="${detailUrl}" style="text-decoration: none; color: inherit; display: block;">
        <img src="${fixImagePath(product.image)}" alt="${product.name}" loading="lazy">
        <div class="overlay-text">View Details</div>
        <h3>${product.name}</h3>
      </a>
      <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
      <button onclick="Cart.addToCart('${product.id}', '${product.name.replace(/'/g,"\\'")}', ${product.price}, '${product.image}')">
        Add to Cart
      </button>
    </div>
  `;
}

// ── Render Functions ──────────────────────────────────────────────────────────

/**
 * Render products into a container element.
 * @param {string} containerId  - ID of the .products container
 * @param {string} category     - 'all' | 'face' | 'family' | 'heart' | 'bestseller' | 'newin' | 'sale'
 */
async function renderProducts(containerId, category = 'all') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p class="loading-products">Loading products…</p>';

  try {
    let products;
    switch (category) {
      case 'bestseller': products = await API.getBestSellers();    break;
      case 'newin':      products = await API.getNewArrivals();    break;
      case 'sale':       products = await API.getSaleProducts();   break;
      default:           products = await API.getProductsByCategory(category);
    }

    // Check for search query parameter in URL
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.categories.some(c => c.toLowerCase().includes(q))
      );
      
      const pageHeader = document.querySelector('.product-grid h1');
      if (pageHeader) {
        pageHeader.textContent = `Search Results for "${searchQuery}"`;
      }
    }

    if (products.length === 0) {
      container.innerHTML = '<p class="no-products">No products found.</p>';
      return;
    }

    container.innerHTML = products.map(buildProductCard).join('');
    initSortAndFilter(container, products);
  } catch (err) {
    console.error('renderProducts error:', err);
    container.innerHTML = '<p class="error-products">Failed to load products. Please try again.</p>';
  }
}

// ── Homepage Spotlight Renders ────────────────────────────────────────────────

/**
 * Renders 3 best-seller spotlight images on the homepage.
 */
async function renderHomeBestSellers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const products = await API.getBestSellers();
    const slice = products.slice(0, 3);
    container.innerHTML = slice.map(p =>
      `<a href="pages/product-details.html?id=${p.id}">
        <img src="${fixImagePath(p.image)}" height="470px" alt="${p.name}">
       </a>`
    ).join('');
  } catch (e) { console.error(e); }
}

/**
 * Renders 3 new-arrival spotlight images on the homepage.
 */
async function renderHomeNewArrivals(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const products = await API.getNewArrivals();
    const slice = products.slice(0, 3);
    container.innerHTML = slice.map(p =>
      `<a href="pages/product-details.html?id=${p.id}">
        <img src="${fixImagePath(p.image)}" height="470px" alt="${p.name}">
       </a>`
    ).join('');
  } catch (e) { console.error(e); }
}

// ── Sort & Filter ─────────────────────────────────────────────────────────────

function initSortAndFilter(container, allProducts) {
  const sortSelect = document.getElementById('sort-options');
  const priceRange = document.getElementById('price-range');
  const priceLabel = document.getElementById('price-label');

  let currentProducts = [...allProducts];

  function applyAndRender() {
    let filtered = [...currentProducts];

    // Price filter
    if (priceRange) {
      const maxPrice = parseInt(priceRange.value);
      if (priceLabel) priceLabel.textContent = `₹250 - ₹${maxPrice.toLocaleString('en-IN')}`;
      filtered = filtered.filter(p => p.price <= maxPrice);
    }

    // Sort
    if (sortSelect) {
      const option = sortSelect.value;
      if (option === 'price-low-high') filtered.sort((a, b) => a.price - b.price);
      else if (option === 'price-high-low') filtered.sort((a, b) => b.price - a.price);
    }

    container.innerHTML = filtered.length
      ? filtered.map(buildProductCard).join('')
      : '<p class="no-products">No products in this range.</p>';
  }

  if (sortSelect) sortSelect.addEventListener('change', applyAndRender);
  if (priceRange) priceRange.addEventListener('input', applyAndRender);
}

// ── Product Detail Page ───────────────────────────────────────────────────────

async function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const product = await API.getProductById(id);
    if (!product) { const detailEl = document.getElementById('product-detail'); if (detailEl) detailEl.innerHTML = '<p>Product not found.</p>'; return; }

    document.title = `${product.name} — DAILYCORE`;
    const el = document.getElementById('product-detail');
    if (el) {
      el.innerHTML = `
        <div class="pd-image"><img src="${fixImagePath(product.image)}" alt="${product.name}"></div>
        <div class="pd-info">
          <h1>${product.name}</h1>
          <p class="pd-price">₹${product.price.toLocaleString('en-IN')}</p>
          <p class="pd-desc">${product.description}</p>
          <button class="pd-add-btn" onclick="Cart.addToCart('${product.id}','${product.name.replace(/'/g,"\\'")}',${product.price},'${product.image}')">
            Add to Cart
          </button>
        </div>
      `;
    }
  } catch (e) { console.error(e); }
}

// ── Auto-init ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Product detail page
  if (document.getElementById('product-detail')) renderProductDetail();

  // Homepage spotlights
  if (document.getElementById('home-bestsellers')) renderHomeBestSellers('home-bestsellers');
  if (document.getElementById('home-newarrivals')) renderHomeNewArrivals('home-newarrivals');
});

window.Products = { renderProducts, renderHomeBestSellers, renderHomeNewArrivals, buildProductCard };
