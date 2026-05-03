// ========== BACKGROUND CANVAS: Floating particles ==========
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

let width, height;
let particles = [];

function resizeBg() {
  width = window.innerWidth;
  height = window.innerHeight;
  bgCanvas.width = width;
  bgCanvas.height = height;
}

window.addEventListener('resize', resizeBg);
resizeBg();

// Create particles
const PARTICLE_COUNT = 100;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.3
  });
}

function drawBg() {
  bgCtx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    // Move
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // Draw
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(100, 180, 255, ${p.alpha})`;
    bgCtx.fill();
  });

  // Optional: draw connecting lines if particles are close
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        bgCtx.beginPath();
        bgCtx.moveTo(particles[i].x, particles[i].y);
        bgCtx.lineTo(particles[j].x, particles[j].y);
        bgCtx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`;
        bgCtx.stroke();
      }
    }
  }

  requestAnimationFrame(drawBg);
}

drawBg();

// ========== SKILLS CANVAS: Animated bars ==========
const skillsCanvas = document.getElementById('skillsCanvas');
const skillsCtx = skillsCanvas.getContext('2d');

// Your skills (name and percentage)
const skillsData = [
  { name: 'Python', level: 80 },
  { name: 'C++', level: 65 },
  { name: 'HTML/CSS', level: 85 },
  { name: 'JavaScript', level: 75 },
];

let animProgress = 0; // 0 to 1 for animation

function drawSkills() {
  skillsCtx.clearRect(0, 0, skillsCanvas.width, skillsCanvas.height);

  const barHeight = 20;
  const startY = 40;
  const gap = 40;

  skillsData.forEach((skill, i) => {
    const y = startY + i * gap;

    // Skill name
    skillsCtx.fillStyle = '#fff';
    skillsCtx.font = '16px Segoe UI, sans-serif';
    skillsCtx.fillText(skill.name, 10, y - 5);

    // Background bar
    skillsCtx.fillStyle = '#2a2a4a';
    skillsCtx.fillRect(120, y, 200, barHeight);

    // Animated fill (current width = target * animation progress)
    const targetWidth = (skill.level / 100) * 200;
    const currentWidth = targetWidth * animProgress;
    skillsCtx.fillStyle = '#3a86ff';
    skillsCtx.fillRect(120, y, currentWidth, barHeight);

    // Percentage text
    skillsCtx.fillStyle = '#fff';
    skillsCtx.font = '14px Segoe UI, sans-serif';
    skillsCtx.fillText(`${skill.level}%`, 330, y + 15);
  });

  // Continue animation until full
  if (animProgress < 1) {
    animProgress += 0.02;
    requestAnimationFrame(drawSkills);
  }
}

// Start skills animation when the page loads
drawSkills();
