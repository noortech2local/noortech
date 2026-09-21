/* A paused, scroll-seeked film: only one seek is outstanding at a time. */
(() => {
  const section = document.querySelector('.product-film');
  if (!section) return;
  const video = section.querySelector('video');
  const stage = section.querySelector('.product-film__stage');
  const hint = section.querySelector('[data-film-hint]');
  const time = section.querySelector('[data-film-time]');
  const mobile = matchMedia('(max-width: 600px)');
  const caption = section.querySelector('[data-film-caption]');
  const steps = [...section.querySelectorAll('[data-film-step]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let target = 0;
  let frame = 0;
  let started = false;
  let failed = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  const seek = () => {
    if (motion.matches || failed || video.readyState < 2 || video.seeking) return;
    if (Math.abs(video.currentTime - target) > 1 / 48) video.currentTime = target;
  };
  const update = () => {
    frame = 0;
    if (motion.matches || failed) return;
    const bounds = section.getBoundingClientRect();
    const progress = clamp(-bounds.top / Math.max(1, bounds.height - stage.offsetHeight));
    section.style.setProperty('--film-progress', progress.toFixed(4));
    if (Number.isFinite(video.duration)) {
      // Avoid seeking past the final decodable frame.
      const travel = progress < .12 ? progress / .12 * .08 :
        progress < .62 ? .08 + (progress - .12) / .5 * .64 :
        progress < .88 ? .72 + (progress - .62) / .26 * .28 : 1;
      target = travel * Math.max(0, video.duration - 1 / 24);
      const chapter = target < 1.3 ? 0 : target < 4.5 ? 1 : 2;
      const captions = document.documentElement.lang === 'ar'
        ? ['هدية بمعنى، تنتظر أن تُفتح.', 'تبدأ التجربة مع فتح العلبة.', 'قطعة من الرياض، تحملها معك.']
        : ['A meaningful gift, waiting to be opened.', 'The experience begins as the box opens.', 'A piece of Riyadh, ready to carry with you.'];
      caption.textContent = captions[chapter];
      steps.forEach((step, index) => {
        if (index === chapter) step.setAttribute('aria-current', 'step');
        else step.removeAttribute('aria-current');
      });
      time.textContent = `0${chapter + 1} / 03`;
      seek();
    }
  };
  const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
  const load = () => {
    if (started || motion.matches || failed) return;
    started = true;
    video.muted = true;
    video.src = mobile.matches ? video.dataset.mobileSrc : video.dataset.src;
    video.preload = 'auto';
    video.load();
  };
  const setHint = still => {
    const ar = document.documentElement.lang === 'ar';
    hint.textContent = still ? (ar ? 'تجربة الإهداء مع نور' : 'The Noor gifting experience') : (ar ? 'مرّر لفتح الهدية' : 'Scroll to unwrap');
  };
  mobile.addEventListener('change', () => {
    if (!started || failed) return;
    started = false;
    section.classList.remove('is-video-ready');
    load();
  });
  video.addEventListener('loadeddata', () => {
    section.classList.add('is-video-ready');
    requestUpdate();
  });
  video.addEventListener('loadedmetadata', requestUpdate);
  video.addEventListener('seeked', seek);
  video.addEventListener('error', () => {
    failed = true;
    section.classList.remove('is-video-ready');
    section.classList.add('is-video-fallback');
    setHint(true);
  });
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate, { passive: true });
  addEventListener('pageshow', requestUpdate);
  motion.addEventListener('change', () => {
    setHint(motion.matches || failed);
    if (!motion.matches) { load(); requestUpdate(); }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { load(); requestUpdate(); }
    }, { rootMargin: '100% 0px' });
    observer.observe(section);
  } else load();
  setHint(motion.matches);
  requestUpdate();
})();
