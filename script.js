const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

let offset = 0;

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#45A29E';
  ctx.lineWidth = 0.5;

  const spacing = 40;
  // moving horizontal lines
  for (let y = -spacing + (offset % spacing); y < height + spacing; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + 30); // slanted
    ctx.strokeStyle = `rgba(69, 162, 158, 0.2)`;
    ctx.stroke();
  }
  // vertical lines
  for (let x = -spacing + (offset % spacing); x < width + spacing; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 15, height);
    ctx.strokeStyle = `rgba(69, 162, 158, 0.15)`;
    ctx.stroke();
  }
  offset += 0.3;
  requestAnimationFrame(draw);
}

draw();
