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

timerSound.volume = volumeSlider.value;

volumeSlider.addEventListener("input", () => {
    timerSound.volume = volumeSlider.value;
});

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

setInterval(updateClock, 1000);
updateClock(); 