/* =====================================================
   CONSUL Portfolio – JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     カスタムカーソル
     ------------------------------------------------- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // follower は RAF でラグをつける
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // ホバー時のエフェクト
    const hoverTargets = 'a, button, .service-row, .work-card, .filter-btn, .voice-dot, .faq-question, .skill-tag';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* -------------------------------------------------
     ヘッダー スクロール
     ------------------------------------------------- */
  const header = document.getElementById('header');
  /* -------------------------------------------------
     ナビ アクティブ
     ------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------
     スムーズスクロール
     ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* -------------------------------------------------
     ハンバーガー / モバイルメニュー
     ------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu?.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* -------------------------------------------------
     スクロールリビール
     ------------------------------------------------- */
  // リビール対象クラスを付与
  const revealTargets = [
    { sel: '.about-card',       delay: [1,2] },
    { sel: '.service-row',      delay: [1,2,3,4,5] },
    { sel: '.work-card',        delay: [1,2,3,4,5,6] },
    { sel: '.process-step',     delay: [1,2,3,4] },
    { sel: '.faq-item',         delay: [1,2,3,4,5] },
    { sel: '.section-header',   delay: [1] },
    { sel: '.about-inner',      delay: [1] },
    { sel: '.faq-inner',        delay: [1] },
    { sel: '.contact-inner',    delay: [1] },
    { sel: '.about-left',       delay: [1] },
    { sel: '.about-right',      delay: [2] },
    { sel: '.contact-left',     delay: [1] },
    { sel: '.contact-right',    delay: [2] },
  ];

  const allReveal = [];

  revealTargets.forEach(({ sel, delay }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        const d = delay[i % delay.length];
        if (d) el.classList.add(`reveal-d${d}`);
        allReveal.push(el);
      }
    });
  });

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  allReveal.forEach(el => revealObs.observe(el));

  /* -------------------------------------------------
     Works フィルター
     ------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.5s ease both';
          setTimeout(() => card.style.animation = '', 500);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });



  /* -------------------------------------------------
     FAQ アコーディオン
     ------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('active');

      // 他を閉じる
      document.querySelectorAll('.faq-item.active').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-answer').classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('active', !isOpen);
      answer.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });



  /* -------------------------------------------------
     数値カウントアップ
     ------------------------------------------------- */
  document.querySelectorAll('.pstat-num').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const raw = el.textContent;
        const numMatch = raw.match(/[\d.]+/);
        if (!numMatch) return;
        const target = parseFloat(numMatch[0]);
        const small  = el.querySelector('small');
        const suffix = small ? small.textContent : '';
        const start  = performance.now();
        const dur    = 1400;

        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = Math.floor(eased * target);
          el.childNodes[0].textContent = val;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* -------------------------------------------------
     ヒーロー グリッド パララックス
     ------------------------------------------------- */
  const heroBg = document.querySelector('.hero-bg-grid');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.3;
      heroBg.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

  /* -------------------------------------------------
     LINE追従バナー
     スクロール300px以上で表示、×ボタンで閉じる（セッション中は非表示）
     ------------------------------------------------- */
  const lineBanner = document.getElementById('lineStickyBanner');
  const lineBannerClose = document.getElementById('lineBannerClose');

  if (lineBanner) {
    const dismissed = sessionStorage.getItem('lineBannerDismissed');
    if (!dismissed) {
      const showBanner = () => {
        if (window.scrollY > 300) {
          lineBanner.classList.add('is-visible');
        } else {
          lineBanner.classList.remove('is-visible');
        }
      };
      window.addEventListener('scroll', showBanner, { passive: true });
    }

    if (lineBannerClose) {
      lineBannerClose.addEventListener('click', () => {
        lineBanner.classList.remove('is-visible');
        sessionStorage.setItem('lineBannerDismissed', '1');
        window.removeEventListener('scroll', () => {});
      });
    }
  }

});
