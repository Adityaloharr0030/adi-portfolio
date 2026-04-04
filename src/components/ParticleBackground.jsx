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

    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -10;
        this.r = Math.random() * 2.2 + 0.4;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = Math.random() * 0.3 + 0.05;
        this.alpha = Math.random() * 0.6 + 0.15;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      update(t) {
        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - (mouse.y);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += dx / dist * force * 1.5;
          this.y += dy / dist * force * 1.5;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > canvas.height + 10) this.reset();
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        this.currentAlpha = this.alpha * (0.7 + 0.3 * Math.sin(t * 0.001 + this.pulseOffset));
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.currentAlpha;
        ctx.beginPath();
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3);
        grd.addColorStop(0, this.color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: COUNT }, () => new Particle());

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
