/* ============================================================
   main.js — Freelance UI Motion Designer
   Full theme system: Dark Mode + RTL + all micro-interactions
   ============================================================ */

(function() {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     THEME INIT — runs immediately so there's no flash
  ═══════════════════════════════════════════════════════════ */
  (function initTheme() {
    const theme = localStorage.getItem('md-theme');
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    const dir = localStorage.getItem('md-dir');
    if (dir === 'rtl') {
      const off = document.querySelector('.offcanvas');
      if (off) off.style.transition = 'none';
      document.documentElement.setAttribute('dir', 'rtl');
      if (off) {
        void off.offsetHeight; // force reflow
        off.style.transition = '';
      }
    }
  })();

  /* ═══════════════════════════════════════════════════════════
     DARK MODE TOGGLE — all buttons with class dm-toggle-btn
  ═══════════════════════════════════════════════════════════ */
  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
  function applyDarkLabel() {
    document.querySelectorAll('.dm-toggle-btn').forEach(btn => {
      btn.innerHTML = isDark() ? '☀' : '◑';
    });
  }
  function toggleDark() {
    if (isDark()) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('md-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('md-theme', 'dark');
    }
    applyDarkLabel();
  }
  document.querySelectorAll('.dm-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleDark);
  });
  applyDarkLabel();

  /* ═══════════════════════════════════════════════════════════
     RTL TOGGLE — all buttons with class rtl-toggle-btn
  ═══════════════════════════════════════════════════════════ */
  function isRTL() {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }
  function applyRTLLabel() {
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.innerHTML = '⇄';
    });
  }
  function toggleRTL() {
    const off = document.querySelector('.offcanvas');
    if (off) off.style.transition = 'none';
    
    if (isRTL()) {
      document.documentElement.setAttribute('dir', 'ltr');
      localStorage.setItem('md-dir', 'ltr');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      localStorage.setItem('md-dir', 'rtl');
    }
    applyRTLLabel();
    
    if (off) {
      void off.offsetHeight; // force reflow
      off.style.transition = '';
    }
  }
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleRTL);
  });
  applyRTLLabel();

  /* ═══════════════════════════════════════════════════════════
     HAMBURGER / OFFCANVAS
  ═══════════════════════════════════════════════════════════ */
  const hamburger = document.querySelector('.hamburger');
  const offcanvas = document.querySelector('.offcanvas');
  const overlay   = document.querySelector('.offcanvas-overlay');

  function openMenu() {
    if (!hamburger || !offcanvas) return;
    hamburger.classList.add('active');
    offcanvas.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!hamburger || !offcanvas) return;
    hamburger.classList.remove('active');
    offcanvas.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('active') ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);
  const closeBtn = document.querySelector('.close-menu-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);


  /* ═══════════════════════════════════════════════════════════
     NAVBAR SCROLL SHADOW
  ═══════════════════════════════════════════════════════════ */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ═══════════════════════════════════════════════════════════
     ACTIVE NAV LINK
  ═══════════════════════════════════════════════════════════ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .offcanvas-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL
  ═══════════════════════════════════════════════════════════ */
  function reveal() {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) {
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();

  /* ═══════════════════════════════════════════════════════════
     CURSOR GLOW (desktop only)
  ═══════════════════════════════════════════════════════════ */
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.innerWidth > 1024) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animateGlow() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      requestAnimationFrame(animateGlow);
    })();
  }

  /* ═══════════════════════════════════════════════════════════
     CURSOR MAGNETISM on buttons
  ═══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.15}px, ${dy * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ═══════════════════════════════════════════════════════════
     ANIMATED COUNTER
  ═══════════════════════════════════════════════════════════ */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const isFloat  = String(el.dataset.target).includes('.');
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1600;
    const start    = performance.now();
    (function step(now) {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val  = target * ease;
      el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* ═══════════════════════════════════════════════════════════
     BEFORE / AFTER SLIDER
  ═══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.ba-wrapper').forEach(wrapper => {
    const handle    = wrapper.querySelector('.ba-handle');
    const afterWrap = wrapper.querySelector('.ba-after-wrap');
    if (!handle || !afterWrap) return;
    let dragging = false;
    function setPos(x) {
      const r   = wrapper.getBoundingClientRect();
      const pct = Math.min(Math.max((x - r.left) / r.width, 0.05), 0.95);
      handle.style.left        = (pct * 100) + '%';
      afterWrap.style.width    = (pct * 100) + '%';
    }
    // init at 50%
    handle.style.left     = '50%';
    afterWrap.style.width = '50%';

    handle.addEventListener('mousedown',  () => dragging = true);
    handle.addEventListener('touchstart', () => dragging = true, { passive: true });
    window.addEventListener('mouseup',  () => dragging = false);
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
    window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  });

  /* ═══════════════════════════════════════════════════════════
     PARALLAX HERO CARDS
  ═══════════════════════════════════════════════════════════ */
  const heroCards = document.querySelectorAll('[data-parallax]');
  if (heroCards.length && window.innerWidth > 1024) {
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      heroCards.forEach(card => {
        const s = parseFloat(card.dataset.parallax) || 10;
        card.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     CARD TILT
  ═══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.card-tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ═══════════════════════════════════════════════════════════
     FILTER PILLS (portfolio)
  ═══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

})();


// --- BACK TO TOP BUTTON ---
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════
   SET ACTIVE NAV LINK
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Set for offcanvas links
  const offcanvasLinks = document.querySelectorAll('.offcanvas-links a');
  offcanvasLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Set for desktop nav links (optional but good practice)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
