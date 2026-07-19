const mouseGlow = document.getElementById('mouse-glow');
let targetX = -500;
let targetY = -500;
let currentX = -500;
let currentY = -500;
let trailX = -500;
let trailY = -500;
const easing = 0.08;
const trailEasing = 0.04;

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

document.addEventListener('mouseleave', () => {
    targetX = -500;
    targetY = -500;
});

function animateGlow() {
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;
    trailX += (currentX - trailX) * trailEasing;
    trailY += (currentY - trailY) * trailEasing;

    mouseGlow.style.setProperty('--glow-x', `${currentX}px`);
    mouseGlow.style.setProperty('--glow-y', `${currentY}px`);
    mouseGlow.style.setProperty('--glow-trail-x', `${trailX}px`);
    mouseGlow.style.setProperty('--glow-trail-y', `${trailY}px`);

    requestAnimationFrame(animateGlow);
}

animateGlow();