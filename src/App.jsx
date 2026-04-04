import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import Preloader from './components/Preloader';
import ParticleBackground from './components/ParticleBackground';
import './App.css';
import './components/CustomCursor.css';

// Lazy load components below the fold
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const GitHubStats = lazy(() => import('./components/GitHubStats'));
const CloudCodeExplorer = lazy(() => import('./components/CloudCodeExplorer'));
const Certifications = lazy(() => import('./components/Certifications'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const SystemMonitor = lazy(() => import('./components/SystemMonitor'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Synchronize the technical boot sequence with actual page readiness
    const handleLoad = () => {
      // Ensure the 'wow' animation plays for at least 1.8s even on fast connections
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Safety timeout for slower connections to ensure the preloader doesn't hang
      const safetyTimer = setTimeout(() => {
        setIsLoading(false);
      }, 4500);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(safetyTimer);
      };
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <motion.div
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ParticleBackground />
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
    </>
  );
}

export default App;
