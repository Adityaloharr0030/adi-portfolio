import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCode } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check for touch devices and reduced motion preference
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skip animation on touch devices or if reduced motion is preferred
    if (isTouch || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[];:+-*=&%';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6366f1';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-matrix-canvas" />
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FiCode />
            <span>Full-Stack | Java | Salesforce</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Hi, I&apos;m <span className="gradient-text">Aditya</span>
          </motion.h1>

          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            B.Tech Computer Engineering student (2027) delivering 
            production-grade applications across three domains: 
            Full-Stack Web, Java Engineering, and Salesforce CRM.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiArrowDown />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-window">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="code-title">Developer.js</span>
            </div>
            <pre>
              <code>
                <span className="line">
                  <span className="keyword">const</span>{' '}
                  <span className="class-name">developer</span> = {'{'}
                </span>
                <span className="line">
                  {'    '}name: <span className="string">&quot;Aditya Lohar&quot;</span>,
                </span>
                <span className="line">
                  {'    '}focus: [<span className="string">&quot;FullStack&quot;</span>, <span className="string">&quot;Java-Core&quot;</span>, <span className="string">&quot;Salesforce&quot;</span>],
                </span>
                <span className="line">
                  {'    '}stack: [<span className="string">&quot;React/Next&quot;</span>, <span className="string">&quot;Node.js&quot;</span>, <span className="string">&quot;Relational-DB&quot;</span>],
                </span>
                <span className="line">
                  {'    '}passion: <span className="string">&quot;Production-Grade Apps&quot;</span>
                </span>
                <span className="line">{'}'};</span>
              </code>
            </pre>
          </div>

          <motion.div
            className="floating-card card-1"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <span className="card-icon">⚛️</span>
            <span>React Expert</span>
          </motion.div>

          <motion.div
            className="floating-card card-2"
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
          >
            <span className="card-icon">🚀</span>
            <span>Next.js</span>
          </motion.div>

          <motion.div
            className="floating-card card-3"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <span className="card-icon">🟢</span>
            <span>Node.js</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
