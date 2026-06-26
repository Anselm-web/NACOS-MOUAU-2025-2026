/* NACOS MOUAU — main.js */

// ── Dark mode toggle ──
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  toggleBtn?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      try { localStorage.setItem('nacos-theme', 'light'); } catch (e) {}
    } else {
      root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('nacos-theme', 'dark'); } catch (e) {}
    }
  });
})();

// ── Preloader ──
(function () {
  const pre = document.getElementById('sitePreloader');
  if (!pre) return;
  document.body.classList.add('is-loading');
  let hidden = false;
  function hidePreloader() {
    if (hidden) return;
    hidden = true;
    pre.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    setTimeout(() => pre.remove(), 600);
  }
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 250);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 250));
  }
  // Safety net — never let the preloader block the site for long
  setTimeout(hidePreloader, 4000);
})();

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Hamburger toggle
const burger   = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  const [s1, s2, s3] = burger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'translateY(7px) rotate(45deg)';
    s2.style.opacity   = '0';
    s3.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    s1.style.transform = s3.style.transform = '';
    s2.style.opacity = '';
  }
});
navLinks?.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  if (burger) {
    burger.setAttribute('aria-expanded', false);
    const [s1,s2,s3] = burger.querySelectorAll('span');
    s1.style.transform = s3.style.transform = ''; s2.style.opacity = '';
  }
}));

// ── Smooth scroll-reveal (IntersectionObserver) ──
const scrollRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      scrollRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add scroll-reveal to key sections
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.card, .stat-box, .speaker-card, .sec-label, .about-text, ' +
    '.prec-left, .vision-card, .hl-header, .achievement-card, ' +
    '.portrait-video-box, .featured-video-box, .profile-layout'
  );
  targets.forEach((el, i) => {
    el.classList.add('scroll-reveal');
    el.style.transitionDelay = Math.min(i * 0.06, 0.4) + 's';
    scrollRevealObserver.observe(el);
  });
}

// Run after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

// Legacy card reveal fallback
const revealCards = () => {
  document.querySelectorAll('.card').forEach(c => {
    if (c.getBoundingClientRect().top < window.innerHeight - 60) c.classList.add('in');
  });
};
window.addEventListener('scroll', revealCards, { passive: true });
window.addEventListener('load',   revealCards);
