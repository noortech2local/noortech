const fallbackVerse = {
  ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  en: "Indeed, with hardship comes ease.",
  ref: "Ash-Sharh 94:6",
};

const QURAN_AYAH_COUNT = 6236;
const QURAN_API_BASE = "https://api.alquran.cloud/v1/ayah";
const PRAYER_TIMES_API_BASE = "https://api.aladhan.com/v1/timings";
const CITY_SEARCH_API_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const PRAYERS = [
  { id: "Fajr", en: "Fajr", ar: "الفجر" },
  { id: "Dhuhr", en: "Dhuhr", ar: "الظهر" },
  { id: "Asr", en: "Asr", ar: "العصر" },
  { id: "Maghrib", en: "Maghrib", ar: "المغرب" },
  { id: "Isha", en: "Isha", ar: "العشاء" },
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
    updatePrayerTimes: "Refresh location",
    changePrayerLocation: "Change city",
    savePrayerCalendar: "Save to calendar",
    turnOffPrayerReminders: "Turn off",
    prayerLocationPrompt:
      "Enable reminders to use your location and load today's prayer times.",
    prayerLoading: "Loading today's local prayer times…",
    prayerReady: "Local prayer times are ready. Five reminders are scheduled.",
    prayerUsingCurrentLocation: "Using your current location",
    prayerUsingSavedLocation: "Using your saved location",
    prayerUsingSelectedCity: "Using your selected city",
    prayerLocationUpdated: "Last updated {time}",
    prayerCalendarSaved:
      "Calendar file downloaded. Open it to add today's five salah times.",
    prayerCalendarUnavailable:
      "Load local prayer times before saving them to your calendar.",
    prayerCalendarEvent: "{prayer} salah",
    cityPickerTitle: "Choose a city",
    cityPickerClose: "Close city picker",
    citySearchLabel: "Search for a city",
    citySearchPlaceholder: "Search any city or country",
    citySearchButton: "Search",
    citySearchPrompt: "Search for a city anywhere in the world.",
    citySearchTypeMore: "Type at least 3 characters for city suggestions.",
    citySearchLoading: "Searching cities…",
    citySearchEmpty: "No cities found. Try a different search.",
    citySearchFailed: "Could not search for cities. Please try again.",
    prayerDisabled: "Local salah reminders are turned off.",
    prayerLocationDenied:
      "Location was not available. Allow location access to set local prayer reminders.",
    prayerLoadFailed: "Could not load local prayer times. Please try again.",
    prayerAlertsBlocked:
      "Browser alerts are blocked. Reminders will still appear while this site is open.",
    prayerAlertTitle: "Time for {prayer}",
    prayerAlertBody: "A moment for salah is here.",
    prayerHint:
      "Times mark the start of each prayer and can differ from your local masjid's jama'ah schedule. Calendar saves today's displayed times. Alerts work while this site stays open.",
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
    updatePrayerTimes: "تحديث الموقع",
    changePrayerLocation: "تغيير المدينة",
    savePrayerCalendar: "الحفظ في التقويم",
    turnOffPrayerReminders: "إيقاف",
    prayerLocationPrompt:
      "فعّل التذكيرات لاستخدام موقعك وتحميل مواقيت الصلاة لليوم.",
    prayerLoading: "جارٍ تحميل مواقيت الصلاة المحلية لليوم…",
    prayerReady: "مواقيت الصلاة المحلية جاهزة وتم ضبط خمسة تذكيرات.",
    prayerUsingCurrentLocation: "يتم استخدام موقعك الحالي",
    prayerUsingSavedLocation: "يتم استخدام موقعك المحفوظ",
    prayerUsingSelectedCity: "يتم استخدام مدينتك المختارة",
    prayerLocationUpdated: "آخر تحديث {time}",
    prayerCalendarSaved:
      "تم تنزيل ملف التقويم. افتحه لإضافة مواقيت الصلاة الخمسة لليوم.",
    prayerCalendarUnavailable:
      "حمّل مواقيت الصلاة المحلية قبل حفظها في التقويم.",
    prayerCalendarEvent: "صلاة {prayer}",
    cityPickerTitle: "اختر مدينة",
    cityPickerClose: "إغلاق اختيار المدينة",
    citySearchLabel: "ابحث عن مدينة",
    citySearchPlaceholder: "ابحث عن أي مدينة أو بلد",
    citySearchButton: "بحث",
    citySearchPrompt: "ابحث عن مدينة في أي مكان في العالم.",
    citySearchTypeMore: "اكتب ثلاثة أحرف على الأقل لاقتراحات المدن.",
    citySearchLoading: "جارٍ البحث عن مدن…",
    citySearchEmpty: "لم يتم العثور على مدن. جرّب بحثًا آخر.",
    citySearchFailed: "تعذّر البحث عن المدن. حاول مرة أخرى.",
    prayerDisabled: "تم إيقاف تذكيرات الصلاة المحلية.",
    prayerLocationDenied:
      "تعذّر الوصول إلى الموقع. اسمح بالوصول إلى الموقع لضبط تذكيرات الصلاة المحلية.",
    prayerLoadFailed: "تعذّر تحميل مواقيت الصلاة المحلية. حاول مرة أخرى.",
    prayerAlertsBlocked:
      "تنبيهات المتصفح محجوبة. ستظهر التذكيرات أثناء بقاء الموقع مفتوحًا.",
    prayerAlertTitle: "حان وقت {prayer}",
    prayerAlertBody: "حان وقت الصلاة.",
    prayerHint:
      "تشير الأوقات إلى بداية كل صلاة وقد تختلف عن جدول الجماعة في المسجد المحلي. يحفظ التقويم مواقيت اليوم المعروضة. تعمل التنبيهات أثناء بقاء الموقع مفتوحًا.",
  },
};

const els = {
  quoteCard: document.getElementById("quoteCard"),
  quoteEn: document.getElementById("quoteEn"),
  quoteAr: document.getElementById("quoteAr"),
  quoteReference: document.getElementById("quoteReference"),
  newInspirationBtn: document.getElementById("newInspirationBtn"),
  shareBtn: document.getElementById("shareBtn"),
  favoritesBtn: document.getElementById("favoritesBtn"),
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
  prayerChangeBtn: document.getElementById("prayerChangeBtn"),
  prayerCalendarBtn: document.getElementById("prayerCalendarBtn"),
  prayerDisableBtn: document.getElementById("prayerDisableBtn"),
  cityPicker: document.getElementById("cityPicker"),
  cityPickerCloseBtn: document.getElementById("cityPickerCloseBtn"),
  citySearchForm: document.getElementById("citySearchForm"),
  citySearchInput: document.getElementById("citySearchInput"),
  citySearchStatus: document.getElementById("citySearchStatus"),
  citySearchResults: document.getElementById("citySearchResults"),
  prayerLocationDetails: document.getElementById("prayerLocationDetails"),
  prayerLocationName: document.getElementById("prayerLocationName"),
  prayerLocationUpdated: document.getElementById("prayerLocationUpdated"),
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
let prayerLocationName = localStorage.getItem("noortech-prayer-location-name") || "";
let prayerLocationUpdatedAt =
  localStorage.getItem("noortech-prayer-location-updated-at") || "";
let prayerLocationMode =
  localStorage.getItem("noortech-prayer-location-mode") || "saved";
let prayerLocationTimezone =
  localStorage.getItem("noortech-prayer-location-timezone") ||
  Intl.DateTimeFormat().resolvedOptions().timeZone ||
  "UTC";
let prayerLocationIsCurrent = false;
let prayerRemindersEnabled =
  localStorage.getItem("noortech-prayer-reminders-enabled") === "true";
let prayerTimers = {};
let prayerRefreshTimer = null;
let citySearchRequestId = 0;
let citySearchTimer = null;
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

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (dict[key]) node.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria-label");
    if (dict[key]) node.setAttribute("aria-label", dict[key]);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  renderQuote(false);
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

async function shareVerse() {
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
  }
}

async function copyVerseLink() {
  try {
    await navigator.clipboard.writeText(`${getVerseShareText()}\n${getVerseShareUrl()}`);
    showToast(i18n[lang].linkCopied);
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

function formatPrayerLocationUpdatedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(lang === "ar" ? "ar" : undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function renderPrayerLocation() {
  const hasLocation = prayerRemindersEnabled && isValidPrayerLocation(prayerLocation);
  els.prayerLocationDetails.hidden = !hasLocation;
  if (!hasLocation) return;

  const source = prayerLocationIsCurrent
    ? i18n[lang].prayerUsingCurrentLocation
    : prayerLocationMode === "manual"
      ? i18n[lang].prayerUsingSelectedCity
      : i18n[lang].prayerUsingSavedLocation;
  els.prayerLocationName.textContent = prayerLocationName
    ? `${source} · ${prayerLocationName}`
    : source;

  const updatedAt = formatPrayerLocationUpdatedAt(prayerLocationUpdatedAt);
  els.prayerLocationUpdated.textContent = updatedAt
    ? i18n[lang].prayerLocationUpdated.replace("{time}", updatedAt)
    : "";
  els.prayerLocationUpdated.hidden = !updatedAt;
}

function getCityLabel(city) {
  return [city.name, city.admin1, city.country]
    .filter((part, index, parts) => part && parts.indexOf(part) === index)
    .join(", ");
}

function setCitySearchStatus(message = "") {
  els.citySearchStatus.textContent = message;
}

function setCityPickerOpen(isOpen) {
  els.cityPicker.hidden = !isOpen;
  els.prayerChangeBtn.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    setCitySearchStatus(i18n[lang].citySearchPrompt);
    window.setTimeout(() => els.citySearchInput.focus(), 0);
  }
}

function clearCitySearchResults() {
  els.citySearchResults.replaceChildren();
}

function renderCitySearchResults(results) {
  clearCitySearchResults();

  results.forEach((city) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "city-search-result";

    const name = document.createElement("span");
    name.className = "city-result-name";
    name.textContent = city.name;

    const detail = document.createElement("span");
    detail.className = "city-result-detail";
    detail.textContent = [city.admin1, city.country]
      .filter((part, index, parts) => part && parts.indexOf(part) === index)
      .join(", ");

    button.append(name, detail);
    button.addEventListener("click", () => selectPrayerCity(city));
    els.citySearchResults.append(button);
  });
}

async function searchCities(query, minimumLength = 2) {
  if (query.length < minimumLength) {
    clearCitySearchResults();
    setCitySearchStatus(i18n[lang].citySearchPrompt);
    return;
  }

  const requestId = ++citySearchRequestId;
  clearCitySearchResults();
  setCitySearchStatus(i18n[lang].citySearchLoading);

  try {
    const response = await fetch(
      `${CITY_SEARCH_API_BASE}?name=${encodeURIComponent(query)}&count=6&language=${lang}&format=json`
    );
    if (!response.ok) throw new Error("City search request failed");

    const result = await response.json();
    if (requestId !== citySearchRequestId) return;

    const cities = Array.isArray(result.results)
      ? result.results.filter(
          (city) => Number.isFinite(city.latitude) && Number.isFinite(city.longitude)
        )
      : [];
    if (!cities.length) {
      setCitySearchStatus(i18n[lang].citySearchEmpty);
      return;
    }

    renderCitySearchResults(cities);
    setCitySearchStatus("");
  } catch {
    if (requestId === citySearchRequestId) {
      setCitySearchStatus(i18n[lang].citySearchFailed);
    }
  }
}

function submitCitySearch(event) {
  event.preventDefault();
  clearTimeout(citySearchTimer);
  searchCities(els.citySearchInput.value.trim());
}

function queueCitySearch() {
  clearTimeout(citySearchTimer);
  ++citySearchRequestId;

  const query = els.citySearchInput.value.trim();
  if (!query) {
    clearCitySearchResults();
    setCitySearchStatus(i18n[lang].citySearchPrompt);
    return;
  }

  if (query.length < 3) {
    clearCitySearchResults();
    setCitySearchStatus(i18n[lang].citySearchTypeMore);
    return;
  }

  citySearchTimer = window.setTimeout(() => searchCities(query, 3), 300);
}

async function loadPrayerLocationName() {
  if (!isValidPrayerLocation(prayerLocation)) return;

  const { latitude, longitude } = prayerLocation;
  const locationKey = `${latitude},${longitude}`;
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&localityLanguage=${lang}`
    );
    if (!response.ok) throw new Error("Location name request failed");

    const result = await response.json();
    if (
      `${prayerLocation?.latitude},${prayerLocation?.longitude}` !== locationKey
    ) {
      return;
    }
    const locality = result.city || result.locality || result.principalSubdivision;
    const region = result.principalSubdivision;
    const locationParts = [locality, region].filter(
      (part, index, parts) => part && parts.indexOf(part) === index
    );
    prayerLocationName = locationParts.join(", ");
    if (prayerLocationName) {
      localStorage.setItem("noortech-prayer-location-name", prayerLocationName);
      renderPrayerLocation();
    }
  } catch {
    // The city label is optional; prayer times still use the approved coordinates.
  }
}

function getPrayerTimeZone() {
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: prayerLocationTimezone }).format();
    return prayerLocationTimezone;
  } catch {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  }
}

function getZonedDateParts(date, timeZone = getPrayerTimeZone(), includeTime = false) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(includeTime
      ? { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }
      : {}),
  });
  const values = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour || 0,
    minute: values.minute || 0,
    second: values.second || 0,
  };
}

function getTimeZoneOffsetMs(timeZone, date) {
  const parts = getZonedDateParts(date, timeZone, true);
  return (
    Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second
    ) - date.getTime()
  );
}

function getDateForZonedTime(parts, timeZone = getPrayerTimeZone()) {
  const utcGuess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second || 0
  );
  let result = new Date(utcGuess - getTimeZoneOffsetMs(timeZone, new Date(utcGuess)));
  result = new Date(utcGuess - getTimeZoneOffsetMs(timeZone, result));
  return result;
}

function getPrayerApiDate() {
  const date = getZonedDateParts(new Date());
  return [
    String(date.day).padStart(2, "0"),
    String(date.month).padStart(2, "0"),
    date.year,
  ].join("-");
}

function getPrayerTimeDate(time, dayOffset = 0) {
  const [hours, minutes] = cleanPrayerTime(time).split(":").map(Number);
  const timeZone = getPrayerTimeZone();
  const today = getZonedDateParts(new Date(), timeZone);
  const date = new Date(Date.UTC(today.year, today.month - 1, today.day + dayOffset));
  return getDateForZonedTime(
    {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: hours,
      minute: minutes,
      second: 0,
    },
    timeZone
  );
}

function renderPrayerTimes() {
  if (!prayerTimings) {
    els.prayerGrid.innerHTML = "";
    els.prayerCalendarBtn.hidden = true;
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
  els.prayerCalendarBtn.hidden = !prayerRemindersEnabled;
}

function renderPrayerReminders() {
  const savedMethod = localStorage.getItem("noortech-prayer-method") || "3";
  els.prayerMethod.value = savedMethod;
  els.prayerDisableBtn.hidden = !prayerRemindersEnabled;
  renderPrayerTimes();
  renderPrayerLocation();

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
    if (target <= new Date()) target = getPrayerTimeDate(prayerTimings[id], 1);

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

function formatIcsUtc(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("") +
    "T" +
    [
      String(date.getUTCHours()).padStart(2, "0"),
      String(date.getUTCMinutes()).padStart(2, "0"),
      String(date.getUTCSeconds()).padStart(2, "0"),
    ].join("") +
    "Z";
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function savePrayerCalendar() {
  if (!prayerTimings) {
    showToast(i18n[lang].prayerCalendarUnavailable);
    return;
  }

  const now = new Date();
  const dateParts = getZonedDateParts(now);
  const dateKey = `${dateParts.year}${String(dateParts.month).padStart(2, "0")}${String(
    dateParts.day
  ).padStart(2, "0")}`;
  const location = prayerLocationName || i18n[lang].prayerUsingCurrentLocation;
  const events = PRAYERS.map(({ id }) => {
    const start = getPrayerTimeDate(prayerTimings[id]);
    const end = new Date(start.getTime() + 15 * 60 * 1000);
    const title = i18n[lang].prayerCalendarEvent.replace("{prayer}", getPrayerName(id));
    return [
      "BEGIN:VEVENT",
      `UID:noortech-${dateKey}-${id.toLowerCase()}@noortech`,
      `DTSTAMP:${formatIcsUtc(now)}`,
      `DTSTART:${formatIcsUtc(start)}`,
      `DTEND:${formatIcsUtc(end)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs("Prayer time from NoorTech.")}`,
      `LOCATION:${escapeIcs(location)}`,
      "END:VEVENT",
    ].join("\r\n");
  });
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NoorTech//Salah Times//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  const file = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `noortech-salah-${dateKey}.ics`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(i18n[lang].prayerCalendarSaved);
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
    const apiTimezone = result.data?.meta?.timezone;
    if (apiTimezone) {
      prayerLocationTimezone = apiTimezone;
      localStorage.setItem("noortech-prayer-location-timezone", prayerLocationTimezone);
    }
    renderPrayerTimes();
    renderPrayerLocation();
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

  prayerLocationIsCurrent = false;
  renderPrayerLocation();
  els.prayerStatus.textContent = i18n[lang].prayerLoading;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      prayerLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      prayerLocationName = "";
      prayerLocationUpdatedAt = new Date().toISOString();
      prayerLocationMode = "device";
      prayerLocationTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      prayerLocationIsCurrent = true;
      localStorage.setItem("noortech-prayer-location", JSON.stringify(prayerLocation));
      localStorage.removeItem("noortech-prayer-location-name");
      localStorage.setItem("noortech-prayer-location-updated-at", prayerLocationUpdatedAt);
      localStorage.setItem("noortech-prayer-location-mode", prayerLocationMode);
      localStorage.setItem("noortech-prayer-location-timezone", prayerLocationTimezone);
      renderPrayerLocation();
      loadLocalPrayerTimes();
      loadPrayerLocationName();
    },
    () => {
      els.prayerStatus.textContent = i18n[lang].prayerLocationDenied;
      showToast(i18n[lang].prayerLocationDenied);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 3600000 }
  );
}

function activatePrayerReminders() {
  prayerRemindersEnabled = true;
  localStorage.setItem("noortech-prayer-reminders-enabled", "true");
  els.prayerDisableBtn.hidden = false;
  requestPrayerNotificationPermission();
}

function enablePrayerReminders() {
  activatePrayerReminders();
  requestPrayerLocation();
}

function updatePrayerTimes() {
  requestPrayerLocation();
}

function selectPrayerCity(city) {
  const latitude = Number(city.latitude);
  const longitude = Number(city.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

  activatePrayerReminders();
  clearPrayerSchedules();
  prayerTimings = null;
  prayerLocation = { latitude, longitude };
  prayerLocationName = getCityLabel(city);
  prayerLocationUpdatedAt = new Date().toISOString();
  prayerLocationMode = "manual";
  prayerLocationTimezone = city.timezone || getPrayerTimeZone();
  prayerLocationIsCurrent = false;
  localStorage.setItem("noortech-prayer-location", JSON.stringify(prayerLocation));
  localStorage.setItem("noortech-prayer-location-name", prayerLocationName);
  localStorage.setItem("noortech-prayer-location-updated-at", prayerLocationUpdatedAt);
  localStorage.setItem("noortech-prayer-location-mode", prayerLocationMode);
  localStorage.setItem("noortech-prayer-location-timezone", prayerLocationTimezone);
  renderPrayerTimes();
  renderPrayerLocation();
  setCityPickerOpen(false);
  clearCitySearchResults();
  setCitySearchStatus("");
  loadLocalPrayerTimes();
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
els.shareBtn.addEventListener("click", shareVerse);
els.favoritesBtn.addEventListener("click", toggleFavorite);
els.prayerEnableBtn.addEventListener("click", enablePrayerReminders);
els.prayerRefreshBtn.addEventListener("click", updatePrayerTimes);
els.prayerCalendarBtn.addEventListener("click", savePrayerCalendar);
els.prayerChangeBtn.addEventListener("click", () => {
  setCityPickerOpen(els.cityPicker.hidden);
});
els.cityPickerCloseBtn.addEventListener("click", () => setCityPickerOpen(false));
els.citySearchForm.addEventListener("submit", submitCitySearch);
els.citySearchInput.addEventListener("input", queueCitySearch);
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

/* Init */
applyI18n();
loadRandomVerse(false, getVerseNumberFromUrl());
if (prayerRemindersEnabled && isValidPrayerLocation(prayerLocation)) {
  loadLocalPrayerTimes();
  if (!prayerLocationName) loadPrayerLocationName();
}
setVolume(els.volumeSlider.value);
loadTrack(trackIndex, false);
