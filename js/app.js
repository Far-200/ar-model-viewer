const viewer = document.getElementById("airplaneViewer");
const toggleRotateBtn = document.getElementById("toggleRotateBtn");
const gyroBtn = document.getElementById("gyroBtn");
const flightModeBtn = document.getElementById("flightModeBtn");

const arGyroBtn = document.getElementById("arGyroBtn");
const arFlightModeBtn = document.getElementById("arFlightModeBtn");

let isAutoRotating = true;
let gyroEnabled = false;
let flightMode = false;
let flightAnimationId = null;
let isInAR = false;

let baseAlpha = null;
let baseBeta = null;
let flightTime = 0;

toggleRotateBtn.addEventListener("click", () => {
  if (isAutoRotating) {
    viewer.removeAttribute("auto-rotate");
    toggleRotateBtn.textContent = "Start Auto-Rotate";
  } else {
    viewer.setAttribute("auto-rotate", "");
    toggleRotateBtn.textContent = "Pause Auto-Rotate";
  }

  isAutoRotating = !isAutoRotating;
});

function handleOrientation(event) {
  if (!gyroEnabled || flightMode) return;

  const alpha = event.alpha ?? 0;
  const beta = event.beta ?? 0;

  if (baseAlpha === null) baseAlpha = alpha;
  if (baseBeta === null) baseBeta = beta;

  let deltaAlpha = alpha - baseAlpha;
  let deltaBeta = beta - baseBeta;

  deltaAlpha = Math.max(-20, Math.min(20, deltaAlpha));
  deltaBeta = Math.max(-15, Math.min(15, deltaBeta));

  if (isInAR) {
    const yaw = deltaAlpha * 1.2;
    const pitch = -deltaBeta * 0.5;
    viewer.setAttribute("orientation", `${pitch}deg ${yaw}deg 0deg`);
  } else {
    const horizontalAngle = deltaAlpha * 1.5;
    const verticalAngle = 75 - deltaBeta * 0.6;
    viewer.cameraOrbit = `${horizontalAngle}deg ${verticalAngle}deg 6m`;
  }
}

async function enableGyroCore(buttonEl) {
  try {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission !== "granted") {
        buttonEl.textContent = "Permission Denied";
        return;
      }
    }

    if (!gyroEnabled) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    gyroEnabled = true;
    baseAlpha = null;
    baseBeta = null;

    gyroBtn.textContent = "Gyro Enabled";
    arGyroBtn.textContent = "Gyro Enabled";
  } catch (error) {
    console.error("Gyro error:", error);
    buttonEl.textContent = "Gyro Not Supported";
  }
}

gyroBtn.addEventListener("click", () => enableGyroCore(gyroBtn));
arGyroBtn.addEventListener("click", () => enableGyroCore(arGyroBtn));

function animateFlight() {
  if (!flightMode) return;

  flightTime += 0.05;

  const pitch = Math.sin(flightTime * 1.2) * 8;
  const yaw = Math.sin(flightTime * 0.7) * 12;
  const roll = Math.sin(flightTime * 1.8) * 20;

  viewer.setAttribute("orientation", `${pitch}deg ${yaw}deg ${roll}deg`);

  flightAnimationId = requestAnimationFrame(animateFlight);
}

function startFlightCore() {
  flightMode = true;
  flightTime = 0;

  if (flightAnimationId) {
    cancelAnimationFrame(flightAnimationId);
  }

  viewer.removeAttribute("auto-rotate");
  isAutoRotating = false;
  toggleRotateBtn.textContent = "Start Auto-Rotate";

  flightModeBtn.textContent = "Stop Flight Mode";
  arFlightModeBtn.textContent = "Stop Flight";

  animateFlight();
}

function stopFlightCore() {
  flightMode = false;

  if (flightAnimationId) {
    cancelAnimationFrame(flightAnimationId);
    flightAnimationId = null;
  }

  viewer.setAttribute("orientation", "0deg 0deg 0deg");
  viewer.setAttribute("auto-rotate", "");
  isAutoRotating = true;

  toggleRotateBtn.textContent = "Pause Auto-Rotate";
  flightModeBtn.textContent = "Start Flight Mode";
  arFlightModeBtn.textContent = "Start Flight";
}

flightModeBtn.addEventListener("click", () => {
  if (flightMode) stopFlightCore();
  else startFlightCore();
});

arFlightModeBtn.addEventListener("click", () => {
  if (flightMode) stopFlightCore();
  else startFlightCore();
});

viewer.addEventListener("ar-status", (event) => {
  const status = event.detail.status;
  isInAR = status === "session-started";

  if (!isInAR) {
    baseAlpha = null;
    baseBeta = null;
  }
});
