// ── Sparkle cursor ──
let lastX = 0;
let lastY = 0;
let lastMoveTime = 0;

document.addEventListener("mousemove", function (e) {
  const now = Date.now();
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 6 && now - lastMoveTime < 16) return;

  lastX = e.clientX;
  lastY = e.clientY;
  lastMoveTime = now;

  createSparkle(e.clientX, e.clientY);

  if (distance > 18) {
    createSparkle(e.clientX - dx * 0.3, e.clientY - dy * 0.3, true);
  }

  if (distance > 32) {
    createSparkle(e.clientX - dx * 0.55, e.clientY - dy * 0.55, false, true);
  }
});

function createSparkle(x, y, small = false, large = false) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.textContent = "×";

  if (small) sparkle.classList.add("small");
  if (large) sparkle.classList.add("large");

  const randomOffsetX = (Math.random() - 0.5) * 10;
  const randomOffsetY = (Math.random() - 0.5) * 10;

  sparkle.style.left = `${x + randomOffsetX}px`;
  sparkle.style.top = `${y + randomOffsetY}px`;

  document.body.appendChild(sparkle);

  sparkle.addEventListener("animationend", () => {
    sparkle.remove();
  });
}

// ── Hamburger menu ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileOverlay = document.getElementById("mobileOverlay");

function openMenu() {
  mobileMenu.classList.add("open");
  mobileOverlay.classList.add("open");
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  mobileOverlay.classList.remove("open");
}

if (hamburger) hamburger.addEventListener("click", openMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMenu);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// ── Works carousel ──
const worksStack = document.getElementById("worksStack");

if (worksStack && window.innerWidth <= 760) {
  const cards = Array.from(worksStack.querySelectorAll(".work-card"));
  let current = 0;

  function updatePositions() {
    cards.forEach((card, i) => {
      const pos = (i - current + cards.length) % cards.length;
      card.setAttribute("data-pos", pos);
    });
  }

  updatePositions();

  worksStack.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    updatePositions();
  });
}

// ── Copy email ──
const copyEmailBtn = document.getElementById("copyEmailBtn");

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("seliindoris@gmail.com");
      copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      }, 1200);
    } catch (error) {
      alert("Copy failed");
    }
  });
}

// ── Custom scrollbar ──
const scrollThumb = document.getElementById("scrollThumb");
const scrollTrack = document.getElementById("scrollTrack");
const scrollUp = document.getElementById("scrollUp");
const scrollDown = document.getElementById("scrollDown");

function updateThumb() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const trackHeight = scrollTrack.offsetHeight;
  const thumbHeight = Math.max(30, (window.innerHeight / document.documentElement.scrollHeight) * trackHeight);
  const thumbTop = (scrollTop / docHeight) * (trackHeight - thumbHeight);
  scrollThumb.style.height = thumbHeight + "px";
  scrollThumb.style.top = thumbTop + "px";
}

window.addEventListener("scroll", updateThumb);
window.addEventListener("resize", updateThumb);
updateThumb();

scrollUp.addEventListener("click", () => {
  window.scrollBy({ top: -60, behavior: "smooth" });
});

scrollDown.addEventListener("click", () => {
  window.scrollBy({ top: 60, behavior: "smooth" });
});

let isDragging = false;
let dragStartY = 0;
let dragStartScroll = 0;

scrollThumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStartY = e.clientY;
  dragStartScroll = window.scrollY;
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const trackHeight = scrollTrack.offsetHeight;
  const thumbHeight = scrollThumb.offsetHeight;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const delta = ((e.clientY - dragStartY) / (trackHeight - thumbHeight)) * docHeight;
  window.scrollTo({ top: dragStartScroll + delta });
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// ── Mobile scrollbar hide/show ──
const customScrollbar = document.getElementById("customScrollbar");
let scrollTimer;

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 760) {
    customScrollbar.style.opacity = "1";
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      customScrollbar.style.opacity = "0";
    }, 1000);
  }
});

// ── Typing effect ──
const h1 = document.querySelector("h1");

if (h1) {
  const fullText = "SELIIN-DORIS\nTŠINJAKOV";
  h1.textContent = "";
  h1.style.whiteSpace = "pre-line";
  let i = 0;

  function type() {
    if (i < fullText.length) {
      h1.textContent += fullText[i];
      i++;
      setTimeout(type, 80);
    }
  }

  setTimeout(type, 300);
}

// ── Education dots animation ──
const educationTitle = document.querySelector(".education-title span");

if (educationTitle) {
  let dots = 0;
  setInterval(() => {
    dots = (dots + 1) % 4;
    educationTitle.textContent = "Education" + ".".repeat(dots);
  }, 500);
}