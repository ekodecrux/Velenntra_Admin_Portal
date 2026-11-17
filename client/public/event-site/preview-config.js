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
      const footerAddress = document.querySelector('.footer-address, footer address, footer .address');
      if (values.footerAddress && footerAddress) footerAddress.innerHTML = values.footerAddress;
      const sessionsRaw = localStorage.getItem(`velentra-conference-sessions-${eventId}`) || sessionStorage.getItem(`velentra-conference-sessions-${eventId}`);
      const sessions = sessionsRaw ? JSON.parse(sessionsRaw).filter(item => item.status !== 'Hidden') : [];
      const schedule = document.querySelector('#schedule');
      const scheduleTabs = schedule?.querySelector('.tabs-content');
      if (schedule && scheduleTabs && sessions.length) {
        const groups = [...new Set(sessions.map(item => `${item.day || 'Day 1'}|${item.date || ''}`))];
        const navigation = schedule.querySelector('.tabs-navigation');
        if (navigation) { navigation.innerHTML = groups.map((group, index) => { const [day, date] = group.split('|'); return `<li class="${index === 0 ? 'active' : ''}"><a href="#velentra-event-${index + 1}">${day}<br><span>${date}</span></a></li>`; }).join(''); }
        scheduleTabs.innerHTML = groups.map((group, index) => { const [day] = group.split('|'); const rows = sessions.filter(item => `${item.day || 'Day 1'}|${item.date || ''}` === group); return `<div class="tab-pane ${index === 0 ? 'active' : ''}" id="velentra-event-${index + 1}">${rows.map(item => `<div class="row schedule-item"><div class="col-md-3 col-sm-6 col-xs-12"><div class="velentra-schedule-time">${item.time || 'Time to be announced'}</div></div><div class="col-md-9 col-sm-6 col-xs-12"><h4>${item.title || ''}</h4><small>${item.venue || ''}${item.speaker ? ` · ${item.speaker}` : ''}</small></div></div>`).join('')}</div>`; }).join('');
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
  window.addEventListener('storage', event => { if (event.key && (event.key.includes('velentra-testimonials-') || event.key.includes('velentra-conference-sessions-') || event.key.includes('velentra-gallery-') || event.key.includes('velentra-video-reviews-') || event.key.includes('velentra-section-content-'))) apply(); });
})();
