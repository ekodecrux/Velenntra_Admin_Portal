(() => {
  const apply = () => {
    try {
      const eventId = new URLSearchParams(window.location.search).get('event') || 'global';
      const raw = sessionStorage.getItem(`velentra-site-config-${eventId}`) || localStorage.getItem(`velentra-site-config-${eventId}`) || sessionStorage.getItem('velentra-site-config-global') || localStorage.getItem('velentra-site-config-global');
      const sectionRaw = sessionStorage.getItem(`velentra-section-content-${eventId}`) || localStorage.getItem(`velentra-section-content-${eventId}`);
      const sectionValues = sectionRaw ? JSON.parse(sectionRaw) : {};
      const values = { ...(sectionValues.header || {}), ...(sectionValues['header-section'] || {}), ...(sectionValues.hero || {}), ...(sectionValues.about || {}), ...(sectionValues.footer || {}), ...(sectionValues['footer-section'] || {}), ...(sectionValues['theme-settings'] || {}), ...(sectionValues['conference-credits'] || {}), ...(raw ? JSON.parse(raw) : {}) };
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
      if (values.conferenceLogoUrl && logo) logo.src = values.conferenceLogoUrl;
      if (values.title && heading) heading.textContent = values.title;
      if (values.heading && heading) heading.textContent = values.heading;
      if (values.subtitle && subtitle) subtitle.textContent = values.subtitle;
      if (values.imageUrl && banner) banner.src = values.imageUrl;
      if (values.themeBannerUrl && banner) banner.src = values.themeBannerUrl;
      if (values.themeColor) {
        if (topHeader) topHeader.style.backgroundColor = values.themeColor;
        if (header) header.style.backgroundColor = values.themeColor;
      }
      if (values.accentColor && flashBar) flashBar.style.backgroundColor = values.accentColor;
      const footerAddress = document.querySelector('.footer-address, footer address, footer .address');
      if (values.footerAddress && footerAddress) footerAddress.innerHTML = values.footerAddress;
      const sessionsRaw = sessionStorage.getItem(`velentra-conference-sessions-${eventId}`) || localStorage.getItem(`velentra-conference-sessions-${eventId}`);
      const sessions = sessionsRaw ? JSON.parse(sessionsRaw).filter(item => item.status !== 'Hidden') : [];
      const schedule = document.querySelector('#schedule');
      const scheduleTabs = schedule?.querySelector('.tabs-content');
      if (schedule && scheduleTabs && sessions.length) {
        const groups = [...new Set(sessions.map(item => `${item.day || 'Day 1'}|${item.date || ''}`))];
        const navigation = schedule.querySelector('.tabs-navigation');
        if (navigation) { navigation.innerHTML = groups.map((group, index) => { const [day, date] = group.split('|'); return `<li class="${index === 0 ? 'active' : ''}"><a href="#velentra-event-${index + 1}">${day}<br><span>${date}</span></a></li>`; }).join(''); }
        scheduleTabs.innerHTML = groups.map((group, index) => { const [day] = group.split('|'); const rows = sessions.filter(item => `${item.day || 'Day 1'}|${item.date || ''}` === group); return `<div class="tab-pane ${index === 0 ? 'active' : ''}" id="velentra-event-${index + 1}">${rows.map(item => `<div class="row schedule-item"><div class="col-md-3 col-sm-6 col-xs-12"><div>${item.time || ''}</div></div><div class="col-md-9 col-sm-6 col-xs-12"><h4>${item.title || ''}</h4><small>${item.venue || ''}${item.speaker ? ` · ${item.speaker}` : ''}</small></div></div>`).join('')}</div>`; }).join('');
      }
      const galleryRaw = sessionStorage.getItem(`velentra-gallery-${eventId}`) || localStorage.getItem(`velentra-gallery-${eventId}`);
      const galleryRows = galleryRaw ? JSON.parse(galleryRaw).filter(item => item.status !== 'Hidden') : [];
      const galleryStage = document.querySelector('#slider .owl-stage');
      if (galleryStage && galleryRows.length) {
        galleryStage.innerHTML = '';
        galleryRows.forEach(item => {
          const outer = document.createElement('div'); outer.className = 'owl-item active static-visible';
          const box = document.createElement('div'); box.className = 'photoGalleryBox';
          const link = document.createElement('a'); link.href = item.url || '#'; link.target = '_blank'; link.rel = 'noreferrer'; link.title = item.title || 'Past conference gallery';
          if (item.image) { const image = document.createElement('img'); image.src = item.image; image.alt = item.title || 'Past conference'; link.appendChild(image); }
          const title = document.createElement('h3'); title.textContent = item.title || ''; link.appendChild(title); box.appendChild(link); outer.appendChild(box); galleryStage.appendChild(outer);
        });
        window.velentraShowGallery?.();
      }
      const testimonialsRaw = sessionStorage.getItem(`velentra-testimonials-${eventId}`) || localStorage.getItem(`velentra-testimonials-${eventId}`);
      const testimonials = testimonialsRaw ? JSON.parse(testimonialsRaw).filter(item => item.status === 'Active' && item.position !== 'Hidden').sort((a, b) => { const rank = value => value === 'First' ? -1 : value === 'Middle' ? 500 : value === 'Last' ? 999 : Number(value) || 0; return rank(a.position) - rank(b.position); }) : [];
      const testimonialStage = document.querySelector('.testimonial .owl-stage');
      if (testimonialStage && testimonials.length) {
        testimonialStage.innerHTML = '';
        testimonials.forEach(item => {
          const outer = document.createElement('div'); outer.className = 'owl-item active static-visible';
          const card = document.createElement('div'); card.className = 'testimonial-item';
          if (item.image) { const image = document.createElement('img'); image.src = item.image; image.alt = item.name || 'Testimonial'; card.appendChild(image); }
          const quote = document.createElement('div'); const paragraph = document.createElement('p'); paragraph.textContent = item.comment || ''; quote.appendChild(paragraph); card.appendChild(quote);
          const name = document.createElement('span'); name.textContent = item.name || ''; card.appendChild(name);
          const designation = document.createElement('span'); designation.textContent = item.designation || ''; card.appendChild(designation);
          outer.appendChild(card); testimonialStage.appendChild(outer);
        });
        window.velentraShowTestimonials?.();
      }
    } catch (_) {
      // Preview content is optional and should never block the imported site.
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.addEventListener('storage', event => { if (event.key && (event.key.includes('velentra-testimonials-') || event.key.includes('velentra-conference-sessions-') || event.key.includes('velentra-gallery-'))) apply(); });
})();
