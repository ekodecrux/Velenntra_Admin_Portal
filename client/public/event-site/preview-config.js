(() => {
  const apply = () => {
    try {
      if (!document.getElementById('velentra-video-review-preview-style')) {
        const style = document.createElement('style');
        style.id = 'velentra-video-review-preview-style';
        style.textContent = `
          #slider.velentra-gallery-section { position: relative; }
          #slider.velentra-gallery-section .owl-stage-outer { overflow: hidden !important; width: 100% !important; }
          #slider.velentra-gallery-section .owl-nav, #slider.velentra-gallery-section .owl-dots, #slider.velentra-gallery-section .owl-prev, #slider.velentra-gallery-section .owl-next { display: none !important; }
          #slider.velentra-gallery-section .owl-stage.velentra-gallery-stage { display: flex !important; flex-wrap: nowrap !important; gap: 20px !important; width: 100% !important; max-width: 100% !important; height: auto !important; min-height: 300px !important; position: relative !important; left: auto !important; transition: transform .6s ease; will-change: transform; }
          #slider.velentra-gallery-section .owl-stage-outer { display: block !important; height: auto !important; min-height: 300px !important; }
          #slider.velentra-gallery-section .owl-item.velentra-gallery-card { display: block !important; visibility: visible !important; opacity: 1 !important; position: static !important; flex: 0 0 calc((100% - 40px) / 3) !important; width: calc((100% - 40px) / 3) !important; max-width: calc((100% - 40px) / 3) !important; height: auto !important; margin: 0 !important; box-sizing: border-box !important; }
          #slider.velentra-gallery-section .photoGalleryBox { display: block !important; visibility: visible !important; opacity: 1 !important; height: 100% !important; min-height: 300px; background: #fff !important; overflow: hidden !important; }
          #slider.velentra-gallery-section .photoGalleryBox img { display: block; width: 100%; height: 250px; object-fit: cover; }
          #slider.velentra-gallery-section .photoGalleryBox h3 { min-height: 68px; margin: 0; padding: 16px 14px; color: #fff !important; background: rgba(32,35,64,.9); font-size: 16px; line-height: 1.35; text-align: center; }
          .velentra-gallery-arrow { position: absolute; top: 56%; z-index: 5; width: 46px; height: 46px; border: 2px solid #202340; border-radius: 50%; background: rgba(255,255,255,.94); color: #202340; font-size: 32px; line-height: 36px; cursor: pointer; }
          .velentra-gallery-arrow:hover { background: #202340; color: #fff; }
          .velentra-gallery-prev { left: 12px; }
          .velentra-gallery-next { right: 12px; }
          @media (max-width: 900px) { #slider.velentra-gallery-section .owl-item.velentra-gallery-card { flex-basis: calc((100% - 20px) / 2) !important; width: calc((100% - 20px) / 2) !important; max-width: calc((100% - 20px) / 2) !important; } }
          @media (max-width: 560px) { #slider.velentra-gallery-section .owl-item.velentra-gallery-card { flex-basis: 100% !important; width: 100% !important; max-width: 100% !important; } }
          .banner-arrows .owl-stage-outer, .banner-arrows .owl-stage { height: auto !important; min-height: 240px !important; }
          .banner-arrows .owl-item.active { display: block !important; visibility: visible !important; opacity: 1 !important; height: auto !important; min-height: 240px !important; }
          .banner-arrows .owl-item.active .owl-bg-img, .banner-arrows .owl-item.active img { display: block !important; visibility: visible !important; opacity: 1 !important; }
          .velentra-media-carousel { position: relative; display: flex !important; justify-content: center !important; overflow: hidden; width: 100%; }
          .velentra-media-track { display: flex; justify-content: center; gap: 24px; width: 100%; transition: transform .65s ease; }
          .velentra-media-card { flex: 0 0 calc((100% - 48px) / 3); min-width: 0; text-align: center; }
          .velentra-media-card a { display: block; padding: 12px; background: #fff; border: 1px solid #e5e7eb; }
          .velentra-media-card img { display: block; width: 100%; height: 105px; object-fit: contain; }
          @media (max-width: 700px) { .velentra-media-card { flex-basis: calc((100% - 24px) / 2); } }
          @media (max-width: 480px) { .velentra-media-card { flex-basis: 100%; } }
          #past-conference-video-review, #video-reviews, .past-conference-video-review { height: auto !important; max-height: none !important; overflow: visible !important; background: #ad0b2d !important; padding: 42px 0 48px !important; }
          #past-conference-video-review .container, #video-reviews .container, .past-conference-video-review .container { position: relative; max-width: 1120px; margin: 0 auto; padding: 0 54px; }
          .velentra-video-review-heading { color: #fff !important; text-align: center; margin: 0 0 24px; font-size: 30px; line-height: 1.2; font-weight: 600; }
          .velentra-video-review-viewport { position: relative; width: 100% !important; max-width: 100% !important; overflow: hidden !important; clip-path: inset(0); }
          .velentra-video-review-grid { display: flex !important; flex-wrap: nowrap !important; gap: 20px !important; width: 100% !important; max-width: 100% !important; height: auto !important; overflow: visible !important; transition: transform .6s ease; will-change: transform; }
          .velentra-video-review-card { flex: 0 0 calc((100% - 40px) / 3) !important; width: calc((100% - 40px) / 3) !important; min-width: 0 !important; max-width: calc((100% - 40px) / 3) !important; box-sizing: border-box !important; overflow: hidden; border: 0; border-radius: 0; background: #080808 !important; color: #fff !important; box-shadow: none; }
          .velentra-video-review-media { aspect-ratio: 16/9; min-height: 150px; display: grid; place-items: center; overflow: hidden; background: #050505; }
          .velentra-video-review-media iframe, .velentra-video-review-media video, .velentra-video-review-media img { display: block; width: 100%; height: 100%; min-height: 150px; border: 0; object-fit: cover; }
          .velentra-video-review-link { position: relative; display: block; width: 100%; height: 100%; min-height: 150px; color: #fff; text-decoration: none; }
          .velentra-video-review-link img { transition: transform .2s ease, filter .2s ease; }
          .velentra-video-review-link:hover img { transform: scale(1.03); filter: brightness(.72); }
          .velentra-video-review-play { position: absolute; inset: 50% auto auto 50%; transform: translate(-50%, -50%); display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%; background: #f01f18; color: #fff; font-size: 25px; padding-left: 3px; }
          .velentra-video-review-watch { display: none; }
          .velentra-video-review-card h4 { display: block !important; margin: 0 !important; padding: 17px 10px 18px !important; min-height: 80px; background: #080808 !important; color: #fff !important; font-size: 16px; line-height: 1.35; font-weight: 400; opacity: 1 !important; }
          .velentra-video-review-card p { display: none !important; }
          .velentra-video-review-arrow { position: absolute; top: 50%; z-index: 2; transform: translateY(-50%); width: 48px; height: 48px; border: 2px solid #090909; border-radius: 50%; background: #ad0b2d; color: #fff; font-size: 34px; line-height: 38px; cursor: pointer; }
          .velentra-video-review-arrow:hover { background: #d51b43; }
          .velentra-video-review-prev { left: 0; }
          .velentra-video-review-next { right: 0; }
          @media (max-width: 900px) { .velentra-video-review-card { flex-basis: calc((100% - 20px) / 2) !important; width: calc((100% - 20px) / 2) !important; max-width: calc((100% - 20px) / 2) !important; } }
          @media (max-width: 560px) { .velentra-video-review-card { flex-basis: 100% !important; width: 100% !important; max-width: 100% !important; } }
          .velentra-scientific-detail { margin-top: 22px; padding: 24px; background: #fff; }
          .velentra-scientific-detail h3 { color: #9e1d38; margin: 0 0 12px; }
          .velentra-scientific-detail p { line-height: 1.8; margin: 0 0 18px; }
          .velentra-scientific-detail h4 { color: #202340; margin: 14px 0 10px; }
          .velentra-related-session-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .velentra-related-session-grid a { display: block; padding: 12px; border-radius: 4px; background: #202340; color: #fff; text-decoration: none; }
          .velentra-scientific-detail-back { display: inline-block; margin-top: 18px; padding: 9px 14px; border-radius: 4px; background: #9e1d38; color: #fff; text-decoration: none; }
          @media (max-width: 600px) { .velentra-related-session-grid { grid-template-columns: 1fr; } }
          .velentra-scientific-detail-page { display:block; background:#fff; color:#222; }
          .velentra-detail-titlebar { background:#202020; color:#fff; padding:28px 0 32px; }
          .velentra-detail-title-inner, .velentra-detail-layout { width:78%; max-width:1080px; margin:0 auto; }
          .velentra-detail-title-inner { position:relative; }
          .velentra-detail-titlebar h1 { margin:0; font-size:24px; font-weight:500; }
          .velentra-detail-breadcrumb { position:absolute; right:0; bottom:0; display:flex; gap:10px; color:#bbb; font-size:11px; align-items:center; }
          .velentra-detail-breadcrumb a { color:#ccc; text-decoration:none; }.velentra-detail-breadcrumb strong { color:#a4112b; font-weight:400; max-width:160px; }
          .velentra-detail-layout { display:grid; grid-template-columns:185px 1fr; gap:22px; padding:18px 0 45px; }
          .velentra-detail-sidebar { background:#f4f4f4; padding:12px 0; align-self:start; }.velentra-detail-sidebar a { display:block; color:#222; text-decoration:none; padding:6px 28px; font-size:12px; }.velentra-detail-sidebar a.active { color:#a4112b; font-weight:600; }
          .velentra-detail-main { padding:0; }.velentra-detail-main h2 { color:#a4112b; font-size:17px; margin:0 0 14px; }.velentra-detail-copy { font-size:12px; line-height:1.85; text-align:justify; margin:0 0 10px; }.velentra-detail-main h3 { font-size:17px; color:#222; margin:8px 0 10px; }
          .velentra-related-session-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; }.velentra-related-session-grid a { background:#202340; color:#fff; text-decoration:none; padding:11px 10px; font-size:12px; border-radius:3px; min-height:18px; }
          @media (max-width:700px) { .velentra-detail-title-inner,.velentra-detail-layout { width:92%; }.velentra-detail-breadcrumb { position:static; margin-top:12px; flex-wrap:wrap; }.velentra-detail-layout { grid-template-columns:1fr; }.velentra-detail-sidebar { display:none; }.velentra-related-session-grid { grid-template-columns:1fr; } }
          @media (max-width: 560px) { #past-conference-video-review .container, #video-reviews .container, .past-conference-video-review .container { padding: 0 45px; } .velentra-video-review-heading { font-size: 24px; } }
        `;
        document.head.appendChild(style);
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';
      }
      const eventId = new URLSearchParams(window.location.search).get('event') || 'global';
      if (eventId !== 'global') {
        const registryRaw = localStorage.getItem('velentra-admin-events') || sessionStorage.getItem('velentra-admin-events');
        let eventExists = false;
        try { eventExists = (registryRaw ? JSON.parse(registryRaw) : []).some(item => item?.id === eventId); } catch { eventExists = false; }
        if (!eventExists) {
          document.body.innerHTML = '<main style="min-height:100vh;display:grid;place-items:center;padding:32px;background:#f4f8fc;color:#173b5a;font-family:Arial,sans-serif;text-align:center"><div><h1 style="margin:0 0 10px">Event website unavailable</h1><p style="margin:0">This event has been deleted or is no longer published.</p></div></main>';
          return;
        }
      }
      const scopedConfigKey = `velentra-site-config-${eventId}`;
      const raw = sessionStorage.getItem(scopedConfigKey) || localStorage.getItem(scopedConfigKey) || (eventId === 'global' ? sessionStorage.getItem('velentra-site-config-global') || localStorage.getItem('velentra-site-config-global') : null);
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
      const scientificContent = sectionValues['scientific-sessions'] || {};
      const scientificList = document.querySelector('.sessions-new ul.scientific');
      if (scientificList) {
        const scientificSlug = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const sourceItems = Array.isArray(scientificContent.items) ? scientificContent.items : Array.from(scientificList.querySelectorAll('a')).map(anchor => ({ title: anchor.textContent.trim(), link: anchor.getAttribute('href') || '' }));
        const allScientificItems = sourceItems.filter(item => (item.status || 'Active') !== 'Hidden');
        const visibleScientificItems = allScientificItems.slice().sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))).slice(0, 15);
        scientificList.innerHTML = '';
        visibleScientificItems.forEach(item => {
          const li = document.createElement('li'); const link = document.createElement('a');
          const slug = scientificSlug(item.title);
          link.href = `index.html?scientific-session=${encodeURIComponent(slug)}`;
          link.textContent = item.title || 'Scientific Session'; link.title = item.title || '';
          li.appendChild(link); scientificList.appendChild(li);
        });
        const selectedSlug = new URLSearchParams(window.location.search).get('scientific-session');
        if (selectedSlug) {
          const selected = allScientificItems.find(item => scientificSlug(item.title) === selectedSlug);
          if (selected) {
            const header = document.querySelector('header#header');
            const footer = document.querySelector('footer#footer');
            if (header) {
              let detailPage = document.querySelector('.velentra-scientific-detail-page');
              if (!detailPage) { detailPage = document.createElement('div'); detailPage.className = 'velentra-scientific-detail-page'; header.insertAdjacentElement('afterend', detailPage); }
              let sibling = detailPage.nextElementSibling;
              while (sibling && sibling !== footer) { sibling.style.display = 'none'; sibling = sibling.nextElementSibling; }
              const relatedItems = allScientificItems.filter(item => item.title !== selected.title);
              detailPage.innerHTML = `<section class="velentra-detail-titlebar"><div class="velentra-detail-title-inner"><h1></h1><div class="velentra-detail-breadcrumb"><a href="index.html">Home</a><span>Scientific Sessions</span><strong></strong></div></div></section><div class="velentra-detail-layout"><aside class="velentra-detail-sidebar"><a href="index.html">Home</a><a href="#">Scientific Committee</a><a href="#">Speakers</a><a href="#">Program</a><a class="active" href="index.html">&nbsp;&nbsp;Scientific Sessions</a><a href="#">Information</a><a href="#">&nbsp;&nbsp;Venue</a><a href="#">&nbsp;&nbsp;Accommodation</a><a href="#">&nbsp;&nbsp;Guidelines</a><a href="#">&nbsp;&nbsp;FAQ</a><a href="#">About</a></aside><main class="velentra-detail-main"><h2></h2><p class="velentra-detail-copy"></p><h3>Related Sessions</h3><div class="velentra-related-session-grid"></div></main></div>`;
              detailPage.querySelector('.velentra-detail-title-inner h1').textContent = selected.title || 'Scientific Session';
              detailPage.querySelector('.velentra-detail-breadcrumb strong').textContent = selected.title || '';
              detailPage.querySelector('.velentra-detail-main h2').textContent = selected.title || 'Scientific Session';
              detailPage.querySelector('.velentra-detail-copy').textContent = selected.fullDescription || selected.description || 'Session details will be published soon.';
              const relatedGrid = detailPage.querySelector('.velentra-related-session-grid');
              relatedItems.forEach((item, index) => { const card = document.createElement('a'); card.href = `index.html?scientific-session=${encodeURIComponent(scientificSlug(item.title))}`; card.textContent = `${index + 1}. ${item.title}`; relatedGrid.appendChild(card); });
            }
          }
        }
      }
      const footerAddress = document.querySelector('.footer-address, footer address, footer .address');
      if (values.footerAddress && footerAddress) footerAddress.innerHTML = values.footerAddress;
      const readManagedRecords = (kind) => {
        const listId = kind === 'banner' ? 'banner-images' : 'media-partner';
        const sectionId = kind === 'banner' ? 'hero' : 'media-partner';
        const defaults = kind === 'banner'
          ? [{ title: 'Biofuels Conferences 2027', imageUrl: '/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg', altText: 'Biofuels Conferences 2027', status: 'Published' }]
          : [{ partnerName: 'Conference Alerts', partnerUrl: 'https://www.conferencealerts.in/eventdetail/2855037', partnerLogoUrl: '/event-site/uploads/logos/conference-alerts-8149.png', status: 'Published' }];
        const candidates = [];
        const normalize = value => value?.values ? { ...value.values, title: value.title || value.values.title, status: value.status || value.values.Status } : value?.details ? { ...value.details, title: value.title, status: value.status, isOriginal: value.details.__managedOriginal === 'true' } : value;
        const push = value => { if (!value) return; if (Array.isArray(value)) value.forEach(push); else if (value.items) push(value.items); else candidates.push(normalize(value)); };
        // Banner and media-partner rows are managed independently below; never let a new Add record overwrite the original section record.
        if (!['banner', 'media'].includes(kind)) push(sectionValues[sectionId]);
        try { push(JSON.parse(localStorage.getItem(`velentra-admin-media-${listId}`) || sessionStorage.getItem(`velentra-admin-media-${listId}`) || 'null')); } catch {}
        try {
          const managed = JSON.parse(localStorage.getItem(`velentra-managed-media-${eventId}`) || sessionStorage.getItem(`velentra-managed-media-${eventId}`) || '{}');
          push(managed[listId]);
        } catch {}
        const normalized = [...candidates].map(item => item.values ? item.values : item).filter(item => (item.status || item.displayStatus || 'Published') !== 'Hidden');
        const original = defaults[0];
        const isOriginal = item => kind === 'banner'
          ? item.title === original.title || item.isOriginal === true
          : (item.partnerName || item['Partner name']) === original.partnerName || item.isOriginal === true || item.__managedOriginal === true;
        const managedOriginal = normalized.find(isOriginal);
        const additions = normalized.filter(item => !isOriginal(item) && (kind === 'banner' ? item.title !== original.title : (item.partnerName || item['Partner name']) !== original.partnerName));
        const rows = [managedOriginal || original, ...additions];
        const unique = rows.filter((item, index, list) => index === list.findIndex(other => (kind === 'banner' ? (other.imageUrl || other.Image || other['Image URL'] || other.title) : (other.partnerUrl || other.WebsiteURL || other['Website URL'] || other.partnerName)) === (kind === 'banner' ? (item.imageUrl || item.Image || item['Image URL'] || item.title) : (item.partnerUrl || item.WebsiteURL || item['Website URL'] || item.partnerName))));
        if (kind === 'banner') return unique.map(item => ({ ...item, imageUrl: item.imageUrl || item.Image || item['Image URL'] || item['Image'] || '/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg' }));
        return unique;
      };
      const bannerRecords = readManagedRecords('banner');
      const bannerHost = document.querySelector('.banner-arrows');
      const bannerStage = bannerHost?.querySelector('.owl-stage');
      const bannerPrev = bannerHost?.querySelector('.owl-prev');
      const bannerNext = bannerHost?.querySelector('.owl-next');
      if (bannerHost && bannerStage && bannerRecords.length) {
        bannerStage.innerHTML = '';
        bannerStage.style.width = '100%';
        bannerStage.style.display = 'flex';
        bannerStage.style.visibility = 'visible';
        bannerStage.style.opacity = '1';
        bannerStage.style.height = 'auto';
        const bannerOuter = bannerStage.parentElement; if (bannerOuter) { bannerOuter.style.height = 'auto'; bannerOuter.style.overflow = 'hidden'; }
        const bannerCarousel = bannerHost.querySelector('.owl-carousel'); if (bannerCarousel) bannerCarousel.style.height = 'auto';
        bannerStage.style.transition = 'transform .55s ease';
        bannerStage.style.transform = 'translate3d(0,0,0)';
        bannerRecords.forEach((item, index) => {
          const outer = document.createElement('div'); outer.className = `owl-item ${index === 0 ? 'active' : ''}`; outer.style.setProperty('display', 'block', 'important'); outer.style.setProperty('visibility', 'visible', 'important'); outer.style.setProperty('opacity', '1', 'important'); outer.style.setProperty('flex', '0 0 100%', 'important'); outer.style.setProperty('width', '100%', 'important'); outer.style.marginRight = '0';
          const box = document.createElement('div'); box.className = 'owl-bg-img'; box.style.height = 'auto'; box.style.visibility = 'visible'; box.style.opacity = '1';
          const image = document.createElement('img'); image.className = 'img-responsive'; image.style.display = 'block'; image.style.width = '100%'; image.style.height = 'auto'; image.style.minHeight = '240px'; image.style.objectFit = 'cover'; image.loading = 'eager'; image.src = item.imageUrl || item.Image || item['Image URL'] || item['Image'] || '/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg'; image.alt = item.altText || item['Alt text'] || item.title || 'Conference banner';
          box.appendChild(image); outer.appendChild(box); bannerStage.appendChild(outer);
        });
        const dots = bannerHost.querySelector('.owl-dots');
        if (dots) { dots.innerHTML = bannerRecords.map((_, index) => `<div class="owl-dot ${index === 0 ? 'active' : ''}"><span></span></div>`).join(''); }
        let bannerIndex = 0;
        const moveBanner = direction => {
          bannerIndex += direction; if (bannerIndex >= bannerRecords.length) bannerIndex = 0; if (bannerIndex < 0) bannerIndex = bannerRecords.length - 1;
          bannerStage.style.transform = `translate3d(-${bannerIndex * 100}%,0,0)`;
          bannerStage.querySelectorAll('.owl-item').forEach((item, index) => item.classList.toggle('active', index === bannerIndex));
          dots?.querySelectorAll('.owl-dot').forEach((dot, index) => dot.classList.toggle('active', index === bannerIndex));
        };
        if (bannerRecords.length > 1) { if (bannerPrev) bannerPrev.onclick = event => { event.preventDefault(); moveBanner(-1); }; if (bannerNext) bannerNext.onclick = event => { event.preventDefault(); moveBanner(1); }; }
      }
      const mediaRecords = readManagedRecords('media');
      const mediaHeading = [...document.querySelectorAll('h3')].find(node => /media partner/i.test(node.textContent || ''));
      const mediaSection = mediaHeading?.closest('section');
      const mediaRow = mediaSection?.querySelector('.row');
      if (mediaSection && mediaRow && mediaRecords.length) {
        mediaRow.innerHTML = ''; mediaRow.className = 'velentra-media-carousel';
        const mediaTrack = document.createElement('div'); mediaTrack.className = 'velentra-media-track';
        mediaRecords.forEach(item => { const card = document.createElement('div'); card.className = 'velentra-media-card'; const link = document.createElement('a'); link.href = item.partnerUrl || item.WebsiteURL || item['Website URL'] || '#'; link.target = '_blank'; link.rel = 'noopener noreferrer'; const image = document.createElement('img'); image.src = item.partnerLogoUrl || item.Logo || item['Logo URL'] || ''; image.alt = item.partnerName || item['Partner name'] || 'Media partner'; link.appendChild(image); card.appendChild(link); mediaTrack.appendChild(card); });
        mediaRow.appendChild(mediaTrack);
        if (mediaSection._velentraMediaTimer) clearInterval(mediaSection._velentraMediaTimer);
        let mediaIndex = 0; const moveMedia = () => { const visible = window.innerWidth <= 480 ? 1 : window.innerWidth <= 700 ? 2 : 3; const max = Math.max(0, mediaRecords.length - visible); if (!max) return; mediaIndex = mediaIndex >= max ? 0 : mediaIndex + 1; const card = mediaTrack.querySelector('.velentra-media-card'); const gap = 24; const step = card ? card.getBoundingClientRect().width + gap : 0; mediaTrack.style.transform = `translateX(-${mediaIndex * step}px)`; };
        if (mediaRecords.length > 1) mediaSection._velentraMediaTimer = setInterval(moveMedia, 3200);
      }
      const sessionsRaw = localStorage.getItem(`velentra-conference-sessions-${eventId}`) || sessionStorage.getItem(`velentra-conference-sessions-${eventId}`);
      const sessions = sessionsRaw ? JSON.parse(sessionsRaw).filter(item => item.status !== 'Hidden') : [];
      const sessionStartMinutes = value => { const match = String(value || '').trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i); if (!match) return Number.POSITIVE_INFINITY; let hour = Number(match[1]); const minute = Number(match[2]); if (match[3]) { const period = match[3].toUpperCase(); if (period === 'PM' && hour < 12) hour += 12; if (period === 'AM' && hour === 12) hour = 0; } return hour * 60 + minute; };
      const schedule = document.querySelector('#schedule');
      const scheduleTabs = schedule?.querySelector('.tabs-content');
      if (schedule && scheduleTabs && sessions.length) {
        const groups = [...new Set(sessions.map(item => item.day || 'Day 1'))];
        const navigation = schedule.querySelector('.tabs-navigation');
        if (navigation) {
          navigation.innerHTML = groups.map((day, index) => { const date = sessions.find(item => (item.day || 'Day 1') === day)?.date || ''; return `<li class="${index === 0 ? 'active' : ''}"><a href="#velentra-event-${index + 1}">${day}<br><span>${date}</span></a></li>`; }).join('');
          }
        scheduleTabs.innerHTML = groups.map((day, index) => { const rows = sessions.filter(item => (item.day || 'Day 1') === day).sort((a, b) => sessionStartMinutes(a.time) - sessionStartMinutes(b.time)); return `<div class="tab-pane ${index === 0 ? 'active' : ''}" id="velentra-event-${index + 1}">${rows.map(item => `<div class="row schedule-item"><div class="col-md-3 col-sm-6 col-xs-12"><div class="velentra-schedule-time">${item.time || 'Time to be announced'}</div></div><div class="col-md-9 col-sm-6 col-xs-12"><h4>${item.title || ''}</h4><small>${item.venue || ''}${item.speaker ? ` · ${item.speaker}` : ''}</small></div></div>`).join('')}</div>`; }).join('');
        if (navigation) navigation.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', event => { event.preventDefault(); const target = anchor.getAttribute('href'); if (!target) return; navigation.querySelectorAll('li').forEach(item => item.classList.remove('active')); anchor.closest('li')?.classList.add('active'); scheduleTabs.querySelectorAll('.tab-pane').forEach(pane => pane.classList.toggle('active', `#${pane.id}` === target)); }));
      }
      const galleryRaw = sessionStorage.getItem(`velentra-gallery-${eventId}`) || localStorage.getItem(`velentra-gallery-${eventId}`);
      const galleryRows = galleryRaw ? JSON.parse(galleryRaw).filter(item => item.status !== 'Hidden') : [];
      const galleryStage = document.querySelector('#slider .owl-stage');
      if (galleryStage && galleryRows.length) {
        const eventCards = [];
        const seenEvents = new Set();
        galleryRows.forEach(item => {
          const key = item.eventSlug || item.url || item.eventTitle || item.title;
          if (!key || seenEvents.has(key)) return;
          seenEvents.add(key);
          eventCards.push(item);
        });
        galleryStage.innerHTML = '';
        galleryStage.classList.add('velentra-gallery-stage');
        galleryStage.style.setProperty('width', '100%', 'important');
        galleryStage.style.setProperty('height', 'auto', 'important');
        galleryStage.style.transform = 'translateX(0)';
        const gallerySection = document.querySelector('#slider');
        gallerySection?.classList.add('velentra-gallery-section');
        gallerySection?.querySelectorAll('.owl-nav, .owl-dots, .owl-prev, .owl-next, .velentra-gallery-arrow').forEach(node => node.remove());
        eventCards.forEach(item => {
          const outer = document.createElement('div'); outer.className = 'owl-item velentra-gallery-card';
          outer.style.display = 'block';
          outer.style.visibility = 'visible';
          const box = document.createElement('div'); box.className = 'photoGalleryBox';
          const link = document.createElement('a'); link.href = item.url || '#'; link.target = '_blank'; link.rel = 'noreferrer'; link.title = item.eventTitle || item.title || 'Past conference gallery';
          if (item.image) { const image = document.createElement('img'); image.src = item.image; image.alt = item.eventTitle || item.title || 'Past conference'; link.appendChild(image); }
          const title = document.createElement('h3'); title.textContent = item.eventTitle || item.title || ''; link.appendChild(title); box.appendChild(link); outer.appendChild(box); galleryStage.appendChild(outer);
        });
        const galleryContainer = gallerySection?.querySelector('.container') || gallerySection;
        if (galleryContainer && eventCards.length > 3) {
          galleryContainer.querySelectorAll('.velentra-gallery-arrow').forEach(button => button.remove());
          const prev = document.createElement('button'); prev.type = 'button'; prev.className = 'velentra-gallery-arrow velentra-gallery-prev'; prev.setAttribute('aria-label', 'Previous past conference galleries'); prev.textContent = '‹';
          const next = document.createElement('button'); next.type = 'button'; next.className = 'velentra-gallery-arrow velentra-gallery-next'; next.setAttribute('aria-label', 'Next past conference galleries'); next.textContent = '›';
          galleryContainer.appendChild(prev); galleryContainer.appendChild(next);
          let index = 0;
          const step = () => { const card = galleryStage.querySelector('.velentra-gallery-card'); return card ? card.getBoundingClientRect().width + 20 : 0; };
          const move = direction => { const visible = window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3; const max = Math.max(0, eventCards.length - visible); index += direction; if (index > max) index = 0; if (index < 0) index = max; galleryStage.style.transform = `translateX(-${index * step()}px)`; };
          prev.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
          if (gallerySection._velentraGalleryTimer) clearInterval(gallerySection._velentraGalleryTimer);
          gallerySection._velentraGalleryTimer = setInterval(() => move(1), 3500);
        }
      }
      const videoReviewsRaw = sessionStorage.getItem(`velentra-video-reviews-${eventId}`) || localStorage.getItem(`velentra-video-reviews-${eventId}`);
      const storedVideoReviews = videoReviewsRaw ? JSON.parse(videoReviewsRaw) : [];
      const configuredVideo = sectionValues['video-testimonials'];
      if (configuredVideo?.videoUrl && !storedVideoReviews.some(item => item.videoUrl === configuredVideo.videoUrl)) storedVideoReviews.push({ id: `website-video-review-${eventId}`, title: configuredVideo.title || 'Past Conference Video Review', reviewer: 'Website video testimonial', videoUrl: configuredVideo.videoUrl, posterImage: configuredVideo.imageUrl || '', description: configuredVideo.body || '', status: configuredVideo.status || 'Published' });
      const videoReviews = storedVideoReviews.filter(item => item.status === 'Published');
      let videoSection = document.querySelector('#past-conference-video-review, #video-reviews, .past-conference-video-review');
      if (!videoSection) {
        const existingVideoHeading = Array.from(document.querySelectorAll('h3')).find(item => /past conference review/i.test(item.textContent || ''));
        videoSection = existingVideoHeading?.closest('section') || null;
      }
      if (videoReviews.length) {
        if (!videoSection) {
          videoSection = document.createElement('section');
          videoSection.id = 'past-conference-video-review';
          videoSection.dataset.velentraManaged = 'true';
          const footer = document.querySelector('footer');
          (footer?.parentElement || document.body).insertBefore(videoSection, footer || null);
        }
        videoSection.innerHTML = '';
        if (!videoSection.dataset.velentraManaged) videoSection.classList.add('past-conference-video-review');
        videoSection.style.overflow = 'visible';
        videoSection.style.height = 'auto';
        videoSection.style.maxHeight = 'none';
        const container = document.createElement('div'); container.className = 'container';
        const heading = document.createElement('div'); heading.className = 'heading m-b-20';
        const title = document.createElement('h3'); title.className = 'velentra-video-review-heading'; title.textContent = 'Watch Past Conference Review'; heading.appendChild(title); container.appendChild(heading);
        const viewport = document.createElement('div'); viewport.className = 'velentra-video-review-viewport';
        const grid = document.createElement('div'); grid.className = 'velentra-video-review-grid';
        videoReviews.forEach(item => {
          const card = document.createElement('article'); card.className = 'velentra-video-review-card';
          const media = document.createElement('div'); media.className = 'velentra-video-review-media';
          const url = item.videoUrl || '';
          const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/i);
          if (youtube) {
            const link = document.createElement('a');
            link.className = 'velentra-video-review-link';
            link.href = url;
            link.target = '_blank';
            link.rel = 'noreferrer';
            link.title = 'Watch this video on YouTube';
            const image = document.createElement('img');
            image.src = item.posterImage || `https://img.youtube.com/vi/${youtube[1]}/hqdefault.jpg`;
            image.alt = item.title || 'Past conference video review';
            image.loading = 'lazy';
            link.appendChild(image);
            const play = document.createElement('span');
            play.className = 'velentra-video-review-play';
            play.textContent = '▶';
            link.appendChild(play);
            const watch = document.createElement('span');
            watch.className = 'velentra-video-review-watch';
            watch.textContent = 'Watch on YouTube';
            link.appendChild(watch);
            media.appendChild(link);
          } else if (/^data:video\//i.test(url) || /\.(mp4|webm|ogg)(?:$|\?)/i.test(url)) { const video = document.createElement('video'); video.src = url; video.controls = true; if (item.posterImage) video.poster = item.posterImage; media.appendChild(video); }
          else if (item.posterImage) { const image = document.createElement('img'); image.src = item.posterImage; image.alt = item.title || 'Past conference video review'; media.appendChild(image); }
          else { const empty = document.createElement('div'); empty.textContent = 'Video review'; media.appendChild(empty); }
          card.appendChild(media); const cardTitle = document.createElement('h4'); cardTitle.textContent = item.title || 'Past conference video review'; card.appendChild(cardTitle); if (item.reviewer) { const reviewer = document.createElement('p'); reviewer.textContent = item.reviewer; card.appendChild(reviewer); } if (item.description) { const description = document.createElement('p'); description.textContent = item.description; card.appendChild(description); } grid.appendChild(card);
        });
        viewport.appendChild(grid); container.appendChild(viewport);
        if (videoReviews.length > 3) {
          const prev = document.createElement('button'); prev.type = 'button'; prev.className = 'velentra-video-review-arrow velentra-video-review-prev'; prev.setAttribute('aria-label', 'Previous video reviews'); prev.textContent = '‹';
          const next = document.createElement('button'); next.type = 'button'; next.className = 'velentra-video-review-arrow velentra-video-review-next'; next.setAttribute('aria-label', 'Next video reviews'); next.textContent = '›';
          container.appendChild(prev); container.appendChild(next);
          const step = () => { const card = grid.querySelector('.velentra-video-review-card'); return card ? card.getBoundingClientRect().width + 20 : 0; };
          let index = 0;
          const move = (direction) => { const visible = window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3; const max = Math.max(0, videoReviews.length - visible); index = index + direction; if (index > max) index = 0; if (index < 0) index = max; grid.style.transform = `translateX(-${index * step()}px)`; };
          prev.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
          if (videoSection._velentraReviewTimer) clearInterval(videoSection._velentraReviewTimer);
          videoSection._velentraReviewTimer = setInterval(() => move(1), 3500);
        }
        videoSection.appendChild(container);
      } else if (videoSection?.dataset.velentraManaged === 'true') {
        videoSection.remove();
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
  window.addEventListener('message', event => { if (event.data?.type === 'velentra-session-sync') apply(); });
  window.addEventListener('storage', event => { if (event.key && (event.key.includes('velentra-testimonials-') || event.key.includes('velentra-conference-sessions-') || event.key.includes('velentra-gallery-') || event.key.includes('velentra-video-reviews-') || event.key.includes('velentra-section-content-') || event.key.includes('velentra-managed-media-'))) apply(); });
})();
