/* eslint-disable react/no-unknown-property */
/**
 * RunningCarBackground.jsx
 * ────────────────────────
 * 3D background component for the Classic Portfolio layout.
 * Renders the circular road, buildings, environment, interactive zones,
 * and the 3D vehicle which drives along the track based on page scroll.
 */
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import Environment from '../../../game/world/Environment';
import RoadSystem from '../../../game/world/RoadSystem';
import Buildings from '../../../game/world/Buildings';
import Vehicle from '../../../game/vehicle/Vehicle';
import ScrollVehicleController from '../../../game/vehicle/ScrollVehicleController';
import ChaseCamera from '../../../game/camera/ChaseCamera';
import AboutZone from '../../../game/zones/AboutZone';
import ProjectsZone from '../../../game/zones/ProjectsZone';
import SkillsZone from '../../../game/zones/SkillsZone';
import CertificationsZone from '../../../game/zones/CertificationsZone';
import ContactZone from '../../../game/zones/ContactZone';
import '../WebGLBackground/WebGLBackground.css'; // Reuses fixed background styling

const RunningCarBackground = () => {
  const vehicleRef = useRef({ position: [0, 0, 0], rotation: 0, speed: 0 });
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Disable heavy 3D scene on mobile for performance
  const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);

  if (prefersReducedMotion || isMobile) {
    return <div className="webgl-bg-solid" style={{ background: '#fdf6f9', position: 'fixed', inset: 0, zIndex: -1 }} />;
  }

  return (
    <div
      className="webgl-bg-wrapper"
      aria-hidden="true"
      style={{
        backgroundImage: 'url(/sakura-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.82) saturate(1.15)',
      }}
    >
      <Canvas
        dpr={[0.75, 1]}
        camera={{ position: [0, 8, 20], fov: 60, near: 0.1, far: 300 }}
        shadows={false}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}    
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <Environment />
          <RoadSystem vehicleRef={vehicleRef} />
          <Buildings />
          <ScrollVehicleController ref={vehicleRef}>
            <Vehicle vehicleRef={vehicleRef} />
          </ScrollVehicleController>
          <ChaseCamera target={vehicleRef} />
          <AboutZone />
          <ProjectsZone />
          <SkillsZone />
          <CertificationsZone />
          <ContactZone />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default RunningCarBackground;