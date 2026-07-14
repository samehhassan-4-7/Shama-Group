(() => {
  const body = document.body;
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const header = document.querySelector('.site-header');
  const topButton = document.querySelector('.back-to-top');
  const languageButton = document.querySelector('.language-toggle');

  window.addEventListener('load', () => window.setTimeout(() => body.classList.remove('is-loading'), 350));
  document.querySelectorAll('[data-current-year]').forEach((item) => { item.textContent = new Date().getFullYear(); });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }

  const updateScrollUI = () => {
    const isScrolled = window.scrollY > 25;
    header?.classList.toggle('scrolled', isScrolled);
    topButton?.classList.toggle('is-visible', window.scrollY > 520);
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    revealItems.forEach((item) => observer.observe(item));
  } else { revealItems.forEach((item) => item.classList.add('is-visible')); }

  if (languageButton) {
    const originals = new Map();
    document.querySelectorAll('[data-en]').forEach((item) => originals.set(item, item.innerHTML));
    languageButton.addEventListener('click', () => {
      const english = body.getAttribute('lang') !== 'en';
      body.setAttribute('lang', english ? 'en' : 'ar');
      document.documentElement.setAttribute('lang', english ? 'en' : 'ar');
      document.documentElement.setAttribute('dir', english ? 'ltr' : 'rtl');
      languageButton.textContent = english ? 'AR' : 'EN';
      document.querySelectorAll('[data-en]').forEach((item) => { item.innerHTML = english ? item.dataset.en : originals.get(item); });
    });
  }

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
      document.querySelectorAll('.product-card').forEach((card) => { card.hidden = !(filter === 'all' || card.dataset.category === filter); });
    });
  });

  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) status.textContent = body.getAttribute('lang') === 'en' ? 'Thanks — our team will contact you shortly.' : 'شكرًا لك، سيتواصل معك فريق شامة قريبًا.';
      form.reset();
    });
  });
})();
