(() => {
  const apply = () => {
    try {
      if (!document.getElementById('velentra-video-review-preview-style')) {
        const style = document.createElement('style');
        style.id = 'velentra-video-review-preview-style';
        style.textContent = `
          #past-conference-video-review, #video-reviews, .past-conference-video-review { height: auto !important; max-height: none !important; overflow: visible !important; }
          .velentra-video-review-grid { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; width: 100%; height: auto !important; overflow: visible !important; }
          .velentra-video-review-card { min-width: 0; overflow: hidden; border: 1px solid rgba(255,255,255,.3); border-radius: 10px; background: #fff; color: #173b5a; box-shadow: 0 8px 24px rgba(0,0,0,.16); }
          .velentra-video-review-media { aspect-ratio: 16/9; min-height: 150px; display: grid; place-items: center; overflow: hidden; background: #173b5a; }
          .velentra-video-review-media iframe, .velentra-video-review-media video, .velentra-video-review-media img { display: block; width: 100%; height: 100%; min-height: 150px; border: 0; object-fit: cover; }
          .velentra-video-review-link { position: relative; display: block; width: 100%; height: 100%; min-height: 150px; color: #fff; text-decoration: none; }
          .velentra-video-review-link img { transition: transform .2s ease, filter .2s ease; }
          .velentra-video-review-link:hover img { transform: scale(1.03); filter: brightness(.72); }
          .velentra-video-review-play { position: absolute; inset: 50% auto auto 50%; transform: translate(-50%, -50%); display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; background: rgba(220,0,0,.92); color: #fff; font-size: 22px; padding-left: 3px; }
          .velentra-video-review-watch { position: absolute; left: 12px; bottom: 10px; border-radius: 4px; padding: 6px 9px; background: rgba(0,0,0,.75); color: #fff; font-size: 12px; font-weight: 600; }
          .velentra-video-review-card h4, .velentra-video-review-card p { margin: 10px 14px 0; }
          .velentra-video-review-card h4 { font-size: 16px; line-height: 1.35; }
          .velentra-video-review-card p { font-size: 13px; line-height: 1.45; }
          .velentra-video-review-card p:last-child { margin-bottom: 14px; }
          @media (max-width: 900px) { .velentra-video-review-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          @media (max-width: 560px) { .velentra-video-review-grid { grid-template-columns: 1fr; } }
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
        const title = document.createElement('h3'); title.className = 'text-b-color'; title.textContent = 'Past Conference Video Reviews'; heading.appendChild(title); container.appendChild(heading);
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
        container.appendChild(grid); videoSection.appendChild(container);
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
  window.addEventListener('storage', event => { if (event.key && (event.key.includes('velentra-testimonials-') || event.key.includes('velentra-conference-sessions-') || event.key.includes('velentra-gallery-') || event.key.includes('velentra-video-reviews-') || event.key.includes('velentra-section-content-'))) apply(); });
})();
