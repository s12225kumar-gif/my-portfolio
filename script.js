// Canvas Particle Network Animation
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  createParticles();
}
window.addEventListener('resize', resize);

function createParticles() {
  particles = [];
  const count = Math.floor((width * height) / 8000); // density
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1.2,
    });
  }
}

resize();

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Update and draw particles
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Draw dots
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(69, 162, 158, 0.8)';
    ctx.fill();
  });

  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(69, 162, 158, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
