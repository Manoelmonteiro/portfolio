// Pega o canvas da página
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define largura e altura
const W = canvas.width = window.innerWidth;
const H = canvas.height = window.innerHeight;

// OffscreenCanvas
const ofc = new OffscreenCanvas(W, H);
const octx = ofc.getContext("2d");

function frame(t) {
  octx.reset();
  octx.fillStyle = '#000';
  octx.fillRect(0, 0, W, H);

  for (let i = 0; i < 2000; ++i) {
    octx.fillStyle = `rgba(255, ${255 - i / 8}, ${255 - i})`;
    octx.fillRect(
      960 + Math.sin(i / 8) * i / 2,
      1030 - i * Math.tan(i ** 4 + t / 1000),
      30, 50
    );
  }

  requestAnimationFrame(frame);

  ctx.reset();
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // filtro nativo (blur básico)
  ctx.filter = "blur(8px)";

  ctx.drawImage(ofc, 0, 0);
}

frame(0);
