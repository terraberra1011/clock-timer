function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,"0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock-display").textContent =
    `${hours}:${minutes}:${seconds}`;
}

let timerInterval = null; 
let remainingSeconds = 0;
let totalSeconds = 0;

const vizSelect = document.getElementById("viz-select");
let vizMode = "waveform";

vizSelect.addEventListener("change", () => {
  vizMode = vizSelect.value;

  waveformCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
});

document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();
  const isTypingField =
    tagName === "input" || tagName === "textarea" || tagName === "select";
  if (isTypingField) return;

  const key = e.key.toLowerCase();

  if (key === "w") {
    vizMode = "waveform";
    vizSelect.value = "waveform";
  }

  if (key === "b") {
    vizMode = "bars";
    vizSelect.value = "bars";
  }

  if (key === "w" || key === "b") {
    waveformCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
  }
});

function playTimerSound(){
    const audio = document.getElementById("timer-sound");

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch((error) => {
        console.warn("Timer sound could not be played", error);
    });
}

function startTimer () {
     if (timerInterval !=null) return; 

     // Only set new time if timer is at 0 (not paused)
     if (remainingSeconds === 0) {
         const minutes = parseInt(document.getElementById("minutes").value) || 0;
         const seconds = parseInt(document.getElementById("seconds").value) ||0;

         remainingSeconds = minutes * 60 + seconds;
         totalSeconds = remainingSeconds;

         if (remainingSeconds <= 0) {
            alert("Please enter a valid time.");
            return;
         }
     }

     timerInterval = setInterval(updateTimer, 1000);
     updateTimer();
}

function updateTimer() {
    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const secs = String(remainingSeconds % 60).padStart(2, "0");

    document.getElementById("timer-display").textContent = `${mins}:${secs}`;

    const progressCircle = document.getElementById("progress-circle");
    if (totalSeconds > 0) {
        const elapsed = totalSeconds - remainingSeconds;
        const fraction = elapsed / totalSeconds;
        const angle = fraction * 360;

        progressCircle.style.setProperty("--progress", `${angle}deg`);
    } else {
        progressCircle.style.setProperty("--progress", "0deg");
    }

    if (remainingSeconds === 0) {
        playTimerSound();

        clearInterval(timerInterval);
        timerInterval = null;
        return;
    }

    remainingSeconds--;
}

function pauseTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();
    remainingSeconds = 0;
    totalSeconds = 0;

    document.getElementById("timer-display").textContent = "00:00";   

    const progressCircle = document.getElementById("progress-circle");
    progressCircle.style.setProperty("--progress", "0deg");
}

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);

const volumeSlider = document.getElementById("volume-slider");
const timerSound = document.getElementById("timer-sound");
const soundThemeSelect = document.getElementById("sound-theme");
let audioContext = null;
let analyser = null;
let dataArray = null;
let bufferLength = 0;
let waveformAnimationId = null;

const waveformCanvas = document.getElementById("sound-waveform");
const waveformCtx = waveformCanvas.getContext("2d");

const barGradientPalettes = {
  scream: ["#b3e5ff", "#2196f3", "#0d47a1"],
  bell: ["#f0b3ff", "#9c27b0", "#4a148c"],
  goldfish: ["#ffd8a8", "#ff9800", "#e65100"]
}

let currentWaveformColor = "#2196f3";
let currentBarPalette = barGradientPalettes.scream;

function setupAudioContext() {
  if (audioContext) return;

  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const source = audioContext.createMediaElementSource(timerSound);

  analyser = audioContext.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  analyser.connect(audioContext.destination);
}

function drawWaveformFrame() {
  if (!analyser) return;

  analyser.getByteTimeDomainData(dataArray);

  const width = waveformCanvas.width;
  const height = waveformCanvas.height;

  waveformCtx.fillStyle = "#ffffff";
  waveformCtx.fillRect(0, 0, width, height);

  waveformCtx.lineWidth = 2;
  waveformCtx.strokeStyle = currentWaveformColor;
  waveformCtx.beginPath();

  const sliceWidth = width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) waveformCtx.moveTo(x, y);
    else waveformCtx.lineTo(x, y);

    x += sliceWidth;
  }

  waveformCtx.stroke();
}

function drawFrequencyBarsFrame() {
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  const width = waveformCanvas.width;
  const height = waveformCanvas.height;

  waveformCtx.fillStyle = "#ffffff";
  waveformCtx.fillRect(0, 0, width, height);

  const barCount = 40;
  const step = Math.max(1, Math.floor(bufferLength / barCount));
  const barWidth = width / barCount;

  for (let i = 0; i < barCount; i++) {
    const value = dataArray[i * step] || 0;
    const barHeight = (value / 255) * height;

    const x = i * barWidth;
    const y = height - barHeight;

    const gradient = waveformCtx.createLinearGradient(0, y, 0, height);

    gradient.addColorStop(0, currentBarPalette[0]);  
    gradient.addColorStop(0.5, currentBarPalette[1]); 
    gradient.addColorStop(1, currentBarPalette[2]); 

    waveformCtx.fillStyle = gradient;
    waveformCtx.fillRect(x + 1, y, barWidth - 2, barHeight);``
  }
}

function drawWaveformOrBars() {
  if (!analyser) return;

  waveformAnimationId = requestAnimationFrame(drawWaveformOrBars);

  if (vizMode === "bars") {
    drawFrequencyBarsFrame();
  } else {
    drawWaveformFrame();
  }
}

function startWaveform() {
  setupAudioContext();

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (!waveformAnimationId) {
    drawWaveformOrBars();
  }
}

function stopWaveform() {
  if (waveformAnimationId) {
    cancelAnimationFrame(waveformAnimationId);
    waveformAnimationId = null;
  }

  const width = waveformCanvas.width;
  const height = waveformCanvas.height;
  waveformCtx.clearRect(0, 0, width, height);
}

timerSound.addEventListener("play", () => {
  startWaveform();
});

timerSound.addEventListener("pause", () => {
  stopWaveform();
});

timerSound.addEventListener("ended", () => {
  stopWaveform();
});

const soundFiles = {
    scream: "alarm-sound.mp3",
    bell: "Taco-bell-sound.mp3",
    goldfish: "the-snack-that-smiles-back.mp3"
};

const waveFormColors = {
    scream: "#2196f3",
    bell: "#9c27b0",
    goldfish: "#e07c0aff"
}

function updateSoundSource() {
    const theme = soundThemeSelect.value;
    const fileName = soundFiles[theme] || soundFiles.default;
    timerSound.src = fileName;
    timerSound.load();
  currentWaveformColor = waveFormColors[theme] || waveFormColors.scream;
  currentBarPalette = barGradientPalettes[theme] || barGradientPalettes.scream;
}
soundThemeSelect.addEventListener("change", () => {
  updateSoundSource();
});

timerSound.volume = volumeSlider.value;
volumeSlider.addEventListener("input", () => {
    timerSound.volume = volumeSlider.value;
});

// (already added above) avoid duplicate listener

updateSoundSource();

const volumeIcon = document.getElementById("volume-icon");
let lastVolume = 1;

function updateVolumeIcon(volume) {
    if (volume == 0) {
        volumeIcon.textContent = "🔇";
    } else if (volume <= 0.33) {
        volumeIcon.textContent = "🔈";
    }else if (volume <= 0.66) {
        volumeIcon.textContent = "🔉";
    } else {
        volumeIcon.textContent = "🔊";
    }
}

volumeSlider.addEventListener("input", () => {
    const vol = Number(volumeSlider.value);
    timerSound.volume = vol;
    updateVolumeIcon(vol);
});

volumeIcon.addEventListener("click", () => {
    if (timerSound.volume > 0) {
        lastVolume = timerSound.volume;

        timerSound.volume = 0;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
    } else {
        timerSound.volume = lastVolume;
        volumeSlider.value = lastVolume;
        updateVolumeIcon(lastVolume);
    }
});

const testSoundBtn = document.getElementById("test-sound-btn");
testSoundBtn.addEventListener("click", () => {
    updateSoundSource();
    timerSound.currentTime = 0;
    timerSound.play().catch((error) => {
        console.warn("Unable to play test sound:", error);
    });
});

setInterval(updateClock, 1000);
updateClock(); 