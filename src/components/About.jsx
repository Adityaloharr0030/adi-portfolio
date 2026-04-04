import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiUser, FiBook, FiAward, FiCpu, FiGlobe, FiZap } from 'react-icons/fi';
import './About.css';

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target, inView, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const num = parseInt(target.replace(/\D/g, ''));
    const suffix = target.replace(/[0-9]/g, '');
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num + suffix); clearInterval(timer); }
      else setCount(Math.floor(start) + (start < num ? '' : suffix));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return inView ? count || '0' : '0';
}

// ── Stat card with animated counter ─────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, color, delay, inView }) => {
  const count = useCounter(value, inView);
  return (
    <motion.div
      className="stat-card neon-card"
      style={{ '--neon-color': color }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.06, y: -6 }}
    >
      <div className="stat-icon-wrap" style={{ background: `${color}18`, borderColor: `${color}33` }}>
        <Icon style={{ color }} size={22} />
      </div>
      <span className="stat-value" style={{ color }}>{count}</span>
      <span className="stat-label">{label}</span>
      <div className="stat-glow" style={{ background: `radial-gradient(circle, ${color}20, transparent 70%)` }} />
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: FiUser,   value: '2027',  label: 'B.Tech Expected',   color: '#818cf8' },
    { icon: FiBook,   value: '10+',   label: 'Personal Projects',  color: '#c084fc' },
    { icon: FiAward,  value: '12+',   label: 'Core Technologies',  color: '#38bdf8' },
    { icon: FiCpu,    value: '3',     label: 'Active Domains',     color: '#f472b6' },
    { icon: FiGlobe,  value: '5+',    label: 'Live Deployments',   color: '#4ade80' },
    { icon: FiZap,    value: '100+',  label: 'Git Commits',        color: '#fbbf24' },
  ];

  return (
    <section id="about" className="about" ref={ref}>
      {/* Decorative grid lines */}
      <div className="about-grid-bg" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Passionate about creating <span className="gradient-text">elegant solutions</span>
          </h2>
        </motion.div>

        <div className="about-content">
          {/* ── Text block ─────────────────────────────────── */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {[
              <>
                I am a <strong>B.Tech Computer Engineering student (2023-2027)</strong> delivering
                production-grade applications across three domains:{' '}
                <strong>Full-Stack Web Development</strong>,{' '}
                <strong>Java Engineering</strong>, and{' '}
                <strong>Salesforce CRM Administration</strong>.
              </>,
              <>
                I have a proven ability to architect, build, and ship end-to-end systems
                independently — from <strong>RESTful APIs and SSR platforms</strong> to relational
                database design. My focus is on delivering scalable, efficient, and maintainable
                solutions.
              </>,
              <>
                Currently expanding expertise in{' '}
                <strong>Data Structures, Algorithms, and System Architecture</strong>, eager to
                contribute real-world skills in a challenging internship environment.
              </>,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Glow accent line */}
            <motion.div
              className="about-accent-line"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>

          {/* ── Stats grid ─────────────────────────────────── */}
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={0.4 + i * 0.08} inView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
