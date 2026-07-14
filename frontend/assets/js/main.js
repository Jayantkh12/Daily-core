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
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active-link');
    }
  });
})();

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
    liParent.innerHTML = `
      <span class="user-profile-trigger" id="profile-dropdown-trigger">
        <img src="${userData.picture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}" alt="${userData.name}">
        <span class="user-name">${userData.name.split(' ')[0]}</span>
        <i class="fa-solid fa-caret-down" style="font-size:12px;"></i>
      </span>
      <div class="user-dropdown" id="profile-dropdown">
        <div class="user-dropdown-header">${userData.email}</div>
        <a href="#" class="logout-btn" id="nav-logout-btn">
          <i class="fa-solid fa-right-from-bracket" style="margin-right:8px;"></i>Logout
        </a>
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

