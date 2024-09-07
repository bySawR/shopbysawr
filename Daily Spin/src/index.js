const sectors = [
  { color: "#0079FF", text: "#1C172C", label: "25% Off", code: "HC36PIX4QW-25", message: "You've won! Your 25% discount code is HC36PIX4QW-25" },
  { color: "#B2D7FF", text: "#1C172C", label: "You lose", code: "", message: "Try again tomorrow!" },
  { color: "#0079FF", text: "#1C172C", label: "50% Off", code: "QDHHGTV066-50", message: "You've won! Your 50% discount code is QDHHGTV066-50" },
  { color: "#B2D7FF", text: "#1C172C", label: "You lose", code: "", message: "Better luck next time!" },
  { color: "#0079FF", text: "#1C172C", label: "75% Off", code: "H4R37FT2R6-75", message: "You've won! Your 75% discount code is H4R37FT2R6-75" },
  { color: "#B2D7FF", text: "#1C172C", label: "You lose", code: "", message: "No win, try again tomorrow!" }
];

const events = {
  listeners: {},
  addListener: function (eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  },
  fire: function (eventName, ...args) {
    if (this.listeners[eventName]) {
      for (let fn of this.listeners[eventName]) {
        fn(...args);
      }
    }
  }
};

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991;
let angVel = 0;
let ang = 0;

let spinButtonClicked = false;
let lastSpinTime = localStorage.getItem("lastSpinTime") ? new Date(localStorage.getItem("lastSpinTime")) : null;
let currentMessage = ""; // Variable to store the current message

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();

  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = sector.text;
  ctx.font = "bold 30px 'Lato', sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);
  ctx.restore();
}

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

  spinEl.textContent = !angVel ? "SPIN" : sector.label;
  spinEl.style.background = sector.color;
  spinEl.style.color = sector.text;
}

function frame() {
  if (!angVel && spinButtonClicked) {
    const finalSector = sectors[getIndex()];
    events.fire("spinEnd", finalSector);
    spinButtonClicked = false;
    return;
  }

  angVel *= friction;
  if (angVel < 0.002) angVel = 0;
  ang += angVel;
  ang %= TAU;
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate();
  engine();
  spinEl.addEventListener("click", spin);
  updateSpinStatus(); // Update spin status on page load
}

function spin() {
  if (canSpin()) {
    if (!angVel) angVel = rand(0.25, 0.45);
    spinButtonClicked = true;
    const now = new Date();
    localStorage.setItem("lastSpinTime", now);
    updateSpinStatus();
  } else {
    document.querySelector("#message").innerHTML = "You've already spun the wheel! Please try again in 24 hours.";
  }
}

function canSpin() {
  if (!lastSpinTime) return true;
  const now = new Date();
  const diff = now - lastSpinTime;
  return diff > 24 * 60 * 60 * 1000; // 24 hours in milliseconds
}

function updateSpinStatus() {
  lastSpinTime = localStorage.getItem("lastSpinTime") ? new Date(localStorage.getItem("lastSpinTime")) : null;
  const nextSpinTime = new Date(lastSpinTime.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  if (now < nextSpinTime) {
    const timeLeft = nextSpinTime - now;
    displayCountdown(timeLeft);
  } else {
    document.querySelector("#spin").textContent = "SPIN";
    document.querySelector("#message").innerHTML = currentMessage; // Display the current message if available
  }
}

function displayCountdown(timeLeft) {
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  document.querySelector("#message").innerHTML = `Next spin in ${hours}h ${minutes}m ${seconds}s<br>${currentMessage}`;
  setTimeout(() => {
    updateSpinStatus();
  }, 1000);
}

events.addListener("spinEnd", (sector) => {
  currentMessage = sector.message; // Store the message to be shown alongside the countdown
  document.querySelector("#message").innerHTML = sector.message; // Show the message immediately
});

init();
