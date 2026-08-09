import { useEffect, useRef } from "react";

/* Snow that falls and SETTLES into the shape of the given text lines
   (like snow drifting to spell out words), plus lighter ambient snow
   falling continuously in the background. Pure canvas + JS. */

export default function SnowEffect({ lines = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, textFlakes, ambientFlakes, animationId, startTime;

    const buildTextPoints = () => {
      // Draw the text offscreen to sample which pixels form the letters
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");

      const isMobile = width < 640;
      const fontSize = isMobile ? Math.round(width * 0.085) : Math.min(58, width * 0.045);
      octx.font = `800 ${fontSize}px Poppins, sans-serif`;
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      const lineHeight = fontSize * 1.25;
      const totalHeight = lines.length * lineHeight;
      const startY = height / 2 - totalHeight / 2 + lineHeight / 2 - 10;

      lines.forEach((line, i) => {
        octx.fillText(line, width / 2, startY + i * (fontSize * 1.25));
      });

      const imgData = octx.getImageData(0, 0, width, height).data;
      const points = [];
      const step = isMobile ? 3 : 3.2; // sampling density
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
          if (imgData[idx + 3] > 120) {
            points.push({ x: x + (Math.random() - 0.5) * 1.2, y: y + (Math.random() - 0.5) * 1.2 });
          }
        }
      }
      return points;
    };

    const setup = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      const points = buildTextPoints();

      // Shuffle so letters build up randomly rather than row-by-row
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [points[i], points[j]] = [points[j], points[i]];
      }

      textFlakes = points.map((p, i) => ({
        targetX: p.x,
        targetY: p.y,
        x: p.x + (Math.random() - 0.5) * 260,
        y: -20 - Math.random() * height * 0.6,
        r: Math.random() * 1.6 + 1.1,
        delay: i * 4, // ms stagger so they build up gradually
        landed: false,
        speed: Math.random() * 2.5 + 3.5,
      }));

      const ambientCount = Math.floor((width * height) / 12000);
      ambientFlakes = Array.from({ length: ambientCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.5,
        speedY: Math.random() * 0.6 + 0.25,
        speedX: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.35 + 0.2,
      }));

      startTime = performance.now();
    };

    const draw = (now) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      // Ambient background snow (always falling, decorative)
      ctx.fillStyle = "white";
      ambientFlakes.forEach((f) => {
        ctx.globalAlpha = f.opacity;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        f.y += f.speedY;
        f.x += f.speedX;
        if (f.y > height) { f.y = -5; f.x = Math.random() * width; }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
      });

      // Text-forming snow
      textFlakes.forEach((f) => {
        if (elapsed < f.delay) return; // hasn't started falling yet
        if (!f.landed) {
          const dy = f.targetY - f.y;
          if (Math.abs(dy) < f.speed) {
            f.y = f.targetY;
            f.x = f.targetX;
            f.landed = true;
          } else {
            f.y += f.speed;
            f.x += (f.targetX - f.x) * 0.05;
          }
        }
        ctx.globalAlpha = f.landed ? 0.95 : 0.8;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = f.landed ? "#ffffff" : "#e9e4ff";
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    setup();
    animationId = requestAnimationFrame(draw);

    const handleResize = () => setup();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")]);

  return <canvas ref={canvasRef} className="snow-canvas" />;
}
