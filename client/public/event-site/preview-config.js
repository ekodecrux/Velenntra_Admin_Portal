(() => {
  const apply = () => {
    try {
      const eventId = new URLSearchParams(window.location.search).get('event') || 'global';
      const raw = sessionStorage.getItem(`velentra-site-config-${eventId}`) || localStorage.getItem(`velentra-site-config-${eventId}`) || sessionStorage.getItem('velentra-site-config-global') || localStorage.getItem('velentra-site-config-global');
      const sectionRaw = sessionStorage.getItem(`velentra-section-content-${eventId}`) || localStorage.getItem(`velentra-section-content-${eventId}`);
      const sectionValues = sectionRaw ? JSON.parse(sectionRaw) : {};
      const values = { ...(sectionValues.header || {}), ...(sectionValues.hero || {}), ...(sectionValues.about || {}), ...(sectionValues.footer || {}), ...(raw ? JSON.parse(raw) : {}) };
      const heading = document.querySelector('.top-header h1');
      const subtitle = document.querySelector('.top-header h4');
      const logo = document.querySelector('.top-logo');
      const banner = document.querySelector('.owl-bg-img img');
      const topHeader = document.querySelector('.top-header');
      const header = document.querySelector('#header');
      const flashBar = document.querySelector('.flash-bar');
      if (values['Website title'] && heading) heading.textContent = values['Website title'];
      if (values['Hero subtitle'] && subtitle) subtitle.textContent = values['Hero subtitle'];
      if (values['Header logo URL'] && logo) logo.src = values['Header logo URL'];
      if (values['Hero banner URL'] && banner) banner.src = values['Hero banner URL'];
      if (values['Primary color']) {
        if (topHeader) topHeader.style.backgroundColor = values['Primary color'];
        if (header) header.style.backgroundColor = values['Primary color'];
      }
      if (values['Accent color'] && flashBar) flashBar.style.backgroundColor = values['Accent color'];
      if (values.topText && flashBar) flashBar.textContent = values.topText;
      if (values.backgroundColor && topHeader) topHeader.style.backgroundColor = values.backgroundColor;
      if (values.logoUrl && logo) logo.src = values.logoUrl;
      if (values.title && heading) heading.textContent = values.title;
      if (values.subtitle && subtitle) subtitle.textContent = values.subtitle;
      if (values.imageUrl && banner) banner.src = values.imageUrl;
    } catch (_) {
      // Preview content is optional and should never block the imported site.
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
