let timeLeft = 10;
let seconds = 0;
let minutes = 0;
let hours = 0;
const delay = 1000; // 1 second

// Get the buttons and display elements
const pauseButton = document.getElementById('takebreak');
const clockOutButton = document.getElementById('clockout');
const clockInButton = document.getElementById('clockin');

const display = document.getElementById('Time');

// Set the greeting based on the current time
const hourNow = new Date().getHours();
if (hourNow >= 5 && hourNow < 12) {
    document.getElementById('greeting').innerText = "Good Morning, Bharath OS";
}
else if (hourNow >= 12 && hourNow < 17) {
    document.getElementById('greeting').innerText = "Good Afternoon, Bharath OS";
}
else if (hourNow >= 17 && hourNow < 21) {
    document.getElementById('greeting').innerText = "Good Evening, Bharath OS";
}
else {
    document.getElementById('greeting').innerText = "Good Night, Bharath OS";
}



function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 1;
            hours++;
            if (hours >= 13) {
                hours = 1;
            }
        }
    }
    display.innerText = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
let timer;

clockInButton.addEventListener('click', () => {
    timer = setInterval(updateTimer, delay);
    document.getElementById('timer-section').classList.remove('d-none');
    document.getElementById('status').innerHTML = '<div class="text-success text-center fw-normal m-0 mb-5 mt-2">You are currently <span class="fw-bold">Working.</span></div>';
    clockInButton.classList.add('d-none');
});

pauseButton.addEventListener('click', () => {
    if (pauseButton.innerText === "Take a Break") {
        pauseButton.innerText = "Resume Work";
        pauseButton.classList.replace('btn-warning', 'btn-primary');
        clearInterval(timer);

        document.getElementById('status').innerHTML = '<div class="text-danger text-center fw-normal m-0 mb-5 mt-2">You are on a <span class="fw-bold">Break</span> now.</div>';
    }
    else {
        pauseButton.innerHTML = "Take a Break";
        pauseButton.classList.replace('btn-primary', 'btn-warning');
        timer = setInterval(updateTimer, delay);
        document.getElementById('status').innerHTML = '<div class="text-success text-center fw-normal m-0 mb-5 mt-2">You are currently <span class="fw-bold">Working.</span></div>';
    }
});
clockOutButton.addEventListener('click', () => {
    clearInterval(timer);
    document.getElementById('status').innerHTML = `<div class="text-secondary text-center fw-normal m-0 mb-2 mt-2">You have <span class="text-danger fw-bold">stopped Working</span></div>
    <div class="text-secondary text-center fw-normal m-0 mb-5 mt-2">You have worked <span class="text-success fw-bold">${hours === 0? `${minutes} minutes` : `${hours}hours ${minutes} minutes`} </span> today.</div>`;
    document.getElementById('timer-section').classList.add('d-none');
    document.getElementById('clockin').classList.remove('d-none');
})