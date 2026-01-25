import { useEffect, useRef } from 'react';

// Simple animated background particles using canvas
export function AnimatedParticlesBG({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Particle config
    const PARTICLE_COUNT = Math.floor(width / 32);
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 2.5,
      dx: -0.2 + Math.random() * 0.4,
      dy: -0.2 + Math.random() * 0.4,
      opacity: 0.2 + Math.random() * 0.3,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#60a5fa'; // blue-400
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        'fixed inset-0 z-0 pointer-events-none opacity-60 transition-opacity duration-500 ' + className
      }
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}
