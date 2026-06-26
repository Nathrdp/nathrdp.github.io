// ===== Portfólio — interações =====
(function () {
  'use strict';

  const header = document.querySelector('.topbar');
  const navToggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  const links = menu ? Array.from(menu.querySelectorAll('a')) : [];

  /* --- Header opaco ao rolar --- */
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menu hambúrguer (mobile) --- */
  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  };

  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      const icon = navToggle.querySelector('i');
      if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Fecha ao clicar num link
    links.forEach((link) => link.addEventListener('click', closeMenu));
  }

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* --- Scrollspy: link ativo conforme a seção visível --- */
  const sections = links
    .map((link) => {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          links.forEach((link) =>
            link.classList.toggle('active', link.getAttribute('href') === id)
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((sec) => spy.observe(sec));
  }
})();
