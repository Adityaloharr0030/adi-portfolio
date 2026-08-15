import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo } from '../../../data/portfolioData';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Hero = () => {
  const windowRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        
        {/* ── Left Column: Content ── */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="glass-badge">
            Flutter • Full-Stack • AI-Integrated Apps
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title">
            Hi, I&apos;m <span className="glass-highlight">Aditya</span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="hero-subtitle">
            Software Engineer
          </motion.h2>

          <motion.p variants={itemVariants} className="hero-description">
            Computer Engineering student building highly scalable mobile apps, robust full-stack products, and AI-powered digital experiences.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="glass-btn primary">
              View Projects <FiArrowRight />
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" target="_blank" rel="noreferrer" className="glass-btn secondary">
              <FiDownload /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-social">
            <a href="https://github.com/Adityaloharr0030" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/aditya-lohar-3037b32b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <FiMail />
            </a>
          </motion.div>

          {/* Transparent Glass Stats Row */}
          <motion.div variants={itemVariants} className="glass-stats">
            <div className="stat-item">
              <span className="stat-value">800+</span>
              <span className="stat-label">Meta PyTorch<br/>Hackathon</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Round 1</span>
              <span className="stat-label">FAR AWAY<br/>Intl. 2026</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">10+</span>
              <span className="stat-label">Projects<br/>Built</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right Column: Floating Developer Window ── */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.4 }}
          ref={windowRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
        >
          <motion.div 
            className="glass-editor"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="editor-header">
              <div className="editor-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="editor-title">developer.ts</span>
            </div>
            
            <div className="editor-content" style={{ transform: "translateZ(30px)" }}>
              <pre>
                <code>
                  <span className="line"><span className="keyword">const</span> <span className="variable">developer</span> = {'{'}</span>
                  <span className="line">  <span className="property">name</span>: <span className="string">"Aditya Lohar"</span>,</span>
                  <span className="line">  <span className="property">role</span>: <span className="string">"Flutter & Full-Stack"</span>,</span>
                  <span className="line">  <span className="property">skills</span>: [</span>
                  <span className="line">    <span className="string">"Flutter"</span>, <span className="string">"React"</span>, <span className="string">"AI"</span></span>
                  <span className="line">  ]</span>
                  <span className="line">{'};'}</span>
                </code>
              </pre>
            </div>
          </motion.div>
          
          {/* Subtle floating tech badges */}
          <motion.div className="tech-badge-glass float-1" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>Flutter</motion.div>
          <motion.div className="tech-badge-glass float-2" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}>React</motion.div>
          <motion.div className="tech-badge-glass float-3" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}>Node.js</motion.div>
          <motion.div className="tech-badge-glass float-4" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 5.5 }}>AI</motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
