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
