(() => {
  const style = document.createElement('style');
  style.textContent = `
    .carousel .owl-stage-outer,
    .carousel .owl-stage,
    .carousel .owl-bg-img { height: auto !important; }
    .carousel .owl-stage-outer { overflow: hidden !important; }
    .carousel .owl-stage { display: flex !important; transform: none !important; width: 100% !important; transition: none !important; align-items: stretch !important; }
    .carousel .owl-item { display: none !important; width: auto !important; height: auto !important; }
    .carousel .owl-item.static-visible { display: block !important; }
    .carousel[data-items="1"] .owl-item.static-visible { flex: 0 0 100% !important; margin-right: 0 !important; }
    .carousel[data-items="3"] .owl-item.static-visible { flex: 0 0 calc((100% - 40px) / 3) !important; margin-right: 20px !important; }
    .carousel[data-items="3"]:not([data-margin]) .owl-item.static-visible { flex-basis: calc(100% / 3) !important; margin-right: 0 !important; }
    .carousel .owl-item.static-visible:last-child { margin-right: 0 !important; }
    .carousel .owl-bg-img img { display: block !important; width: 100% !important; height: auto !important; opacity: 1 !important; visibility: visible !important; }
    #header, #header-wrap { height: 45px !important; min-height: 45px !important; }
    @media (max-width: 980px) and (min-width: 601px) {
      .carousel[data-items="3"] .owl-item.static-visible { flex-basis: calc((100% - 20px) / 2) !important; }
    }
    @media (max-width: 600px) {
      .carousel[data-items="3"] .owl-item.static-visible { flex-basis: 100% !important; margin-right: 0 !important; }
    }
  `;
  document.head.appendChild(style);

  const setStaticCarouselItems = () => {
    document.querySelectorAll('.carousel.owl-carousel').forEach((carousel) => {
      const requested = Number(carousel.dataset.items || 1);
      const visibleCount = requested === 1 ? 1 : window.innerWidth <= 600 ? 1 : window.innerWidth <= 980 ? 2 : requested;
      const stage = carousel.querySelector('.owl-stage');
      if (!stage) return;
      const items = [...stage.children].filter((item) => !item.classList.contains('cloned'));
      stage.querySelectorAll('.owl-item').forEach((item) => item.classList.remove('static-visible'));
      items.slice(0, visibleCount).forEach((item) => item.classList.add('static-visible'));
    });
  };
  setStaticCarouselItems();
  window.addEventListener('resize', setStaticCarouselItems);

  const trigger = document.querySelector('#mainMenu-trigger button');
  const menu = document.querySelector('#mainMenu');
  if (trigger && menu) {
    trigger.setAttribute('aria-label', 'Toggle navigation');
    trigger.addEventListener('click', () => {
      menu.classList.toggle('menu-open');
      trigger.classList.toggle('close');
    });
  }
  document.querySelectorAll('#mainMenu a').forEach((link) => {
    link.addEventListener('click', () => menu?.classList.remove('menu-open'));
  });
})();
