/**
 * main.js — Site-wide Utilities
 * Scroll animations, navbar behavior, and general UI helpers.
 */

// ── Navbar Scroll Behavior ────────────────────────────────────────────────────

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('dark');
    } else {
      navbar.classList.remove('dark');
    }
  }, { passive: true });
})();

// ── Hero Entry Animation ──────────────────────────────────────────────────────

window.addEventListener('load', () => {
  setTimeout(() => {
    const heroEl = document.querySelector('.dailycore');
    if (heroEl) heroEl.classList.add('active');
  }, 300);
});

// ── Smooth Reveal on Scroll ───────────────────────────────────────────────────

(function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();

// ── Active Nav Link Highlight ─────────────────────────────────────────────────

(function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar .navbardiv ul li a').forEach(link => {
    const hrefAttr = link.getAttribute('href');
    if (!hrefAttr) return;
    const href = hrefAttr.split('/').pop();
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active-link');
    }
  });
})();

// ── Global Search Bar Handler ────────────────────────────────────────────────

(function initSearchBar() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.searchbar-form').forEach(form => {
      const input = form.querySelector('.searchbar');
      const btn = form.querySelector('.submit');

      function handleSearch() {
        if (!input || !input.value.trim()) return;
        const query = encodeURIComponent(input.value.trim());
        const isSubpage = window.location.pathname.includes('/pages/');
        const targetUrl = isSubpage 
          ? `categories.html?search=${query}` 
          : `pages/categories.html?search=${query}`;
        window.location.href = targetUrl;
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSearch();
      });

      if (btn) {
        btn.type = 'submit';
      }
    });
  });
})();

// ── Contact & Checkout Form Completion Interceptors ──────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Contact Form
  const contactForm = document.querySelector('.contact-form-el');
  if (contactForm && !window.location.pathname.includes('checkout.html')) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstNameVal = document.getElementById('first-name')?.value || '';
      contactForm.innerHTML = `
        <div style="text-align:center; padding: 40px 20px; color: white;">
          <i class="fa-solid fa-circle-check" style="font-size: 60px; color: #e5c07b; margin-bottom: 20px;"></i>
          <h2 style="font-family: var(--font-serif); margin-bottom: 10px;">Message Sent!</h2>
          <p style="color: var(--clr-text-muted); font-size: 16px;">
            Thank you, ${firstNameVal}! We have received your message and will get back to you shortly.
          </p>
        </div>
      `;
    });
  }

  // Checkout Form
  const checkoutForm = document.querySelector('main .contact-container form.contact-form-el');
  if (checkoutForm && window.location.pathname.includes('checkout.html')) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstNameVal = document.getElementById('checkout-first')?.value || '';
      if (window.Cart) {
        window.Cart.clearCart();
      }
      const container = document.querySelector('main .contact-container');
      if (container) {
        container.innerHTML = `
          <div style="text-align:center; padding: 60px 40px; background: rgba(35, 36, 67, 0.25); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); backdrop-filter: blur(16px); color: white; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
            <i class="fa-solid fa-circle-check" style="font-size: 80px; color: #e5c07b; margin-bottom: 25px;"></i>
            <h1 style="font-family: var(--font-serif); margin-bottom: 15px;">Order Placed Successfully!</h1>
            <p style="color: var(--clr-text-muted); font-size: 18px; margin-bottom: 30px;">
              Thank you for shopping with us, ${firstNameVal}! Your order has been placed and will be processed soon.
            </p>
            <a href="../index.html" class="submit-btn" style="text-decoration:none; padding: 12px 35px; border-radius: 25px; font-weight:700; display: inline-block;">
              Return to Home
            </a>
          </div>
        `;
      }
    });
  }
});

// ── Newsletter Form Handler ───────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        emailInput.value = '';
        showNewsletterSuccess(form);
      }
    });
  });
});

function showNewsletterSuccess(form) {
  let msg = form.querySelector('.newsletter-success');
  if (!msg) {
    msg = document.createElement('p');
    msg.className = 'newsletter-success';
    msg.style.cssText = 'color:#a0f0a0; margin-top:8px; font-size:14px;';
    form.appendChild(msg);
  }
  msg.textContent = '✓ Thank you for subscribing!';
  setTimeout(() => { if (msg) msg.remove(); }, 4000);
}

// ── User Session & Profile Dropdown ──────────────────────────────────────────
(function initUserStatus() {
  document.addEventListener('DOMContentLoaded', () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    let userData = null;
    try {
      userData = JSON.parse(userStr);
    } catch(e) {
      return;
    }

    if (!userData || !userData.name) return;

    const loginLink = document.querySelector('.navbar .navbardiv ul li a[href*="login.html"]');
    if (!loginLink) return;

    const liParent = loginLink.parentElement;
    liParent.className = 'user-profile-menu';

    function resolvePath(filename) {
      const isSubpage = window.location.pathname.includes('/pages/');
      return isSubpage ? filename : `pages/${filename}`;
    }

    liParent.innerHTML = `
      <span class="user-profile-trigger" id="profile-dropdown-trigger">
        <img src="${userData.picture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}" alt="${userData.name}">
        <span class="user-name">${userData.name.split(' ')[0]}</span>
        <i class="fa-solid fa-caret-down" style="font-size:12px;"></i>
      </span>
      <div class="user-dropdown" id="profile-dropdown">
        <div class="user-dropdown-header">
          <div class="user-dropdown-name">Hello ${userData.name.split(' ')[0]}</div>
          <div class="user-dropdown-phone">${userData.phone || '7850078064'}</div>
        </div>
        <div class="user-dropdown-section">
          <a href="#">Orders</a>
          <a href="#">Wishlist</a>
          <a href="#">Gift Cards</a>
          <a href="${resolvePath('contact.html')}">Contact Us</a>
          <a href="#">DAILYCORE Insider <span class="insider-badge">New</span></a>
        </div>
        <div class="user-dropdown-section">
          <a href="#">DAILYCORE Credit</a>
          <a href="#">Coupons</a>
          <a href="#">Saved Cards</a>
          <a href="#">Saved VPA</a>
          <a href="#">Saved Addresses</a>
        </div>
        <div class="user-dropdown-section">
          <a href="#">Edit Profile</a>
          <a href="#" class="logout-btn" id="nav-logout-btn">Logout</a>
        </div>
      </div>
    `;

    const trigger = liParent.querySelector('#profile-dropdown-trigger');
    const dropdown = liParent.querySelector('#profile-dropdown');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const logoutBtn = liParent.querySelector('#nav-logout-btn');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
    });
  });
})();

// ── Wishlist Module ───────────────────────────────────────────────────────────
(function initWishlistModule() {
  const WISHLIST_KEY = 'dailycore_wishlist';

  function getWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  }

  function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }

  function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    let msgText = '';
    
    if (index === -1) {
      wishlist.push(productId);
      msgText = '✓ Added to wishlist';
    } else {
      wishlist.splice(index, 1);
      msgText = 'Removed from wishlist';
    }
    
    saveWishlist(wishlist);
    updateWishlistIcons(productId);
    showWishlistNotification(msgText);
  }

  function updateWishlistIcons(productId) {
    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(productId);
    
    document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`).forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (isWishlisted) {
          icon.className = 'fa-solid fa-heart';
          btn.classList.add('active');
        } else {
          icon.className = 'fa-regular fa-heart';
          btn.classList.remove('active');
        }
      }
    });
  }

  function initWishlistButtons() {
    const wishlist = getWishlist();
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const id = btn.getAttribute('data-id');
      const icon = btn.querySelector('i');
      if (id && icon) {
        if (wishlist.includes(id)) {
          icon.className = 'fa-solid fa-heart';
          btn.classList.add('active');
        } else {
          icon.className = 'fa-regular fa-heart';
          btn.classList.remove('active');
        }
      }
      
      if (!btn.dataset.listened) {
        btn.dataset.listened = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(id);
        });
      }
    });
  }

  function showWishlistNotification(text) {
    let toast = document.getElementById('wishlist-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wishlist-toast';
      toast.style.cssText = `
        position: fixed; bottom: 30px; left: 30px; z-index: 99999;
        background: var(--clr-brand); color: white; padding: 14px 22px;
        border-radius: 12px; font-size: 15px; font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,.3);
        transform: translateY(100px); opacity: 0;
        transition: all .35s cubic-bezier(.34,1.56,.64,1);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    clearTimeout(window._wishlistToastTimer);
    window._wishlistToastTimer = setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 2800);
  }

  // Hook into DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initWishlistButtons();
  });

  window.Wishlist = {
    getWishlist,
    toggleWishlist,
    initWishlistButtons,
    updateWishlistIcons
  };
})();

// ── Dynamic Mobile Navbar drawer injection ──────────────────────────────────
(function initMobileNavbar() {
  document.addEventListener('DOMContentLoaded', () => {
    const navbarDiv = document.querySelector('.navbar .navbardiv');
    if (!navbarDiv) return;

    // Create Hamburger Button
    const hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    // Clone the links from the original ul
    const originalUl = navbarDiv.querySelector('ul');
    if (originalUl) {
      const clonedUl = originalUl.cloneNode(true);
      mobileMenu.appendChild(clonedUl);
    }

    // Append to body and navbarDiv
    navbarDiv.appendChild(hamburger);
    document.body.appendChild(mobileMenu);

    // Toggle menu
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  });
})();

