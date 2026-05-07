const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initStars();
}
window.addEventListener('resize', resize);

function initStars() {
  const count = 200;
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.8 + 0.2,
    });
  }
}

resize();

function draw() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(s => {
    // move down slowly
    s.y += s.speed;
    if (s.y > height) {
      s.y = 0;
      s.x = Math.random() * width;
    }
    // draw star
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}

draw();
