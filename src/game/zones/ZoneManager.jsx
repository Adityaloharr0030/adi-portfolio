/* eslint-disable react/no-unknown-property */
/**
 * ZoneManager.jsx
 * ───────────────
 * Manages proximity detection between the vehicle and portfolio zones.
 * Triggers enter/exit callbacks for HUD panel display.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { zonePositions } from '../../data/portfolioData';

const TRIGGER_DISTANCE = 15;

const ZoneManager = ({ vehicleRef, onEnter, onExit, children }) => {
  const activeZoneRef = useRef(null);

  useFrame(() => {
    if (!vehicleRef?.current) return;

    const [vx, , vz] = vehicleRef.current.position;
    let closestZone = null;
    let closestDist = Infinity;

    // Check distance to each zone along the straight Z-axis
    for (const [name, zone] of Object.entries(zonePositions)) {
      const dist = Math.abs(vz - zone.z);

      if (dist < TRIGGER_DISTANCE && dist < closestDist) {
        closestDist = dist;
        closestZone = name;
      }
    }

    // Fire enter/exit callbacks
    if (closestZone !== activeZoneRef.current) {
      if (closestZone) {
        onEnter(closestZone);
      } else {
        onExit();
      }
      activeZoneRef.current = closestZone;
    }
  });

  return <group>{children}</group>;
};

export default ZoneManager;
