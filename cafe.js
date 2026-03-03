/* ============================================================
   cafe.js — KUWA CAFE インタラクション
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header: scroll ---- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- Hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Hero BG: zoom on load ---- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  /* ---- Menu Tabs ---- */
  const tabs     = document.querySelectorAll('.menu-tab');
  const contents = document.querySelectorAll('.menu-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ---- Scroll Reveal ---- */
  const revealTargets = document.querySelectorAll(
    '.section-en, .section-heading, .concept-body, .concept-data-row, ' +
    '.menu-item, .gallery-item, .info-row, .btn-gold'
  );
  revealTargets.forEach(el => el.classList.add('js-reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));

  /* ---- Stagger children ---- */
  document.querySelectorAll('.menu-list .menu-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll('.gallery-grid .gallery-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight : 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
});
