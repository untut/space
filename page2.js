const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
let mouse = { x: -1000, y: -1000 };


const STAR_COUNT = 400;
const MAX_RADIUS = 2.5; 
const MOUSE_RADIUS = 150;
const MAX_SHIFT = 50;      

const SHAPES = ['circle', 'cross', 'star'];

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            relX: Math.random(),
            relY: Math.random(),
            baseRadius: Math.random() * MAX_RADIUS + 0.8,
            baseAlpha: Math.random() * 0.7 + 0.3,
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            angle: Math.random() * Math.PI * 2
        });
    }
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

function drawStar(x, y, radius, alpha, shape, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = Math.max(1, radius * 0.3);

    if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape === 'cross') {
        ctx.beginPath();
        ctx.moveTo(-radius, -radius);
        ctx.lineTo(radius, radius);
        ctx.moveTo(-radius, radius);
        ctx.lineTo(radius, -radius);
        ctx.stroke();
    } else if (shape === 'star') {
        const spikes = 5;
        const outerRadius = radius;
        const innerRadius = radius * 0.5;
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;

        ctx.beginPath();
        for (let i = 0; i < spikes; i++) {
            let x1 = Math.cos(rot) * outerRadius;
            let y1 = Math.sin(rot) * outerRadius;
            ctx.lineTo(x1, y1);
            rot += step;

            let x2 = Math.cos(rot) * innerRadius;
            let y2 = Math.sin(rot) * innerRadius;
            ctx.lineTo(x2, y2);
            rot += step;
        }
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let star of stars) {

        const baseX = star.relX * width;
        const baseY = star.relY * height;
        const dx = mouse.x - baseX;
        const dy = mouse.y - baseY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        let shiftX = 0, shiftY = 0;

        if (dist < MOUSE_RADIUS) {
            const factor = 1 - dist / MOUSE_RADIUS;
            if (dist > 0.01) { 
                const dirX = dx / dist;
                const dirY = dy / dist;
                
                shiftX = -dirX * factor * MAX_SHIFT;
                shiftY = -dirY * factor * MAX_SHIFT; 
            }
        }

        const x = baseX + shiftX;
        const y = baseY + shiftY;

        drawStar(x, y, star.baseRadius, star.baseAlpha, star.shape, star.angle);
    }

    requestAnimationFrame(draw);
}

initStars();
resizeCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
});

draw();

