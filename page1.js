const planets = document.querySelectorAll('.planet');

const speeds = [5 ,5, 4, 8, 6, 12, 10, 8, 6]; 

let angles = new Array(planets.length).fill(0);

let isPaused = false;
let speedMultiplier = 1;

let lastTimestamp = null;
let animationId = null;

function rotatePlanets(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationId = requestAnimationFrame(rotatePlanets);
        return;
    }

    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused) {
        for (let i = 0; i < planets.length; i++) {
            angles[i] += speeds[i] * speedMultiplier * delta / 1000;
            planets[i].style.setProperty('--rotate-angle', angles[i] + 'deg');
        }
    }

    animationId = requestAnimationFrame(rotatePlanets);
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            speedMultiplier *= 1.2;
            e.preventDefault();
            break;
        case 'ArrowDown':
            speedMultiplier /= 1.2;
            e.preventDefault();
            break;
        case ' ':
        case 'Space':
            isPaused = !isPaused;
            e.preventDefault();
            break;
    }
});
rotatePlanets(0);