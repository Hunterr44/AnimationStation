let button = document.getElementById("StartButton");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let animationFrame;
let isPaused = false;
let x = 50;
let angle = 0;
let fps = 10;
let interval = 1000 / fps;
let lastTime = 0;

let sprite = new Image();
sprite.src = 'public/sprite1.png'; // Ensure this file is in the repository

let background = new Image();
background.src = 'public/background.jpg'; // Ensure this file is in the repository
let backgroundLoaded = false;

background.onload = () => {
    backgroundLoaded = true;
};

function updateFpsDisplay() {
    fps = parseInt(document.getElementById('fps').value);
    document.getElementById('fpsValue').innerText = fps;
    interval = 1000 / fps;
}

function clearCanvas() {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = 50;
    angle = 0;
}

function startAnimation() {
    button.disabled = true;
    isPaused = false;
    lastTime = 0;

    function animate(time) {
        if (isPaused) return;
        if (time - lastTime > interval) {
            lastTime = time;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Ensure background is loaded before drawing it
            if (backgroundLoaded) {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            }

            ctx.save();
            ctx.translate(x, 150);
            ctx.rotate(angle * Math.PI / 180);
            ctx.drawImage(sprite, -50, -50, 100, 100); // Bigger sprite size
            ctx.restore();
            angle = (angle + 10) % 360;
            x = (x + 5) % canvas.width; // Moves across the canvas
        }
        animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);
}

function pauseAnimation() {
    isPaused = true;
    button.disabled = false;
}
