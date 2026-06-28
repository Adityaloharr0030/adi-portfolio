import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Layout/Navbar/Navbar';
import Hero from '../components/Sections/Hero/Hero';
import CustomCursor from '../components/UI/CustomCursor/CustomCursor';
import ThemeToggle from '../components/UI/ThemeToggle/ThemeToggle';
import RunningCarBackground from '../components/Backgrounds/RunningCarBackground/RunningCarBackground';
import AnimatedBackground from '../components/Backgrounds/AnimatedBackground/AnimatedBackground';
import '../App.css';
import '../components/UI/CustomCursor/CustomCursor.css';

// Lazy load components below the fold
const About = lazy(() => import('../components/Sections/About/About'));
const Skills = lazy(() => import('../components/Sections/Skills/Skills'));
const Projects = lazy(() => import('../components/Sections/Projects/Projects'));
const GitHubStats = lazy(() => import('../components/Sections/GitHubStats/GitHubStats'));
const CloudCodeExplorer = lazy(() => import('../components/Sections/CloudCodeExplorer/CloudCodeExplorer'));
const Certifications = lazy(() => import('../components/Sections/Certifications/Certifications'));
const Experience = lazy(() => import('../components/Sections/Experience/Experience'));
const Contact = lazy(() => import('../components/Sections/Contact/Contact'));
const Footer = lazy(() => import('../components/Layout/Footer/Footer'));


const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner"></div>
  </div>
);

function ClassicPortfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Zone HUD — tracks which section is currently in viewport
  const [activeSection, setActiveSection] = useState(null);
  const sectionNames = useRef([
    { id: 'about', label: 'About Me', color: '#818cf8' },
    { id: 'skills', label: 'Skills', color: '#38bdf8' },
    { id: 'projects', label: 'Projects', color: '#c084fc' },
    { id: 'certifications', label: 'Credentials', color: '#f472b6' },
    { id: 'contact', label: 'Contact', color: '#4ade80' },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sectionNames.current.find(s => s.id === entry.target.id);
            if (match) setActiveSection(match);
          }
        }
      },
      { threshold: 0.3 }
    );

    sectionNames.current.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatedBackground />
      <RunningCarBackground />
      <ThemeToggle />
      <CustomCursor />
      <motion.div className="progress-bar" style={{ scaleX }} />

      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Skills />
          <Projects />
          <GitHubStats />
          <CloudCodeExplorer />
          <Certifications />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>

      {/* Zone HUD Indicator */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            key={activeSection.id}
            className="zone-hud-indicator"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'fixed',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'rgba(5, 5, 16, 0.8)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${activeSection.color}33`,
              boxShadow: `0 0 20px ${activeSection.color}15`,
              pointerEvents: 'none',
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: activeSection.color,
              boxShadow: `0 0 8px ${activeSection.color}`,
            }} />
            <span style={{
              color: activeSection.color,
              fontSize: '0.7rem',
              fontFamily: 'var(--font-display, Syne, sans-serif)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {activeSection.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ClassicPortfolio;
