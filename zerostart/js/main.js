/* ============================================================
   main.js — zero start
   ============================================================ */

(function () {
  'use strict';

  /* ----- Nav: scroll shadow ----- */
  const gn = document.getElementById('gn');
  function onScroll() {
    if (window.scrollY > 10) {
      gn.style.boxShadow = '0 2px 16px rgba(0,0,0,.08)';
    } else {
      gn.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Hamburger / Drawer ----- */
  const menuBtn = document.getElementById('menuBtn');
  const drawer  = document.getElementById('drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer on anchor link click
    drawer.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- FAQ accordion ----- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item    = btn.closest('.faq-item');
      const answer  = item.querySelector('.faq-a');
      const isOpen  = answer.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-a.open').forEach(function (el) {
        el.classList.remove('open');
        el.previousElementSibling.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        answer.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----- Fixed CTA ----- */
  const fixedCta = document.getElementById('fixedCta');
  const hero     = document.querySelector('.hero');

  if (fixedCta && hero) {
    const heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          fixedCta.classList.add('show');
        } else {
          fixedCta.classList.remove('show');
        }
      });
    }, { threshold: 0.2 });

    heroObserver.observe(hero);
  }

  /* ----- Scroll reveal ----- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add reveal class to key elements
  [
    '.stats__item',
    '.concept-col',
    '.service-item',
    '.flow-item',
    '.case-card',
    '.plan',
    '.section__head',
    '.cmp-wrap',
  ].forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.05) + 's';
      revealObserver.observe(el);
    });
  });

  /* ----- Smooth scroll for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
