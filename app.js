const inspirations = [
  {
    en: "Stay Positive.",
    ar: "ابقَ إيجابيًا.",
  },
  {
    en: "Begin with Bismillah.",
    ar: "ابدأ ببسم الله.",
  },
  {
    en: "Patience is light.",
    ar: "الصبر نور.",
  },
  {
    en: "Gratitude expands the heart.",
    ar: "الشكر يوسّع القلب.",
  },
  {
    en: "Trust in Allah's timing.",
    ar: "توكّل على توقيت الله.",
  },
  {
    en: "Speak gently. Act kindly.",
    ar: "تكلّم بلطف، واعمل بإحسان.",
  },
  {
    en: "Every hardship has ease.",
    ar: "مع العسر يسرًا.",
  },
  {
    en: "Keep your heart soft.",
    ar: "أبقِ قلبك ليّنًا.",
  },
  {
    en: "Seek knowledge with humility.",
    ar: "اطلب العلم بتواضع.",
  },
  {
    en: "Remember Him in stillness.",
    ar: "اذكره في السكينة.",
  },
];

const reflections = [
  {
    label: { en: "Sabr", ar: "صبر" },
    en: "Hold steady through the wait.",
    ar: "اثبت في الانتظار.",
  },
  {
    label: { en: "Shukr", ar: "شكر" },
    en: "Name one blessing today.",
    ar: "اذكر نعمة واحدة اليوم.",
  },
  {
    label: { en: "Noor", ar: "نور" },
    en: "Let your intention purify your path.",
    ar: "اجعل نيتك تُنير طريقك.",
  },
];

const tracks = [
  {
    title: { en: "Peaceful Piano", ar: "بيانو هادئ" },
    artist: { en: "Ambient Music", ar: "موسيقى هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Quiet Dawn", ar: "فجر هادئ" },
    artist: { en: "Soft Keys", ar: "أنغام ناعمة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Still Waters", ar: "مياه ساكنة" },
    artist: { en: "Calm Soundscape", ar: "أجواء مطمئنة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumb: "assets/thumb.jpg",
  },
];

const i18n = {
  en: {
    tagline: "Find inspiration. Nourish your soul.",
    dailyLabel: "Daily Inspiration",
    newInspiration: "New Inspiration",
    share: "Share",
    scrollHint: "Scroll down for more",
    moreTitle: "Reflections for the Heart",
    moreLead:
      "Small reminders to carry through your day — gratitude, patience, and light.",
    favored: "Saved to favorites",
    unfavored: "Removed from favorites",
    shared: "Inspiration copied",
    shareFailed: "Could not share — try again",
  },
  ar: {
    tagline: "ابحث عن الإلهام. غذِّ روحك.",
    dailyLabel: "إلهام اليوم",
    newInspiration: "إلهام جديد",
    share: "مشاركة",
    scrollHint: "مرّر للأسفل للمزيد",
    moreTitle: "تأملات للقلب",
    moreLead: "تذكيرات لطيفة ليومك — شكر، وصبر، ونور.",
    favored: "أُضيف إلى المفضلة",
    unfavored: "أُزيل من المفضلة",
    shared: "تم نسخ الإلهام",
    shareFailed: "تعذّرت المشاركة — حاول مجددًا",
  },
};

const els = {
  quoteCard: document.getElementById("quoteCard"),
  quoteEn: document.getElementById("quoteEn"),
  quoteAr: document.getElementById("quoteAr"),
  newInspirationBtn: document.getElementById("newInspirationBtn"),
  shareBtn: document.getElementById("shareBtn"),
  favoritesBtn: document.getElementById("favoritesBtn"),
  reflectionGrid: document.getElementById("reflectionGrid"),
  audioEl: document.getElementById("audioEl"),
  playBtn: document.getElementById("playBtn"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  muteBtn: document.getElementById("muteBtn"),
  volumeSlider: document.getElementById("volumeSlider"),
  playlistBtn: document.getElementById("playlistBtn"),
  toast: document.getElementById("toast"),
  trackTitle: document.querySelector(".track-title"),
  trackArtist: document.querySelector(".track-artist"),
  trackThumb: document.querySelector(".track-thumb"),
};

let lang = localStorage.getItem("noortech-lang") || "en";
let quoteIndex = Number(localStorage.getItem("noortech-quote") || 0) % inspirations.length;
let trackIndex = 0;
let favorites = new Set(JSON.parse(localStorage.getItem("noortech-favs") || "[]"));
let toastTimer = null;

function showToast(message) {
  els.toast.hidden = false;
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 2200);
}

function applyI18n() {
  const dict = i18n[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("is-ar", lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dict[key]) node.textContent = dict[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  renderQuote(false);
  renderReflections();
  renderTrackMeta();
  updateFavoriteState();
}

function renderQuote(animate = true) {
  const item = inspirations[quoteIndex];
  if (animate) {
    els.quoteCard.classList.remove("is-switching");
    void els.quoteCard.offsetWidth;
    els.quoteCard.classList.add("is-switching");
  }
  els.quoteEn.textContent = item.en;
  els.quoteAr.textContent = item.ar;
  localStorage.setItem("noortech-quote", String(quoteIndex));
}

function nextQuote() {
  quoteIndex = (quoteIndex + 1) % inspirations.length;
  renderQuote(true);
  updateFavoriteState();
}

function renderReflections() {
  els.reflectionGrid.innerHTML = reflections
    .map(
      (item) => `
      <article class="reflection-card">
        <span class="ref-label">${item.label[lang]}</span>
        <p class="ref-en">${item.en}</p>
        <p class="ref-ar" dir="rtl" lang="ar">${item.ar}</p>
      </article>
    `
    )
    .join("");
}

function updateFavoriteState() {
  const key = String(quoteIndex);
  els.favoritesBtn.classList.toggle("is-active", favorites.has(key));
  els.favoritesBtn.setAttribute(
    "aria-pressed",
    favorites.has(key) ? "true" : "false"
  );
}

function toggleFavorite() {
  const key = String(quoteIndex);
  if (favorites.has(key)) {
    favorites.delete(key);
    showToast(i18n[lang].unfavored);
  } else {
    favorites.add(key);
    showToast(i18n[lang].favored);
  }
  localStorage.setItem("noortech-favs", JSON.stringify([...favorites]));
  updateFavoriteState();
}

async function shareQuote() {
  const item = inspirations[quoteIndex];
  const text = `${item.en}\n${item.ar}\n— NoorTech`;

  try {
    if (navigator.share) {
      await navigator.share({ title: "NoorTech", text });
      return;
    }
    await navigator.clipboard.writeText(text);
    showToast(i18n[lang].shared);
  } catch {
    try {
      await navigator.clipboard.writeText(text);
      showToast(i18n[lang].shared);
    } catch {
      showToast(i18n[lang].shareFailed);
    }
  }
}

function renderTrackMeta() {
  const track = tracks[trackIndex];
  els.trackTitle.textContent = track.title[lang];
  els.trackArtist.textContent = track.artist[lang];
  els.trackThumb.src = track.thumb;
}

function loadTrack(index, autoplay = false) {
  trackIndex = (index + tracks.length) % tracks.length;
  const track = tracks[trackIndex];
  els.audioEl.src = track.src;
  renderTrackMeta();
  if (autoplay) {
    els.audioEl.play().catch(() => setPlayingUI(false));
  }
}

function setPlayingUI(isPlaying) {
  const playIcon = els.playBtn.querySelector(".icon-play");
  const pauseIcon = els.playBtn.querySelector(".icon-pause");
  playIcon.hidden = isPlaying;
  pauseIcon.hidden = !isPlaying;
  els.playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
}

function togglePlay() {
  if (els.audioEl.paused) {
    els.audioEl.play().catch(() => {
      showToast(lang === "ar" ? "تعذّر تشغيل الصوت" : "Audio could not play");
      setPlayingUI(false);
    });
  } else {
    els.audioEl.pause();
  }
}

function setVolume(value) {
  const vol = Number(value);
  els.audioEl.volume = vol;
  els.volumeSlider.style.setProperty("--vol", `${Math.round(vol * 100)}%`);
  if (vol === 0) els.audioEl.muted = true;
  else if (els.audioEl.muted && vol > 0) els.audioEl.muted = false;
}

/* Events */
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    lang = btn.dataset.lang;
    localStorage.setItem("noortech-lang", lang);
    applyI18n();
  });
});

els.newInspirationBtn.addEventListener("click", nextQuote);
els.shareBtn.addEventListener("click", shareQuote);
els.favoritesBtn.addEventListener("click", toggleFavorite);

els.playBtn.addEventListener("click", togglePlay);
els.prevBtn.addEventListener("click", () => loadTrack(trackIndex - 1, true));
els.nextBtn.addEventListener("click", () => loadTrack(trackIndex + 1, true));
els.playlistBtn.addEventListener("click", () => loadTrack(trackIndex + 1, !els.audioEl.paused));

els.muteBtn.addEventListener("click", () => {
  els.audioEl.muted = !els.audioEl.muted;
  if (els.audioEl.muted) {
    els.volumeSlider.value = "0";
    els.volumeSlider.style.setProperty("--vol", "0%");
  } else {
    const restore = els.volumeSlider.value === "0" ? "0.55" : els.volumeSlider.value;
    els.volumeSlider.value = restore;
    setVolume(restore);
  }
});

els.volumeSlider.addEventListener("input", (e) => setVolume(e.target.value));

els.audioEl.addEventListener("play", () => setPlayingUI(true));
els.audioEl.addEventListener("pause", () => setPlayingUI(false));
els.audioEl.addEventListener("ended", () => loadTrack(trackIndex + 1, true));
els.audioEl.addEventListener("error", () => {
  setPlayingUI(false);
});

/* Init */
applyI18n();
setVolume(els.volumeSlider.value);
loadTrack(0, false);
