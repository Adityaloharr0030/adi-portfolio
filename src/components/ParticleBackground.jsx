import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9000), 140);
    const COLORS = ['#818cf8', '#c084fc', '#a855f7', '#38bdf8', '#6366f1'];

    const createParticle = () => {
      const p = {
        reset: (initial = false) => {
          p.x = Math.random() * canvas.width;
          p.y = initial ? Math.random() * canvas.height : -10;
          p.r = Math.random() * 2.2 + 0.4;
          p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = Math.random() * 0.3 + 0.05;
          p.alpha = Math.random() * 0.6 + 0.15;
          p.pulseOffset = Math.random() * Math.PI * 2;
        },
        update: (t) => {
          // Mouse repulsion
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += dx / dist * force * 1.5;
            p.y += dy / dist * force * 1.5;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > canvas.height + 10) p.reset();
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          p.currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(t * 0.001 + p.pulseOffset));
        },
        draw: () => {
          ctx.save();
          ctx.globalAlpha = p.currentAlpha;
          ctx.beginPath();
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          grd.addColorStop(0, p.color);
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      };
      p.reset(true);
      return p;
    };

    const particles = Array.from({ length: COUNT }, createParticle);

    const drawConnections = () => {
      const maxDist = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const opacity = (1 - d / maxDist) * 0.18;
            ctx.save();
            ctx.globalAlpha = opacity;
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, particles[i].color);
            grad.addColorStop(1, particles[j].color);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      particles.forEach(p => { p.update(t); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-bg-canvas" aria-hidden="true" />;
};

export default ParticleBackground;
