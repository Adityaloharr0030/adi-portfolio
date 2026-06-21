import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import './App.css';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ClassicPortfolio = lazy(() => import('./pages/ClassicPortfolio'));
const GameMode = lazy(() => import('./game/GameCanvas'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
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

      {!isLoading && (
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<ClassicPortfolio />} />
            <Route path="/classic" element={<ClassicPortfolio />} />
            <Route path="/game" element={<GameMode />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
