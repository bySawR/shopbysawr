// Define the sectors with the same values as the original
const sectors = [
  {
    color: "#0079FF",
    text: "#FFFFFF",
    label: "25% Off",
    code: "HC36PIX4QW-25",
    message: "You've won! Your 25% discount code is HC36PIX4QW-25"
  },
  { color: "#B2D7FF", text: "#1C172C", label: "You lose", code: "", message: "Try again tomorrow!" },
  {
    color: "#0079FF",
    text: "#FFFFFF",
    label: "50% Off",
    code: "QDHHGTV066-50",
    message: "You've won! Your 50% discount code is QDHHGTV066-50"
  },
  { color: "#B2D7FF", text: "#1C172C", label: "You lose", code: "", message: "Better luck next time!" },
  {
    color: "#0079FF",
    text: "#FFFFFF",
    label: "75% Off",
    code: "H4R37FT2R6-75",
    message: "You've won! Your 75% discount code is H4R37FT2R6-75"
  },
  { color: "#B2D7FF", text: "#1C172C", label: "You lose", code: "", message: "No win, try again tomorrow!" }
];

// DOM elements
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const wheelCenterText = document.getElementById('wheel-center-text');
const controlsTitle = document.getElementById('controls-title');
const countdownContainer = document.getElementById('countdown-container');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const prizeMessageElement = document.getElementById('prize-message');

// Variables
let canSpin = false;
let isSpinning = false;
let rotation = 0;
let animationId = null;
let countdownInterval = null;
let timeLeft = 0;

// Initialize the wheel
function initWheel() {
  drawWheel();
  checkSpinStatus();
}

// Draw the wheel
function drawWheel() {
  const width = canvas.width;
  const height = canvas.height;
  const radius = width / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const arcAngle = (2 * Math.PI) / sectors.length;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw sectors
  sectors.forEach((sector, i) => {
    const startAngle = i * arcAngle;
    const endAngle = (i + 1) * arcAngle;

    // Draw sector
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = sector.color;
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + arcAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 24px Poppins, sans-serif";
    ctx.fillText(sector.label, radius - 30, 10);
    ctx.restore();
  });
}

// Check if user can spin
function checkSpinStatus() {
  const lastSpinTime = localStorage.getItem("lastSpinTime")
    ? new Date(localStorage.getItem("lastSpinTime"))
    : null;

  if (!lastSpinTime) {
    enableSpin();
    return;
  }

  const nextSpinTime = new Date(lastSpinTime.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();

  if (now < nextSpinTime) {
    disableSpin();
    timeLeft = nextSpinTime.getTime() - now.getTime();
    startCountdown();
    
    // Check if there was a previous message
    const lastMessage = localStorage.getItem("lastMessage");
    if (lastMessage) {
      showPrizeMessage(lastMessage, localStorage.getItem("lastPrizeCode") || "");
    }
  } else {
    enableSpin();
  }
}

// Enable spin
function enableSpin() {
  canSpin = true;
  spinButton.disabled = false;
  countdownContainer.classList.add('hidden');
  spinButton.classList.remove('hidden');
  controlsTitle.textContent = "Try Your Luck!";
}

// Disable spin
function disableSpin() {
  canSpin = false;
  spinButton.disabled = true;
  countdownContainer.classList.remove('hidden');
  spinButton.classList.add('hidden');
  controlsTitle.textContent = "Next Spin Available In:";
}

// Start countdown
function startCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  updateCountdown();

  countdownInterval = setInterval(() => {
    timeLeft -= 1000;
    
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      enableSpin();
      return;
    }
    
    updateCountdown();
  }, 1000);
}

// Update countdown display
function updateCountdown() {
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Spin the wheel
function spinWheel() {
  if (!canSpin || isSpinning) return;

  isSpinning = true;
  wheelCenterText.textContent = "...";
  prizeMessageElement.classList.add('hidden');
  
  // Calculate a random number of full rotations (5-10)
  const fullRotations = Math.floor(Math.random() * 5) + 5;
  
  // Randomly select a sector
  const selectedIndex = Math.floor(Math.random() * sectors.length);
  const selectedSector = sectors[selectedIndex];
  
  // Calculate the target rotation
  // We add fullRotations * 2π for the full rotations, then add the sector angle
  const sectorAngle = (2 * Math.PI / sectors.length) * selectedIndex;
  const targetRotation = rotation + (fullRotations * 2 * Math.PI) + (2 * Math.PI - sectorAngle) + Math.PI;
  
  // Start the animation with optimized performance
  let startTime = null;
  const duration = 3000; // 3 seconds for smoother animation
  
  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for a natural slowdown
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const currentRotation = rotation + (targetRotation - rotation) * easeOut(progress);
    
    // Apply rotation to the canvas
    canvas.style.transform = `rotate(${currentRotation}rad)`;
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      // Animation complete
      rotation = targetRotation % (2 * Math.PI);
      isSpinning = false;
      wheelCenterText.textContent = "SPIN";
      
      // Save spin time and result
      const now = new Date();
      localStorage.setItem("lastSpinTime", now.toString());
      localStorage.setItem("lastMessage", selectedSector.message);
      if (selectedSector.code) {
        localStorage.setItem("lastPrizeCode", selectedSector.code);
      }
      
      // Show result
      showPrizeMessage(selectedSector.message, selectedSector.code);
      
      // Start countdown
      disableSpin();
      timeLeft = 24 * 60 * 60 * 1000;
      startCountdown();
    }
  };
  
  animationId = requestAnimationFrame(animate);
}

// Show prize message
function showPrizeMessage(message, code) {
  const isWin = code !== "";
  
  let html = '';
  
  if (isWin) {
    html += `
      <div class="prize-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M8 21h8"></path>
          <path d="M12 21v-8"></path>
          <path d="M17 5H7.5a2.5 2.5 0 0 1 0-5C11 0 12 2 12 2s1-2 4.5-2a2.5 2.5 0 0 1 0 5"></path>
          <path d="M17 3v8.4c0 1.7-.4 3.4-1 5"></path>
          <path d="M7 3v8.4c0 1.7.4 3.4 1 5"></path>
        </svg>
        <h3>Congratulations!</h3>
      </div>
    `;
  }
  
  html += `<p class="prize-text">${message}</p>`;
  
  if (isWin && code) {
    html += `
      <div class="code-container">
        <div class="code-text">${code}</div>
        <button class="copy-button" aria-label="Copy code" onclick="copyCode('${code}', this)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
          </svg>
        </button>
      </div>
    `;
  }
  
  prizeMessageElement.innerHTML = html;
  prizeMessageElement.classList.remove('hidden');
}

// Copy code to clipboard
function copyCode(code, button) {
  navigator.clipboard.writeText(code).then(() => {
    // Show copied state
    button.classList.add('copied');
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      `;
    }, 2000);
  });
}

// Event listeners
spinButton.addEventListener('click', spinWheel);

// Make copyCode function globally available
window.copyCode = copyCode;

// Initialize
initWheel();