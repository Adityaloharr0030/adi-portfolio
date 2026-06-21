import { lazy, Suspense } from 'react';
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
const SystemMonitor = lazy(() => import('../components/System/SystemMonitor/SystemMonitor'));

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
