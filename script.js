/* =========================================================
   Neto POS — landing interactions (Apple-style)
   ========================================================= */

(function () {
  'use strict';

  /* ----- Reveal on scroll ----- */
  const revealTargets = [
    '.hero-eyebrow',
    '.hero-title',
    '.hero-tagline',
    '.hero-price',
    '.hero-actions',
    '.hero-product',
    '.band-eyebrow',
    '.band-title',
    '.band-sub',
    '.band .link',
    '.band-visual',
    '.split-col',
    '.price-card',
    '.cta-title',
    '.cta-sub',
    '.cta-final .link',
    '.role',
    '.inv-card',
  ];
  const elements = document.querySelectorAll(revealTargets.join(', '));
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min((i % 8) * 60, 360)}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el) => io.observe(el));
  } else {
    elements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ----- Smooth anchor scroll con offset del nav sticky ----- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ----- Sombra del nav al hacer scroll ----- */
  const nav = document.querySelector('.nav');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      if (y > 8) {
        nav.style.boxShadow = '0 1px 0 rgba(0,0,0,0.06)';
      } else {
        nav.style.boxShadow = 'none';
      }
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Tilt sutil del laptop en el hero (solo desktop con pointer fino) ----- */
  const laptop = document.querySelector('.laptop');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (laptop && canHover) {
    const hero = document.querySelector('.hero-product');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        laptop.style.animation = 'none';
        laptop.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateZ(0)`;
      });
      hero.addEventListener('mouseleave', () => {
        laptop.style.transform = '';
        laptop.style.animation = '';
      });
    }
  }
})();
