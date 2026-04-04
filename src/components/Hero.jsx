import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCode, FiTerminal, FiZap } from 'react-icons/fi';
import './Hero.css';

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(words, speed = 90, pause = 1800) {
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

// ── 3D Orb Canvas ────────────────────────────────────────────────────────────
const OrbCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Rotation matrix helpers
    const rotate = (x, y, z, rx, ry) => {
      const cosRy = Math.cos(ry); const sinRy = Math.sin(ry);
      const x1 = x * cosRy - z * sinRy;
      const z1 = x * sinRy + z * cosRy;
      const cosRx = Math.cos(rx); const sinRx = Math.sin(rx);
      const y1 = y * cosRx - z1 * sinRx;
      const z2 = y * sinRx + z1 * cosRx;
      return [x1, y1, z2];
    };

    const project = (x, y, z, cx, cy, fov = 320) => {
      const scale = fov / (fov + z);
      return [cx + x * scale, cy + y * scale, scale];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const R = Math.min(canvas.width, canvas.height) * 0.35;

      const rx = t * 0.0045;
      const ry = t * 0.009;

      // ── Glow sphere core ──────────────────────────────────────
      const grd = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.1);
      grd.addColorStop(0, 'rgba(129,140,248,0.22)');
      grd.addColorStop(0.45, 'rgba(168,85,247,0.12)');
      grd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // ── Wireframe longitude rings ─────────────────────────────
      const RINGS = 12;
      for (let ring = 0; ring < RINGS; ring++) {
        const phi = (ring / RINGS) * Math.PI;
        const pts = [];
        const STEPS = 60;
        for (let s = 0; s <= STEPS; s++) {
          const theta = (s / STEPS) * Math.PI * 2;
          const x = R * Math.sin(phi) * Math.cos(theta);
          const y = R * Math.cos(phi);
          const z = R * Math.sin(phi) * Math.sin(theta);
          const [rx3, ry3, rz3] = rotate(x, y, z, rx, ry);
          const [px2, py2, scale] = project(rx3, ry3, rz3, cx, cy);
          pts.push({ px2, py2, scale, rz3 });
        }
        ctx.beginPath();
        pts.forEach((p, i) => {
          i === 0 ? ctx.moveTo(p.px2, p.py2) : ctx.lineTo(p.px2, p.py2);
        });
        ctx.strokeStyle = `rgba(129,140,248,${0.08 + 0.06 * ring / RINGS})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // ── Wireframe latitude rings ───────────────────────────────
      const LATS = 10;
      for (let lat = 0; lat < LATS; lat++) {
        const theta = (lat / LATS) * Math.PI * 2;
        const pts = [];
        const STEPS = 60;
        for (let s = 0; s <= STEPS; s++) {
          const phi = (s / STEPS) * Math.PI;
          const x = R * Math.sin(phi) * Math.cos(theta);
          const y = R * Math.cos(phi);
          const z = R * Math.sin(phi) * Math.sin(theta);
          const [rx3, ry3, rz3] = rotate(x, y, z, rx, ry);
          const [px2, py2] = project(rx3, ry3, rz3, cx, cy);
          pts.push({ px2, py2, rz3 });
        }
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.px2, p.py2) : ctx.lineTo(p.px2, p.py2));
        ctx.strokeStyle = `rgba(192,132,252,0.09)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Orbiting particles ─────────────────────────────────────
      const ORBIT_COUNT = 28;
      for (let i = 0; i < ORBIT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / ORBIT_COUNT);
        const theta = Math.sqrt(ORBIT_COUNT * Math.PI) * phi;
        const x = R * Math.sin(phi) * Math.cos(theta);
        const y = R * Math.cos(phi);
        const z = R * Math.sin(phi) * Math.sin(theta);
        const [rx3, ry3, rz3] = rotate(x, y, z, rx, ry);
        const [px2, py2, scale] = project(rx3, ry3, rz3, cx, cy);
        const visible = rz3 > -R * 0.2;
        if (!visible) continue;
        const pr = scale * 2.8;
        const color = i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#c084fc' : '#38bdf8';
        const g2 = ctx.createRadialGradient(px2, py2, 0, px2, py2, pr * 2);
        g2.addColorStop(0, color + 'cc');
        g2.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px2, py2, pr * 2, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();
      }

      // ── Outer glow ring ───────────────────────────────────────
      const outerR = R * 1.18 + 4 * Math.sin(t * 0.02);
      const outerGrd = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, outerR + 12);
      outerGrd.addColorStop(0, 'transparent');
      outerGrd.addColorStop(0.6, 'rgba(129,140,248,0.08)');
      outerGrd.addColorStop(1, 'rgba(192,132,252,0.04)');
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(129,140,248,0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.arc(cx, cy, outerR + 8, 0, Math.PI * 2);
      ctx.fillStyle = outerGrd;
      ctx.fill();

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="orb-canvas" />;
};

// ── Hero Component ───────────────────────────────────────────────────────────
const Hero = () => {
  const roles = ['Full-Stack Developer', 'Java Engineer', 'Salesforce Developer', 'Problem Solver'];
  const typed = useTypewriter(roles);
  // Matrix rain background logic removed in favor of CSS Perspective Grid

  // Magnetic button effect
  const magnetic = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    el.style.transform = `translate(${dx}px,${dy}px) scale(1.06)`;
  };
  const resetMagnetic = (e) => {
    e.currentTarget.style.transform = 'translate(0,0) scale(1)';
  };

  const floatingCards = [
    { icon: '⚛️', label: 'React Expert', cls: 'card-1' },
    { icon: '☕', label: 'Java Core',    cls: 'card-2' },
    { icon: '☁️', label: 'Salesforce',  cls: 'card-3' },
    { icon: '🚀', label: 'Next.js',     cls: 'card-4' },
    { icon: '🟢', label: 'Node.js',     cls: 'card-5' },
  ];

  return (
    <section className="hero">
      <div className="hero-perspective-grid" />
      {/* HUD Telemetry Markers */}
      <div className="hero-hud-telemetry" aria-hidden="true">
        <div className="hud-line line-1">SYS.BOOT.PROTOCOL // 04.2026</div>
        <div className="hud-line line-2">NET_LINK: ESTABLISHED</div>
        <div className="hud-line line-3">TRACE_ID: 7FA92_ADITYA</div>
      </div>
      {/* Animated aurora blobs */}
      <div className="hero-aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="hero-container">
        {/* ── Left: content ── */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <motion.div
            className="badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FiZap className="badge-zap" />
            <span>Full-Stack | Java | Salesforce</span>
            <span className="badge-dot" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Hi, I&apos;m{' '}
            <span className="hero-name luminous-pulse" data-text="ADITYA">ADITYA</span>
          </motion.h1>

          <motion.div
            className="typewriter-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FiTerminal className="tw-icon" />
            <span className="typewriter-text">{typed}</span>
            <span className="typewriter-cursor">|</span>
          </motion.div>

          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            B.Tech Computer Engineering student (2027) delivering
            production-grade applications across three domains:
            Full-Stack Web, Java Engineering, and Salesforce CRM.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary magnetic-btn"
              onMouseMove={magnetic}
              onMouseLeave={resetMagnetic}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
              <span className="btn-glow" />
            </motion.a>
            <motion.a
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary magnetic-btn"
              onMouseMove={magnetic}
              onMouseLeave={resetMagnetic}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            className="hero-tech-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {['React', 'Node.js', 'Java', 'PostgreSQL', 'Docker', 'Salesforce'].map(t => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <FiArrowDown />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Orb + Code Window ── */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {/* Orb behind the window */}
          <div className="orb-wrapper">
            <OrbCanvas />
          </div>

          <div className="code-window hologram">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="code-title">Developer.js</span>
              <a
                href="https://adi-portfolio-beta-coral.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="deploy-tag"
              >
                <span className="status-pip pulsing" />
                Vercel Live
              </a>
            </div>
            <pre>
              <code>
                <span className="line">
                  <span className="keyword">const</span>{' '}
                  <span className="class-name">developer</span> = {'{'}
                </span>
                <span className="line">
                  {'  '}name: <span className="string">&quot;Aditya Lohar&quot;</span>,
                </span>
                <span className="line">
                  {'  '}focus: [<span className="string">&quot;FullStack&quot;</span>,{' '}
                  <span className="string">&quot;Java-Core&quot;</span>,{' '}
                  <span className="string">&quot;Salesforce&quot;</span>],
                </span>
                <span className="line">
                  {'  '}stack: [<span className="string">&quot;React/Next&quot;</span>,{' '}
                  <span className="string">&quot;Node.js&quot;</span>,{' '}
                  <span className="string">&quot;Relational-DB&quot;</span>],
                </span>
                <span className="line">
                  {'  '}passion:{' '}
                  <span className="string">&quot;Production-Grade Apps&quot;</span>
                </span>
                <span className="line">{'};'}</span>
              </code>
            </pre>
            <div className="scanline" aria-hidden="true" />
          </div>

          {/* Floating cards */}
          {floatingCards.map((c, i) => (
            <motion.div
              key={c.cls}
              className={`floating-card ${c.cls}`}
              animate={{ y: [i % 2 === 0 ? -8 : 8, i % 2 === 0 ? 8 : -8, i % 2 === 0 ? -8 : 8] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
            >
              <span className="card-icon">{c.icon}</span>
              <span>{c.label}</span>
              <div className="card-glow" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
