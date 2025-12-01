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

function startTimer () {
     if (timerInterval !=null) return; 

     const minutes = parseInt(document.getElementById("minutes").value) || 0;
     const seconds = parseInt(document.getElementById("seconds").value) ||0;

     remainingSeconds = minutes * 60 + seconds;

     if (remainingSeconds <= 0) {
        alert("Please enter a valid time.");
        return;
     }

     timerInterval = setInterval(updateTimer, 1000);
     updateTimer();
}

function updateTimer() {
    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const secs = String(remainingSeconds % 60).padStart(2, "0");

    document.getElementById("timer-display").textContent = `${mins}:${secs}`;

    if (remainingSeconds === 0) {
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
    document.getElementById("timer-display").textContent = "00:00";   
}

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);

setInterval(updateClock, 1000);
updateClock(); 