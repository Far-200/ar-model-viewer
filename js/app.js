const viewer = document.getElementById("airplaneViewer");
const toggleRotateBtn = document.getElementById("toggleRotateBtn");

let isAutoRotating = true;

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
