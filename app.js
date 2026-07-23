const fallbackVerse = {
  ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  en: "Indeed, with hardship comes ease.",
  ref: "Ash-Sharh 94:6",
};

const QURAN_AYAH_COUNT = 6236;
const QURAN_API_BASE = "https://api.alquran.cloud/v1/ayah";
const PRAYER_TIMES_API_BASE = "https://api.aladhan.com/v1/timings";
const PRAYERS = [
  { id: "Fajr", en: "Fajr", ar: "الفجر" },
  { id: "Dhuhr", en: "Dhuhr", ar: "الظهر" },
  { id: "Asr", en: "Asr", ar: "العصر" },
  { id: "Maghrib", en: "Maghrib", ar: "المغرب" },
  { id: "Isha", en: "Isha", ar: "العشاء" },
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
  {
    title: { en: "Golden Light", ar: "نور ذهبي" },
    artist: { en: "Ambient Music", ar: "موسيقى هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Gentle Rain", ar: "مطر هادئ" },
    artist: { en: "Calm Soundscape", ar: "أجواء مطمئنة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Evening Calm", ar: "سكينة المساء" },
    artist: { en: "Soft Keys", ar: "أنغام هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Soft Horizon", ar: "أفق هادئ" },
    artist: { en: "Ambient Music", ar: "موسيقى هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Quiet Garden", ar: "حديقة هادئة" },
    artist: { en: "Calm Soundscape", ar: "أجواء مطمئنة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Moonlit Path", ar: "طريق مضاء بالقمر" },
    artist: { en: "Soft Keys", ar: "أنغام هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Restful Breeze", ar: "نسيم مريح" },
    artist: { en: "Ambient Music", ar: "موسيقى هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Morning Stillness", ar: "سكون الصباح" },
    artist: { en: "Calm Soundscape", ar: "أجواء مطمئنة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    thumb: "assets/thumb.jpg",
  },
  {
    title: { en: "Tender Waves", ar: "أمواج رقيقة" },
    artist: { en: "Soft Keys", ar: "أنغام هادئة" },
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    thumb: "assets/thumb.jpg",
  },
];

const i18n = {
  en: {
    tagline: "Find inspiration. Nourish your soul.",
    dailyLabel: "A verse for today",
    verseTitle: "A small moment of reflection",
    newInspiration: "Draw another verse",
    share: "Share",
    scrollHint: "Scroll down for more",
    moreTitle: "Reflections for the Heart",
    moreLead:
      "Small reminders to carry through your day — gratitude, patience, and light.",
    favored: "Saved to favorites",
    unfavored: "Removed from favorites",
    shareFailed: "Could not share — try again",
    whatsApp: "WhatsApp",
    facebook: "Facebook",
    messages: "Messages",
    notes: "Save to Notes",
    wechat: "WeChat",
    wechatCopied: "Verse copied. WeChat is opening — choose a chat and paste it.",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    verseLoadFailed: "Could not load a new verse. Please try again.",
    prayerTitle: "Local salah reminders",
    prayerLead: "Receive gentle reminders for each of the five daily prayers.",
    prayerMethodLabel: "Calculation method",
    enablePrayerReminders: "Enable local reminders",
    updatePrayerTimes: "Update times",
    turnOffPrayerReminders: "Turn off",
    prayerLocationPrompt:
      "Enable reminders to use your location and load today's prayer times.",
    prayerLoading: "Loading today's local prayer times…",
    prayerReady: "Local prayer times are ready. Five reminders are scheduled.",
    prayerDisabled: "Local salah reminders are turned off.",
    prayerLocationDenied:
      "Location was not available. Allow location access to set local prayer reminders.",
    prayerLoadFailed: "Could not load local prayer times. Please try again.",
    prayerAlertsBlocked:
      "Browser alerts are blocked. Reminders will still appear while this site is open.",
    prayerAlertTitle: "Time for {prayer}",
    prayerAlertBody: "A moment for salah is here.",
    prayerHint:
      "Times mark the start of each prayer and can differ from your local masjid's jama'ah schedule. Alerts work while this site stays open.",
  },
  ar: {
    tagline: "ابحث عن الإلهام. غذِّ روحك.",
    dailyLabel: "آية لليوم",
    verseTitle: "لحظة قصيرة للتأمل",
    newInspiration: "اختر آية أخرى",
    share: "مشاركة",
    scrollHint: "مرّر للأسفل للمزيد",
    moreTitle: "تأملات للقلب",
    moreLead: "تذكيرات لطيفة ليومك — شكر، وصبر، ونور.",
    favored: "أُضيف إلى المفضلة",
    unfavored: "أُزيل من المفضلة",
    shareFailed: "تعذّرت المشاركة — حاول مجددًا",
    whatsApp: "واتساب",
    facebook: "فيسبوك",
    messages: "الرسائل",
    notes: "الحفظ في الملاحظات",
    wechat: "وي تشات",
    wechatCopied: "تم نسخ الآية. يُفتح وي تشات الآن — اختر محادثة والصقها.",
    copyLink: "نسخ الرابط",
    linkCopied: "تم نسخ الرابط",
    verseLoadFailed: "تعذّر تحميل آية جديدة. حاول مرة أخرى.",
    prayerTitle: "تذكيرات الصلاة المحلية",
    prayerLead: "احصل على تذكيرات لطيفة للصلوات الخمس اليومية.",
    prayerMethodLabel: "طريقة الحساب",
    enablePrayerReminders: "تفعيل التذكيرات المحلية",
    updatePrayerTimes: "تحديث الأوقات",
    turnOffPrayerReminders: "إيقاف",
    prayerLocationPrompt:
      "فعّل التذكيرات لاستخدام موقعك وتحميل مواقيت الصلاة لليوم.",
    prayerLoading: "جارٍ تحميل مواقيت الصلاة المحلية لليوم…",
    prayerReady: "مواقيت الصلاة المحلية جاهزة وتم ضبط خمسة تذكيرات.",
    prayerDisabled: "تم إيقاف تذكيرات الصلاة المحلية.",
    prayerLocationDenied:
      "تعذّر الوصول إلى الموقع. اسمح بالوصول إلى الموقع لضبط تذكيرات الصلاة المحلية.",
    prayerLoadFailed: "تعذّر تحميل مواقيت الصلاة المحلية. حاول مرة أخرى.",
    prayerAlertsBlocked:
      "تنبيهات المتصفح محجوبة. ستظهر التذكيرات أثناء بقاء الموقع مفتوحًا.",
    prayerAlertTitle: "حان وقت {prayer}",
    prayerAlertBody: "حان وقت الصلاة.",
    prayerHint:
      "تشير الأوقات إلى بداية كل صلاة وقد تختلف عن جدول الجماعة في المسجد المحلي. تعمل التنبيهات أثناء بقاء الموقع مفتوحًا.",
  },
};

const els = {
  quoteCard: document.getElementById("quoteCard"),
  quoteEn: document.getElementById("quoteEn"),
  quoteAr: document.getElementById("quoteAr"),
  quoteReference: document.getElementById("quoteReference"),
  newInspirationBtn: document.getElementById("newInspirationBtn"),
  shareBtn: document.getElementById("shareBtn"),
  shareWrap: document.getElementById("shareWrap"),
  shareMenu: document.getElementById("shareMenu"),
  shareWhatsAppBtn: document.getElementById("shareWhatsAppBtn"),
  shareFacebookBtn: document.getElementById("shareFacebookBtn"),
  shareMessagesBtn: document.getElementById("shareMessagesBtn"),
  shareNotesBtn: document.getElementById("shareNotesBtn"),
  shareWeChatBtn: document.getElementById("shareWeChatBtn"),
  copyLinkBtn: document.getElementById("copyLinkBtn"),
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
  prayerGrid: document.getElementById("prayerGrid"),
  prayerMethod: document.getElementById("prayerMethod"),
  prayerEnableBtn: document.getElementById("prayerEnableBtn"),
  prayerRefreshBtn: document.getElementById("prayerRefreshBtn"),
  prayerDisableBtn: document.getElementById("prayerDisableBtn"),
  prayerStatus: document.getElementById("prayerStatus"),
};

let lang = localStorage.getItem("noortech-lang") || "en";
let currentVerse = fallbackVerse;
let currentVerseNumber = null;
let lastVerseNumber = null;
let verseRequestId = 0;
let trackIndex = Math.floor(Math.random() * tracks.length);
let favorites = new Set(JSON.parse(localStorage.getItem("noortech-favs") || "[]"));
let prayerTimings = null;
let prayerLocation = JSON.parse(localStorage.getItem("noortech-prayer-location") || "null");
let prayerRemindersEnabled =
  localStorage.getItem("noortech-prayer-reminders-enabled") === "true";
let prayerTimers = {};
let prayerRefreshTimer = null;
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
  renderPrayerReminders();
}

function renderQuote(animate = true) {
  if (animate) {
    els.quoteCard.classList.remove("is-switching");
    void els.quoteCard.offsetWidth;
    els.quoteCard.classList.add("is-switching");
  }
  els.quoteEn.textContent = `“${currentVerse.en}”`;
  els.quoteAr.textContent = currentVerse.ar;
  els.quoteReference.textContent = currentVerse.ref;
}

function getRandomVerseNumber() {
  let number;
  do {
    number = 1 + Math.floor(Math.random() * QURAN_AYAH_COUNT);
  } while (number === lastVerseNumber && QURAN_AYAH_COUNT > 1);
  return number;
}

function getVerseNumberFromUrl() {
  const requestedVerse = Number(new URLSearchParams(window.location.search).get("ayah"));
  return Number.isInteger(requestedVerse) &&
    requestedVerse >= 1 &&
    requestedVerse <= QURAN_AYAH_COUNT
    ? requestedVerse
    : null;
}

async function loadRandomVerse(animate = true, requestedVerseNumber = null) {
  const verseNumber = requestedVerseNumber || getRandomVerseNumber();
  const requestId = ++verseRequestId;

  if (animate) {
    els.quoteCard.classList.remove("is-switching");
    void els.quoteCard.offsetWidth;
    els.quoteCard.classList.add("is-switching");
  }
  els.quoteCard.classList.add("is-loading");

  try {
    const response = await fetch(
      `${QURAN_API_BASE}/${verseNumber}/editions/quran-uthmani,en.sahih`
    );
    if (!response.ok) throw new Error("Verse request failed");

    const result = await response.json();
    const [arabic, translation] = result.data || [];
    if (!arabic?.text || !translation?.text || !translation?.surah) {
      throw new Error("Verse response was incomplete");
    }
    if (requestId !== verseRequestId) return;

    currentVerse = {
      ar: arabic.text,
      en: translation.text,
      ref: `${translation.surah.englishName} ${translation.surah.number}:${translation.numberInSurah}`,
    };
    currentVerseNumber = verseNumber;
    lastVerseNumber = verseNumber;
    renderQuote(false);
    updateFavoriteState();
  } catch {
    if (requestId !== verseRequestId) return;
    showToast(i18n[lang].verseLoadFailed);
  } finally {
    if (requestId === verseRequestId) {
      els.quoteCard.classList.remove("is-loading");
    }
  }
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
  const key = currentVerse.ref;
  els.favoritesBtn.classList.toggle("is-active", favorites.has(key));
  els.favoritesBtn.setAttribute(
    "aria-pressed",
    favorites.has(key) ? "true" : "false"
  );
}

function toggleFavorite() {
  const key = currentVerse.ref;
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

function getVerseShareUrl() {
  const url = new URL(window.location.href);
  if (currentVerseNumber) url.searchParams.set("ayah", String(currentVerseNumber));
  return url.toString();
}

function getVerseShareText() {
  return `${currentVerse.ar}\n“${currentVerse.en}”\n${currentVerse.ref}\n— NoorTech`;
}

function hideShareMenu() {
  els.shareMenu.hidden = true;
  els.shareBtn.setAttribute("aria-expanded", "false");
}

function toggleShareMenu() {
  const willOpen = els.shareMenu.hidden;
  els.shareMenu.hidden = !willOpen;
  els.shareBtn.setAttribute("aria-expanded", String(willOpen));
}

function openShareWindow(url) {
  const shareWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!shareWindow) showToast(i18n[lang].shareFailed);
  hideShareMenu();
}

function openAppShareWithFallback(appUrl, webUrl) {
  let appOpened = false;
  let fallbackTimer;

  const removeListeners = () => {
    window.removeEventListener("blur", cancelFallback);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };

  const cancelFallback = () => {
    appOpened = true;
    window.clearTimeout(fallbackTimer);
    removeListeners();
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") cancelFallback();
  };

  window.addEventListener("blur", cancelFallback, { once: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  fallbackTimer = window.setTimeout(() => {
    removeListeners();
    if (!appOpened) window.location.href = webUrl;
  }, 1500);

  window.location.href = appUrl;
  hideShareMenu();
}

async function shareToWhatsApp() {
  const shareUrl = getVerseShareUrl();

  if (isIOSDevice() && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: "NoorTech",
        text: getVerseShareText(),
        url: shareUrl,
      });
    } catch (error) {
      if (error.name !== "AbortError") showToast(i18n[lang].shareFailed);
    } finally {
      hideShareMenu();
    }
    return;
  }

  const text = `${getVerseShareText()}\n${shareUrl}`;
  const encodedText = encodeURIComponent(text);
  openAppShareWithFallback(
    `whatsapp://send?text=${encodedText}`,
    `https://wa.me/?text=${encodedText}`
  );
}

function isIOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

async function shareToFacebook() {
  const shareUrl = getVerseShareUrl();

  if (isIOSDevice() && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: "NoorTech",
        text: getVerseShareText(),
        url: shareUrl,
      });
    } catch (error) {
      if (error.name !== "AbortError") showToast(i18n[lang].shareFailed);
    } finally {
      hideShareMenu();
    }
    return;
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  openAppShareWithFallback(
    `fb://share?link=${encodedUrl}`,
    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  );
}

function shareToMessages() {
  const text = `${getVerseShareText()}\n${getVerseShareUrl()}`;
  window.location.href = `sms:?&body=${encodeURIComponent(text)}`;
  hideShareMenu();
}

async function shareToNotes() {
  if (!navigator.share) {
    copyVerseLink();
    return;
  }

  try {
    await navigator.share({
      title: "NoorTech",
      text: getVerseShareText(),
      url: getVerseShareUrl(),
    });
  } catch (error) {
    if (error.name !== "AbortError") showToast(i18n[lang].shareFailed);
  } finally {
    hideShareMenu();
  }
}

async function copyVerseForWeChat() {
  try {
    await navigator.clipboard.writeText(`${getVerseShareText()}\n${getVerseShareUrl()}`);
    showToast(i18n[lang].wechatCopied);
    hideShareMenu();
  } catch {
    showToast(i18n[lang].shareFailed);
  }
}

function shareToWeChat() {
  copyVerseForWeChat();
  openAppShareWithFallback("weixin://", window.location.href);
}

async function copyVerseLink() {
  try {
    await navigator.clipboard.writeText(`${getVerseShareText()}\n${getVerseShareUrl()}`);
    showToast(i18n[lang].linkCopied);
    hideShareMenu();
  } catch {
    showToast(i18n[lang].shareFailed);
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

function getRandomTrackIndex() {
  if (tracks.length < 2) return 0;
  return (trackIndex + 1 + Math.floor(Math.random() * (tracks.length - 1))) % tracks.length;
}

function loadRandomTrack(autoplay = false) {
  loadTrack(getRandomTrackIndex(), autoplay);
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

function getPrayerName(id) {
  const prayer = PRAYERS.find((item) => item.id === id);
  return prayer ? prayer[lang] : id;
}

function cleanPrayerTime(value) {
  return String(value || "").replace(/\s*\(.+?\)\s*$/, "").trim();
}

function isValidPrayerLocation(location) {
  return (
    location &&
    Number.isFinite(location.latitude) &&
    Number.isFinite(location.longitude)
  );
}

function getPrayerApiDate() {
  const date = new Date();
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("-");
}

function getPrayerTimeDate(time) {
  const [hours, minutes] = cleanPrayerTime(time).split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function renderPrayerTimes() {
  if (!prayerTimings) {
    els.prayerGrid.innerHTML = "";
    return;
  }

  els.prayerGrid.innerHTML = PRAYERS.map(
    ({ id }) => `
      <article class="prayer-time-card">
        <span>${getPrayerName(id)}</span>
        <time>${cleanPrayerTime(prayerTimings[id])}</time>
      </article>
    `
  ).join("");
}

function renderPrayerReminders() {
  const savedMethod = localStorage.getItem("noortech-prayer-method") || "3";
  els.prayerMethod.value = savedMethod;
  els.prayerDisableBtn.hidden = !prayerRemindersEnabled;
  renderPrayerTimes();

  if (prayerTimings && prayerRemindersEnabled) {
    els.prayerStatus.textContent = i18n[lang].prayerReady;
  } else if (!prayerRemindersEnabled) {
    els.prayerStatus.textContent = i18n[lang].prayerLocationPrompt;
  } else if (!isValidPrayerLocation(prayerLocation)) {
    els.prayerStatus.textContent = i18n[lang].prayerLocationDenied;
  }
}

async function requestPrayerNotificationPermission() {
  if (!("Notification" in window) || Notification.permission === "granted") {
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission !== "granted") {
    showToast(i18n[lang].prayerAlertsBlocked);
  }
}

function clearPrayerSchedules() {
  Object.values(prayerTimers).forEach(clearTimeout);
  prayerTimers = {};
  clearTimeout(prayerRefreshTimer);
}

function schedulePrayerTimesRefresh() {
  const nextRefresh = new Date();
  nextRefresh.setHours(24, 2, 0, 0);
  prayerRefreshTimer = setTimeout(
    () => loadLocalPrayerTimes(true),
    nextRefresh.getTime() - Date.now()
  );
}

function schedulePrayerReminders() {
  clearPrayerSchedules();
  if (!prayerRemindersEnabled || !prayerTimings) return;

  PRAYERS.forEach(({ id }) => {
    let target = getPrayerTimeDate(prayerTimings[id]);
    if (target <= new Date()) target.setDate(target.getDate() + 1);

    prayerTimers[id] = setTimeout(() => {
      const prayerName = getPrayerName(id);
      const title = i18n[lang].prayerAlertTitle.replace("{prayer}", prayerName);
      showToast(`${title}. ${i18n[lang].prayerAlertBody}`);
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
          body: i18n[lang].prayerAlertBody,
          tag: `noortech-prayer-${id}`,
        });
      }
      schedulePrayerReminders();
    }, target.getTime() - Date.now());
  });

  schedulePrayerTimesRefresh();
}

async function loadLocalPrayerTimes(silent = false) {
  if (!isValidPrayerLocation(prayerLocation)) return;

  if (!silent) els.prayerStatus.textContent = i18n[lang].prayerLoading;
  const method = els.prayerMethod.value || "3";
  const { latitude, longitude } = prayerLocation;

  try {
    const response = await fetch(
      `${PRAYER_TIMES_API_BASE}/${getPrayerApiDate()}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );
    if (!response.ok) throw new Error("Prayer time request failed");

    const result = await response.json();
    const timings = result.data?.timings;
    if (!timings || !PRAYERS.every(({ id }) => timings[id])) {
      throw new Error("Prayer time response was incomplete");
    }

    prayerTimings = Object.fromEntries(
      PRAYERS.map(({ id }) => [id, cleanPrayerTime(timings[id])])
    );
    renderPrayerTimes();
    schedulePrayerReminders();
    els.prayerStatus.textContent = prayerRemindersEnabled
      ? i18n[lang].prayerReady
      : i18n[lang].prayerLocationPrompt;
  } catch {
    els.prayerStatus.textContent = i18n[lang].prayerLoadFailed;
    showToast(i18n[lang].prayerLoadFailed);
  }
}

function requestPrayerLocation() {
  if (!navigator.geolocation) {
    els.prayerStatus.textContent = i18n[lang].prayerLocationDenied;
    return;
  }

  els.prayerStatus.textContent = i18n[lang].prayerLoading;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      prayerLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      localStorage.setItem("noortech-prayer-location", JSON.stringify(prayerLocation));
      loadLocalPrayerTimes();
    },
    () => {
      els.prayerStatus.textContent = i18n[lang].prayerLocationDenied;
      showToast(i18n[lang].prayerLocationDenied);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 3600000 }
  );
}

function enablePrayerReminders() {
  prayerRemindersEnabled = true;
  localStorage.setItem("noortech-prayer-reminders-enabled", "true");
  els.prayerDisableBtn.hidden = false;
  requestPrayerNotificationPermission();
  requestPrayerLocation();
}

function updatePrayerTimes() {
  if (isValidPrayerLocation(prayerLocation)) loadLocalPrayerTimes();
  else requestPrayerLocation();
}

function disablePrayerReminders() {
  prayerRemindersEnabled = false;
  localStorage.setItem("noortech-prayer-reminders-enabled", "false");
  clearPrayerSchedules();
  renderPrayerReminders();
  showToast(i18n[lang].prayerDisabled);
}

/* Events */
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    lang = btn.dataset.lang;
    localStorage.setItem("noortech-lang", lang);
    applyI18n();
  });
});

els.newInspirationBtn.addEventListener("click", loadRandomVerse);
els.shareBtn.addEventListener("click", toggleShareMenu);
els.shareWhatsAppBtn.addEventListener("click", shareToWhatsApp);
els.shareFacebookBtn.addEventListener("click", shareToFacebook);
els.shareMessagesBtn.addEventListener("click", shareToMessages);
els.shareNotesBtn.addEventListener("click", shareToNotes);
els.shareWeChatBtn.addEventListener("click", shareToWeChat);
els.copyLinkBtn.addEventListener("click", copyVerseLink);
els.favoritesBtn.addEventListener("click", toggleFavorite);
els.prayerEnableBtn.addEventListener("click", enablePrayerReminders);
els.prayerRefreshBtn.addEventListener("click", updatePrayerTimes);
els.prayerDisableBtn.addEventListener("click", disablePrayerReminders);
els.prayerMethod.addEventListener("change", () => {
  localStorage.setItem("noortech-prayer-method", els.prayerMethod.value);
  if (isValidPrayerLocation(prayerLocation)) loadLocalPrayerTimes();
});

els.playBtn.addEventListener("click", togglePlay);
els.prevBtn.addEventListener("click", () => loadRandomTrack(true));
els.nextBtn.addEventListener("click", () => loadRandomTrack(true));
els.playlistBtn.addEventListener("click", () => loadRandomTrack(!els.audioEl.paused));

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
els.audioEl.addEventListener("ended", () => loadRandomTrack(true));
els.audioEl.addEventListener("error", () => {
  setPlayingUI(false);
});

document.addEventListener("click", (event) => {
  if (!els.shareWrap.contains(event.target)) hideShareMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideShareMenu();
});

/* Init */
applyI18n();
loadRandomVerse(false, getVerseNumberFromUrl());
if (prayerRemindersEnabled && isValidPrayerLocation(prayerLocation)) {
  loadLocalPrayerTimes();
}
setVolume(els.volumeSlider.value);
loadTrack(trackIndex, false);
