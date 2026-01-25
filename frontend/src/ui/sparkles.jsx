// Minimal placeholder for SparklesCore. Replace with the real implementation for full effect.
import React, { useRef, useEffect } from "react";

// Official SparklesCore implementation (Aceternity/ReactBits)
export function SparklesCore({
  id,
  className = "",
  background = "transparent",
  minSize = 2.5, // larger minimum size
  maxSize = 7,   // larger maximum size
  particleDensity = 40, // much denser (lower value = more particles)
  particleColor = "#fff",
  speed = 2.2, // faster movement
  brightness = 1.5, // custom: boost alpha/brightness
  ...props
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function getPageSize() {
      // Use the largest height/width between viewport and document
      const width = Math.max(document.documentElement.scrollWidth, window.innerWidth);
      const height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      return { width, height };
    }

    function setCanvasSize() {
      let dpr = window.devicePixelRatio || 1;
      const { width, height } = getPageSize();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    setCanvasSize();

    let { width, height } = getPageSize();
    let particles = [];
    let particleCount = Math.floor((width * height) / particleDensity);

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function createParticle() {
      const angle = Math.random() * 2 * Math.PI;
      const radius = randomBetween(minSize, maxSize);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * randomBetween(0.3, 1.2) * speed,
        vy: Math.sin(angle) * randomBetween(0.3, 1.2) * speed,
        radius,
        alpha: randomBetween(0.85, 1) * brightness,
        color: particleColor,
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.restore();
      }
    }

    function update() {
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
    }

    function animate() {
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // Handle resize/scroll/DOM changes
    function handleResize() {
      setCanvasSize();
      const size = getPageSize();
      width = size.width;
      height = size.height;
      particleCount = Math.floor((width * height) / particleDensity);
      initParticles();
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
    // eslint-disable-next-line
  }, [minSize, maxSize, particleDensity, particleColor, speed]);

  return (
    <div
      className={
        "pointer-events-none select-none fixed inset-0 z-0 w-full h-full min-w-full min-h-full overflow-hidden " +
        className
      }
      style={{ background, position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
      id={id}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          minWidth: "100vw",
          minHeight: "100vh",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
}
