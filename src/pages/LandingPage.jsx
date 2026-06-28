import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import './LandingPage.css';

/* ── Particle field (lightweight canvas) ──────────────────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        color: ['#818cf8', '#c084fc', '#38bdf8', '#f472b6'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(129,140,248,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, p.color + 'cc');
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="landing-particles" />;
};

/* ── Typewriter for the landing ───────────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 1500) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ── Main Landing Page ────────────────────────────────────────────────────── */
const LandingPage = () => {
  const navigate = useNavigate();
  const typed = useTypewriter(personalInfo.roles);
  const [hoveredMode, setHoveredMode] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [webglSupported] = useState(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      return !!gl;
    } catch {
      return false;
    }
  });

  const handleNavigate = useCallback((path) => {
    setIsExiting(true);
    setTimeout(() => navigate(path), 600);
  }, [navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (isExiting) return;
      if (e.key === 'g' || e.key === 'G') {
        if (webglSupported) handleNavigate('/game');
      }
      if (e.key === 'c' || e.key === 'C') {
        handleNavigate('/classic');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isExiting, webglSupported, handleNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        className="landing-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <ParticleField />

        {/* Decorative grid */}
        <div className="landing-grid-bg" aria-hidden="true" />

        {/* HUD corner elements */}
        <div className="landing-hud-corners" aria-hidden="true">
          <div className="hud-corner top-left" />
          <div className="hud-corner top-right" />
          <div className="hud-corner bottom-left" />
          <div className="hud-corner bottom-right" />
        </div>

        {/* Top bar */}
        <motion.div
          className="landing-topbar"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="topbar-left">
            <span className="topbar-dot pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="topbar-right">
            <span>v3.0 — GAME EDITION</span>
          </div>
        </motion.div>

        {/* Center content */}
        <div className="landing-center">
          <motion.div
            className="landing-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <span className="badge-icon">⚡</span>
            <span>PORTFOLIO EXPERIENCE</span>
          </motion.div>

          <motion.h1
            className="landing-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <span className="title-line-1">Hi, I&apos;m</span>
            <span className="title-name" data-text={personalInfo.firstName}>
              {personalInfo.firstName}
            </span>
          </motion.h1>

          <motion.div
            className="landing-typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="tw-prefix">{'>'}</span>
            <span className="tw-text">{typed}</span>
            <span className="tw-cursor">|</span>
          </motion.div>

          <motion.p
            className="landing-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            Choose how you want to explore my work
          </motion.p>

          {/* Mode selection cards */}
          <motion.div
            className="landing-modes"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {/* Game Mode Card */}
            <motion.button
              className={`mode-card game-mode ${hoveredMode === 'game' ? 'hovered' : ''} ${!webglSupported ? 'disabled' : ''}`}
              onClick={() => webglSupported && handleNavigate('/game')}
              onMouseEnter={() => setHoveredMode('game')}
              onMouseLeave={() => setHoveredMode(null)}
              whileHover={webglSupported ? { y: -8, scale: 1.02 } : {}}
              whileTap={webglSupported ? { scale: 0.98 } : {}}
              disabled={!webglSupported}
            >
              <div className="mode-icon-wrap">
                <span className="mode-icon">🏎️</span>
                <div className="mode-icon-glow" />
              </div>
              <h3>Game Mode</h3>
              <p>Drive through a 3D neon city to explore my projects, skills, and experience</p>
              <div className="mode-tags">
                <span className="mode-tag">3D</span>
                <span className="mode-tag">Interactive</span>
                <span className="mode-tag">Immersive</span>
              </div>
              {!webglSupported && (
                <span className="mode-warning">WebGL not supported on this device</span>
              )}
              <div className="mode-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div className="mode-shimmer" />
            </motion.button>

            {/* Divider */}
            <div className="mode-divider">
              <span>OR</span>
            </div>

            {/* Classic Mode Card */}
            <motion.button
              className={`mode-card classic-mode ${hoveredMode === 'classic' ? 'hovered' : ''}`}
              onClick={() => handleNavigate('/classic')}
              onMouseEnter={() => setHoveredMode('classic')}
              onMouseLeave={() => setHoveredMode(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mode-icon-wrap">
                <span className="mode-icon">📄</span>
                <div className="mode-icon-glow classic-glow" />
              </div>
              <h3>Classic Portfolio</h3>
              <p>The traditional scroll-based experience with glassmorphic design and animations</p>
              <div className="mode-tags">
                <span className="mode-tag">Fast</span>
                <span className="mode-tag">Accessible</span>
                <span className="mode-tag">Mobile-Friendly</span>
              </div>
              <div className="mode-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div className="mode-shimmer" />
            </motion.button>
          </motion.div>

          {/* Keyboard hint */}
          <motion.div
            className="landing-keys"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="key-hint">Press <kbd>G</kbd> for Game Mode</span>
            <span className="key-hint">Press <kbd>C</kbd> for Classic</span>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="landing-bottombar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Built with React + Three.js</span>
          <span>© 2026 {personalInfo.name}</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;
