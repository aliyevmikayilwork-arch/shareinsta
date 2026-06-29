const instagramUrl = "https://www.instagram.com/amdevelopersgroup/";

const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const modalBackdrop = document.querySelector("#modalBackdrop");
const closeModal = document.querySelector("#closeModal");
const instagramLink = document.querySelector("#instagramLink");

instagramLink.href = instagramUrl;

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function getSafePosition() {
  const buttonRect = noBtn.getBoundingClientRect();
  const padding = 18;
  const footerSafeZone = 82;

  const maxX = Math.max(padding, window.innerWidth - buttonRect.width - padding);
  const maxY = Math.max(padding, window.innerHeight - buttonRect.height - footerSafeZone);

  let x = randomBetween(padding, maxX);
  let y = randomBetween(padding, maxY);

  const yesRect = yesBtn.getBoundingClientRect();
  const tooCloseToYes =
    x < yesRect.right + 36 &&
    x + buttonRect.width > yesRect.left - 36 &&
    y < yesRect.bottom + 36 &&
    y + buttonRect.height > yesRect.top - 36;

  if (tooCloseToYes) {
    x = x < window.innerWidth / 2 ? maxX : padding;
    y = y < window.innerHeight / 2 ? maxY : padding;
  }

  return { x, y };
}

function teleportNoButton() {
  const { x, y } = getSafePosition();
  noBtn.classList.add("btn-floating");
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `rotate(${randomBetween(-8, 8)}deg) scale(1.02)`;
}

function openInstagramModal() {
  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeModal.focus({ preventScroll: true });
}

function closeInstagramModal() {
  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  yesBtn.focus({ preventScroll: true });
}

["pointerenter", "pointerdown", "touchstart", "focus"].forEach((eventName) => {
  noBtn.addEventListener(eventName, (event) => {
    event.preventDefault();
    teleportNoButton();
  }, { passive: false });
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  teleportNoButton();
});

yesBtn.addEventListener("click", openInstagramModal);
closeModal.addEventListener("click", closeInstagramModal);

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) closeInstagramModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalBackdrop.classList.contains("show")) {
    closeInstagramModal();
  }
});

window.addEventListener("resize", () => {
  if (noBtn.classList.contains("btn-floating")) {
    teleportNoButton();
  }
});
