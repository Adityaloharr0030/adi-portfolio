import { lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CustomCursor from '../components/CustomCursor';
import ThemeToggle from '../components/ThemeToggle';
import RunningCarBackground from '../components/RunningCarBackground';
import AnimatedBackground from '../components/AnimatedBackground';
import '../App.css';
import '../components/CustomCursor.css';

// Lazy load components below the fold
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const GitHubStats = lazy(() => import('../components/GitHubStats'));
const CloudCodeExplorer = lazy(() => import('../components/CloudCodeExplorer'));
const Certifications = lazy(() => import('../components/Certifications'));
const Experience = lazy(() => import('../components/Experience'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
const SystemMonitor = lazy(() => import('../components/SystemMonitor'));

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
        <SystemMonitor />
      </Suspense>
    </motion.div>
  );
}

export default ClassicPortfolio;
