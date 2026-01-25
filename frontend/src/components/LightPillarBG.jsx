import { useEffect, useRef } from 'react';

// Animated light pillar background inspired by ReactBits
export function LightPillarBG({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Pillar config
    const pillarCount = 3;
    const pillars = Array.from({ length: pillarCount }, (_, i) => ({
      x: width * (0.3 + 0.2 * i),
      w: 80 + Math.random() * 40,
      color: `rgba(168,85,247,0.18)` // purple-400/200
    }));

    function drawPillar(p, t) {
      const grad = ctx.createLinearGradient(p.x, 0, p.x, height);
      grad.addColorStop(0, 'rgba(236,72,153,0.08)'); // pink-400
      grad.addColorStop(0.5, p.color);
      grad.addColorStop(1, 'rgba(59,130,246,0.10)'); // blue-500
      ctx.save();
      ctx.globalAlpha = 0.85 + 0.15 * Math.sin(t + p.x);
      ctx.filter = `blur(16px)`;
      ctx.beginPath();
      ctx.ellipse(p.x + 24 * Math.sin(t + p.x), height/2, p.w + 16 * Math.cos(t + p.x), height * 0.7, 0, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const t = performance.now() / 1200;
      for (const p of pillars) drawPillar(p, t);
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        'fixed inset-0 z-0 pointer-events-none opacity-90 transition-opacity duration-500 ' + className
      }
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}
