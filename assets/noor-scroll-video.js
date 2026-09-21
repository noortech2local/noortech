/* Sparse still-frame sequence. No video playback, seeking, fetch or canvas. */
(() => {
  const section = document.querySelector('.product-film');
  if (!section) return;
  const base = new URL('noor-film-frames/', document.currentScript.src);
  const image = section.querySelector('[data-scroll-frame]');
  const stage = section.querySelector('.product-film__stage');
  const hint = section.querySelector('[data-film-hint]');
  const counter = section.querySelector('[data-film-time]');
  const caption = section.querySelector('[data-film-caption]');
  const steps = [...section.querySelectorAll('[data-film-step]')];
  const mobile = matchMedia('(max-width: 600px)');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // Twenty-two poses sampled across all 150 source frames, including the reveal.
  const selectedFrames = Array.from({length: 22}, (_, index) => index);
  const timestamps = selectedFrames.map(index => Math.round(index * 149 / 21) / 24);
  const cache = new Map();
  let frame = 0;
  let near = false;
  let wanted = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const variant = () => mobile.matches ? 'mobile' : 'desktop';
  const url = index => new URL(`${variant()}-${String(selectedFrames[index]).padStart(2, '0')}.webp?v=22`, base).href;
  const show = () => {
    if (motion.matches) return;
    const source = url(wanted);
    const loaded = cache.get(source);
    if (!loaded?.complete || !loaded.naturalWidth) return;
    if (image.getAttribute('src') !== source) image.src = source;
    image.dataset.frameIndex = String(wanted);
    section.classList.add('is-sequence-ready');
    section.classList.remove('is-video-fallback');
    const chapter = timestamps[wanted] < 1.3 ? 0 : timestamps[wanted] < 4.5 ? 1 : 2;
    const ar = document.documentElement.lang === 'ar';
    const captions = ar
      ? ['هدية بمعنى، تنتظر أن تُفتح.', 'تبدأ التجربة مع فتح العلبة.', 'قطعة من الرياض، تحملها معك.']
      : ['A meaningful gift, waiting to be opened.', 'The experience begins as the box opens.', 'A piece of Riyadh, ready to carry with you.'];
    caption.textContent = captions[chapter];
    hint.textContent = ar ? 'مرّر لفتح الهدية' : 'Scroll to unwrap';
    steps.forEach((step, i) => {
      if (i === chapter) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    counter.textContent = `0${chapter + 1} / 03`;
  };
  const load = index => {
    const source = url(index);
    if (cache.has(source)) return;
    const asset = new Image();
    cache.set(source, asset);
    asset.onload = show; // Always render the latest wanted frame, not a stale request.
    asset.onerror = () => {
      if (source !== url(wanted)) return;
      section.classList.add('is-video-fallback');
      section.classList.remove('is-sequence-ready');
      hint.textContent = document.documentElement.lang === 'ar' ? 'تجربة الإهداء مع نور' : 'The Noor gifting experience';
    };
    asset.src = source;
  };
  const update = () => {
    frame = 0;
    if (motion.matches) return;
    const bounds = section.getBoundingClientRect();
    const progress = clamp(-bounds.top / Math.max(1, bounds.height - stage.offsetHeight));
    // Equal scroll bands hold each image still; there is no interpolation.
    wanted = Math.min(selectedFrames.length - 1, Math.floor(progress * selectedFrames.length));
    section.style.setProperty('--film-progress', progress.toFixed(4));
    if (near) { load(wanted); show(); }
  };
  const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
  const preload = () => {
    if (!near || motion.matches) return;
    load(wanted);
    timestamps.forEach((_, i) => load(i));
  };
  const reset = () => {
    section.classList.remove('is-sequence-ready', 'is-video-fallback');
    if (motion.matches) {
      hint.textContent = document.documentElement.lang === 'ar' ? 'تجربة الإهداء مع نور' : 'The Noor gifting experience';
    } else { update(); preload(); }
  };
  mobile.addEventListener('change', reset);
  motion.addEventListener('change', reset);
  addEventListener('scroll', requestUpdate, {passive: true});
  addEventListener('resize', requestUpdate, {passive: true});
  addEventListener('pageshow', requestUpdate);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      near = entries.some(entry => entry.isIntersecting);
      if (near) { update(); preload(); }
    }, {rootMargin: '100% 0px'}).observe(section);
  } else { near = true; preload(); }
  reset();
})();
