/* eslint-disable react/no-unknown-property */
/**
 * GameCanvas.jsx
 * ──────────────
 * The main game mode wrapper. Renders the R3F Canvas, 3D world, vehicle,
 * and HTML HUD overlays including Auto-Pilot tour controls.
 */
import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import Environment from './world/Environment';
import RoadSystem from './world/RoadSystem';
import Buildings from './world/Buildings';
import Vehicle from './vehicle/Vehicle';
import VehicleController from './vehicle/VehicleController';
import ChaseCamera from './camera/ChaseCamera';
import ZoneManager from './zones/ZoneManager';
import AboutZone from './zones/AboutZone';
import ProjectsZone from './zones/ProjectsZone';
import SkillsZone from './zones/SkillsZone';
import CertificationsZone from './zones/CertificationsZone';
import ContactZone from './zones/ContactZone';
import Speedometer from './hud/Speedometer';
import MiniMap from './hud/MiniMap';
import InfoPanel from './hud/InfoPanel';
import ControlsHint from './hud/ControlsHint';
import GameMenu from './hud/GameMenu';
import './hud/HUD.css';

/* ── Loading screen ───────────────────────────────────────────────────────── */
const GameLoader = () => (
  <div className="game-loader">
    <div className="game-loader-content">
      <div className="loader-spinner" />
      <h2>Loading Game World…</h2>
      <p>Preparing your 3D portfolio experience</p>
    </div>
  </div>
);

/* ── 3D Scene ─────────────────────────────────────────────────────────────── */
const GameScene = ({
  vehicleRef,
  onZoneEnter,
  onZoneExit,
  autoDrive,
  tourPaused,
  targetZoneIndex,
  onManualActivate,
  onZoneReached,
}) => {
  return (
    <>
      <Environment />
      <RoadSystem />
      <Buildings />
      <VehicleController
        ref={vehicleRef}
        autoDrive={autoDrive}
        tourPaused={tourPaused}
        targetZoneIndex={targetZoneIndex}
        onManualActivate={onManualActivate}
        onZoneReached={onZoneReached}
      >
        <Vehicle vehicleRef={vehicleRef} />
      </VehicleController>
      <ChaseCamera target={vehicleRef} />
      <ZoneManager vehicleRef={vehicleRef} onEnter={onZoneEnter} onExit={onZoneExit}>
        <AboutZone />
        <ProjectsZone />
        <SkillsZone />
        <CertificationsZone />
        <ContactZone />
      </ZoneManager>
    </>
  );
};

const ZONES_ORDER = ['about', 'projects', 'skills', 'certifications', 'contact'];

/* ── Main GameCanvas Component ────────────────────────────────────────────── */
const GameCanvas = () => {
  const navigate = useNavigate();
  const vehicleRef = useRef({ position: [0, 0, 0], rotation: 0, speed: 0 });
  const [activeZone, setActiveZone] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [visitedZones, setVisitedZones] = useState(new Set());
  const [quality, setQuality] = useState('high'); // 'low' | 'medium' | 'high'

  // Auto-Drive (Guided Tour) States
  const [autoDrive, setAutoDrive] = useState(true); // Auto-drive by default!
  const [tourPaused, setTourPaused] = useState(false);
  const [targetZoneIndex, setTargetZoneIndex] = useState(0);
  const pauseTimerRef = useRef(null);

  // Handle snapping to a zone and pausing to let user read
  const handleZoneReached = useCallback((_zoneIndex) => {
    setTourPaused(true);

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    // Wait 8 seconds at each zone, then continue to the next
    pauseTimerRef.current = setTimeout(() => {
      setTargetZoneIndex((prev) => (prev + 1) % ZONES_ORDER.length);
      setTourPaused(false);
    }, 8000);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(prev => !prev);
      if (e.key === 'h' || e.key === 'H') setShowControls(prev => !prev);
      
      // Press A to toggle Auto-Pilot (ignored if typing in input field)
      if ((e.key === 'a' || e.key === 'A') && 
          document.activeElement.tagName !== 'INPUT' && 
          document.activeElement.tagName !== 'TEXTAREA') {
        setAutoDrive(prev => {
          if (!prev) {
            setTourPaused(false);
            return true;
          } else {
            return false;
          }
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // Auto-hide controls after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleZoneEnter = useCallback((zoneName) => {
    setActiveZone(zoneName);
    setVisitedZones(prev => new Set([...prev, zoneName]));
    
    // Sync target zone index when passing zones manually
    const matchedIdx = ZONES_ORDER.indexOf(zoneName);
    if (matchedIdx !== -1) {
      setTargetZoneIndex(matchedIdx);
    }
  }, []);

  const handleZoneExit = useCallback(() => {
    setActiveZone(null);
  }, []);

  // Handler for user pressing W/S/A/D to drive manually
  const handleManualActivate = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setAutoDrive(false);
    setTourPaused(false);
  }, []);

  // HUD Controls
  const handleNext = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setAutoDrive(true);
    setTourPaused(false);
    setTargetZoneIndex((prev) => (prev + 1) % ZONES_ORDER.length);
  }, []);

  const handlePrev = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setAutoDrive(true);
    setTourPaused(false);
    setTargetZoneIndex((prev) => (prev - 1 + ZONES_ORDER.length) % ZONES_ORDER.length);
  }, []);

  const handleTogglePlayPause = useCallback(() => {
    setAutoDrive(true);
    setTourPaused((prev) => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      return !prev;
    });
  }, []);

  const handleToggleAutoDrive = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setAutoDrive(prev => !prev);
    setTourPaused(false);
  }, []);

  const dpr = quality === 'low' ? [0.5, 1] : quality === 'medium' ? [1, 1.5] : [1, 2];

  return (
    <div className="game-wrapper">
      {/* 3D Canvas */}
      <Suspense fallback={<GameLoader />}>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 8, 20], fov: 60, near: 0.1, far: 500 }}
          shadows={quality !== 'low'}
          gl={{ antialias: quality !== 'low', alpha: false }}
          style={{ background: '#050510' }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Suspense fallback={null}>
            <GameScene
              vehicleRef={vehicleRef}
              onZoneEnter={handleZoneEnter}
              onZoneExit={handleZoneExit}
              autoDrive={autoDrive}
              tourPaused={tourPaused}
              targetZoneIndex={targetZoneIndex}
              onManualActivate={handleManualActivate}
              onZoneReached={handleZoneReached}
            />
          </Suspense>
          <Preload all />
        </Canvas>
      </Suspense>

      {/* HTML HUD Overlays */}
      <div className="game-hud" aria-label="Game HUD">
        <Speedometer vehicleRef={vehicleRef} />
        <MiniMap vehicleRef={vehicleRef} visitedZones={visitedZones} />
        <InfoPanel activeZone={activeZone} />
        {showControls && <ControlsHint />}

        {/* Auto-Pilot Tour HUD Controller */}
        <div className="tour-controller-hud" aria-label="Tour Controls">
          <div className={`tour-badge ${autoDrive ? (tourPaused ? 'paused' : 'active') : 'manual'}`}>
            <span className="tour-badge-dot"></span>
            {autoDrive ? (tourPaused ? 'AUTOPILOT: PAUSED' : 'AUTOPILOT: TOUR ACTIVE') : 'MANUAL DRIVE'}
          </div>
          <div className="tour-controls-row">
            <button className="tour-hud-btn" onClick={handlePrev} title="Previous Section">
              ⏮
            </button>
            <button 
              className={`tour-hud-btn play-pause-btn ${tourPaused ? 'play' : 'pause'}`} 
              onClick={handleTogglePlayPause} 
              title={tourPaused ? "Play Tour" : "Pause Tour"}
              disabled={!autoDrive}
            >
              {tourPaused ? '▶' : '⏸'}
            </button>
            <button className="tour-hud-btn" onClick={handleNext} title="Next Section">
              ⏭
            </button>
            <div className="tour-divider"></div>
            <button 
              className={`tour-hud-btn mode-btn ${autoDrive ? 'active' : ''}`}
              onClick={handleToggleAutoDrive}
              title={autoDrive ? "Switch to Manual Mode" : "Switch to Auto-Pilot Tour"}
            >
              🤖
            </button>
          </div>
          <div className="tour-controls-subtext">
            {autoDrive ? "Autopilot mode. Press WASD to drive manually, or use the HUD arrows to skip." : "Manual mode. Drive with WASD/Arrows. Press [A] to resume Auto-Pilot."}
          </div>
        </div>
      </div>

      {/* Pause Menu */}
      {menuOpen && (
        <GameMenu
          onResume={() => setMenuOpen(false)}
          onClassic={() => navigate('/classic')}
          onHome={() => navigate('/')}
          quality={quality}
          onQualityChange={setQuality}
        />
      )}

      {/* Quick navigation hint */}
      <div className="game-escape-hint">
        <kbd>ESC</kbd> Menu &nbsp;·&nbsp; <kbd>H</kbd> Controls &nbsp;·&nbsp; <kbd>A</kbd> Auto-Pilot
      </div>
    </div>
  );
};

export default GameCanvas;
