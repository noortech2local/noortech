const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu]");
const navigation = document.querySelector("[data-nav]");
const dialog = document.querySelector("[data-reserve-dialog]");
const reserveForm = document.querySelector("[data-reserve-form]");
const toast = document.querySelector("[data-toast]");
const quantityOutput = document.querySelector("[data-qty]");

const useCases = {
  landmarks: {
    icon: "01",
    title: "Riyadh’s skyline, drawn as rhythm.",
    body: "Kingdom Centre, Al Faisaliah and familiar city silhouettes form a continuous architectural horizon.",
  },
  geometry: {
    icon: "02",
    title: "Heritage without imitation.",
    body: "Islamic arches and geometric structures are simplified and repeated for a clean contemporary expression.",
  },
  palette: {
    icon: "03",
    title: "The colors of stone, shade and growth.",
    body: "Warm sand, deep green and muted gold balance the city’s natural landscape with its forward energy.",
  },
  craft: {
    icon: "04",
    title: "Fine detail, built into the weave.",
    body: "High-density nylon keeps small architectural lines legible while remaining soft, light and wearable.",
  },
};

let quantity = 1;
let lastFocusedElement = null;
let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function setMenu(open) {
  navigation.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 36),
  { passive: true },
);

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("click", (event) => {
  if (
    navigation.classList.contains("is-open") &&
    !navigation.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    setMenu(false);
  }
});

document.querySelectorAll("[data-use]").forEach((button) => {
  button.addEventListener("click", () => {
    const content = useCases[button.dataset.use];
    document.querySelectorAll("[data-use]").forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab === button));
    });
    document.querySelector("[data-use-icon]").textContent = content.icon;
    document.querySelector("[data-use-title]").textContent = content.title;
    document.querySelector("[data-use-body]").textContent = content.body;
  });
});

document.querySelectorAll("[data-city]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-city]").forEach((city) => city.classList.remove("is-active"));
    button.classList.add("is-active");
    if (button.dataset.city !== "riyadh") {
      showToast(`${button.querySelector("strong").textContent} is being developed for a future release.`);
    }
  });
});

document.querySelector("[data-qty-minus]").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  quantityOutput.textContent = quantity;
});

document.querySelector("[data-qty-plus]").addEventListener("click", () => {
  quantity = Math.min(8, quantity + 1);
  quantityOutput.textContent = quantity;
});

function openReserve(event) {
  event.preventDefault();
  lastFocusedElement = event.currentTarget;
  dialog.showModal();
  window.setTimeout(() => document.querySelector("#reserve-name").focus(), 80);
}

function closeReserve() {
  dialog.close();
  lastFocusedElement?.focus();
}

document.querySelectorAll("[data-open-reserve]").forEach((trigger) => {
  trigger.addEventListener("click", openReserve);
});

document.querySelector("[data-close-reserve]").addEventListener("click", closeReserve);

dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (outside) closeReserve();
});

reserveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = reserveForm.querySelector("[data-reserve-note]");
  note.textContent = "Thank you — this preview did not send or store your information.";
  note.style.color = "#173d34";
  reserveForm.reset();
  window.setTimeout(() => {
    closeReserve();
    showToast(`Early-access preview confirmed for ${quantity} Riyadh Edition${quantity > 1 ? "s" : ""}.`);
  }, 700);
});

document.querySelector("[data-newsletter]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  form.reset();
  form.querySelector("[data-form-note]").textContent = "Thank you — this preview did not send or store your email.";
  showToast("You’re ready for Riyadh City Series launch updates.");
});

document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5%" },
  );
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
