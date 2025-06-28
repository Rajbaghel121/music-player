let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let currentStream;
let useFrontCamera = true;
let flashEnabled = false;

async function startCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: useFrontCamera ? "user" : "environment"
      }
    });
    video.srcObject = currentStream;
  } catch (e) {
    alert("Camera not accessible: " + e);
  }
}

function toggleCamera() {
  useFrontCamera = !useFrontCamera;
  startCamera();
}

function toggleFlash() {
  // Real flash only works in native apps. This simulates it.
  flashEnabled = !flashEnabled;
  video.style.filter = flashEnabled ? "brightness(150%)" : "none";
}

function applyFilter(filter) {
  video.style.filter = filter;
}

function capturePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let context = canvas.getContext("2d");
  context.filter = video.style.filter;
  context.drawImage(video, 0, 0);
}

function downloadPhoto() {
  capturePhoto(); // Ensure latest frame
  const link = document.createElement("a");
  link.download = "captured-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

startCamera();
