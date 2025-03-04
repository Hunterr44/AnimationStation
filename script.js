// Canvas and context setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Default values
let sprite = new Image();
sprite.src = 'public/sprite1.png'; // Default sprite
let background = new Image();
background.src = 'public/background.jpg'; // Default background



let button = document.getElementById('PlayButton')

let animationFrame;
let isPaused = false;
let x = 50;
let angle = 0;
let fps = 5;
let rotationSpeed = 20;
let spriteSize = 50;

// Get UI elements
const fpsSlider = document.getElementById('fps');
const rotationSlider = document.getElementById('rotation');
const sizeSlider = document.getElementById('size');
const fpsValue = document.getElementById('fpsValue');
const rotationValue = document.getElementById('rotationValue');
const sizeValue = document.getElementById('sizeValue');

// Ensure sliders update values in real-time
fpsSlider.addEventListener('input', () => {
    fps = parseInt(fpsSlider.value);
    fpsValue.innerText = fps;

    if (!isPaused) {
        cancelAnimationFrame(animationFrame);
        playAnimation();
    }
});

rotationSlider.addEventListener('input', () => {
    rotationSpeed = parseInt(rotationSlider.value);
    rotationValue.innerText = rotationSpeed;
});

sizeSlider.addEventListener('input', () => {
    spriteSize = parseInt(sizeSlider.value);
    sizeValue.innerText = spriteSize;
});

// Function to update background
function setBackground(src) {
    background.src = src;
    document.getElementById('backgroundModal').style.display = 'none';
}

// Function to update sprite character
function setCharacter(src) {
    sprite.src = src;
    document.getElementById('characterModal').style.display = 'none';
}

// Function to show the background selection modal
function showBackgroundSelection() {
    document.getElementById('backgroundModal').style.display = 'flex';
}

// Function to show the character selection modal
function showCharacterSelection() {
    document.getElementById('characterModal').style.display = 'flex';
}

// Function to close modals when clicking outside
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Start Animation Function
function playAnimation() {
    button.disabled = true;
    isPaused = false;
    let lastTime = 0;
    let interval = 1000 / fps;

    function animate(time) {
        if (isPaused) return;
        if (time - lastTime > interval) {
            lastTime = time;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw Background
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Draw Rotating Sprite
            ctx.save();
            ctx.translate(x, 150);
            ctx.rotate(angle * Math.PI / 180);
            ctx.drawImage(sprite, -spriteSize / 2, -spriteSize / 2, spriteSize, spriteSize);
            ctx.restore();

            // Update motion & rotation
            angle = (angle + rotationSpeed) % 360;
            x = (x + 5) % canvas.width;
        }

        animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);
}

// Pause Animation
function pauseAnimation() {
    button.disabled = false; 
    isPaused = true;
    cancelAnimationFrame(animationFrame);
}

// Clear Canvas
function clearCanvas() {
    isPaused = true;
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Download Canvas as Image
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'animation.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Attach event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("button[onclick='showBackgroundSelection()']").addEventListener("click", showBackgroundSelection);
    document.querySelector("button[onclick='showCharacterSelection()']").addEventListener("click", showCharacterSelection);
    document.querySelector("button[onclick='playAnimation()']").addEventListener("click", playAnimation);
    document.querySelector("button[onclick='pauseAnimation()']").addEventListener("click", pauseAnimation);
    document.querySelector("button[onclick='clearCanvas()']").addEventListener("click", clearCanvas);
    document.querySelector("button[onclick='downloadImage()']").addEventListener("click", downloadImage);
});
