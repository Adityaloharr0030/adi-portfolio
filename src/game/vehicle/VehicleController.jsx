/* eslint-disable react/no-unknown-property */
/**
 * VehicleController.jsx
 * ─────────────────────
 * Arcade-style vehicle movement supporting both manual controls and
 * automated guided tour (auto-drive) mode along a straight Z-axis highway.
 */
import { forwardRef, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { zonePositions } from '../../data/portfolioData';

const ZONES_ORDER = ['about', 'projects', 'skills', 'certifications', 'contact'];

const MAX_SPEED = 0.8;
const BOOST_SPEED = 1.4;
const ACCELERATION = 0.02;
const BRAKE_FORCE = 0.04;
const FRICTION = 0.01;
const TRACK_LENGTH = 320;

const VehicleController = forwardRef(({
  children,
  autoDrive = true,
  tourPaused = false,
  targetZoneIndex = 0,
  onManualActivate,
  onZoneReached,
}, ref) => {
  const groupRef = useRef();
  const keysRef = useRef({});
  const stateRef = useRef({
    speed: 0,
    rotation: 0,
    position: new THREE.Vector3(0, 0, -10), // start slightly before the first zone
    isBoosting: false,
    tiltAngle: 0,
    wasAutoDrive: false,
  });

  // Keyboard handlers
  useEffect(() => {
    const onDown = (e) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = true;
      if (e.key === ' ') e.preventDefault();

      // Check if this key is a driving command
      const isManualKey = ['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key);
      if (isManualKey && autoDrive && onManualActivate) {
        onManualActivate();
      }
    };
    const onUp = (e) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [autoDrive, onManualActivate]);

  useFrame((state, delta) => {
    const keys = keysRef.current;
    const s = stateRef.current;
    const clampedDelta = Math.min(delta, 0.1);

    if (autoDrive) {
      // Auto-drive logic: drive along the straight road
      if (tourPaused) {
        s.speed = Math.max(0, s.speed - BRAKE_FORCE * 1.5 * clampedDelta * 60);
      } else {
        s.speed = Math.min(s.speed + ACCELERATION * clampedDelta * 60, 0.45); // Cruise speed
      }

      const targetZ = zonePositions[ZONES_ORDER[targetZoneIndex]].z;
      const zDiff = targetZ - s.position.z;

      if (!tourPaused) {
        // Slow down smoothly when approaching target
        if (zDiff < 20 && zDiff > 0) {
          s.speed = Math.max(0.08, s.speed - BRAKE_FORCE * clampedDelta * 60 * 0.7);
        }

        // Increment Z position
        s.position.z += s.speed * clampedDelta * 60;

        // Snapping / Reached target
        if (zDiff <= 0.2 || s.position.z >= targetZ) {
          s.position.z = targetZ;
          s.speed = 0;
          if (onZoneReached) {
            // Defer react state update to next tick to avoid warning
            setTimeout(() => onZoneReached(targetZoneIndex), 0);
          }
        }
      }

      // Smoothly snap to middle of the lane (X = 0)
      s.position.x += (0 - s.position.x) * 0.1;
      s.position.y = 0;

      s.rotation += (0 - s.rotation) * 0.1;
      s.isBoosting = false;
      s.tiltAngle += (0 - s.tiltAngle) * 0.1; // No body roll in autopilot
    } else {
      // Manual controls logic
      const maxSpd = keys['shift'] ? BOOST_SPEED : MAX_SPEED;
      s.isBoosting = keys['shift'] && s.speed > 0.3;

      // Acceleration / Braking
      if (keys['w'] || keys['arrowup']) {
        s.speed = Math.min(s.speed + ACCELERATION, maxSpd);
      } else if (keys['s'] || keys['arrowdown']) {
        s.speed = Math.max(s.speed - BRAKE_FORCE, -maxSpd * 0.4);
      } else {
        // Friction deceleration
        if (Math.abs(s.speed) < FRICTION) {
          s.speed = 0;
        } else {
          s.speed -= Math.sign(s.speed) * FRICTION;
        }
      }

      // Steering (moves X side-to-side on the road, wiggles rotation)
      const steerInput = (keys['a'] || keys['arrowleft'] ? 1 : 0) - (keys['d'] || keys['arrowright'] ? 1 : 0);
      if (Math.abs(s.speed) > 0.01) {
        s.position.x += steerInput * 0.12 * Math.min(Math.abs(s.speed) * 3, 1);
        s.rotation += (steerInput * 0.18 - s.rotation) * 0.1;
      } else {
        s.rotation += (0 - s.rotation) * 0.1;
      }

      // Body tilt (roll)
      const targetTilt = steerInput * 0.08 * Math.min(Math.abs(s.speed) * 2, 1);
      s.tiltAngle += (targetTilt - s.tiltAngle) * 0.1;

      // Apply forward velocity along Z
      s.position.z += s.speed * clampedDelta * 60;
      s.position.y = 0;

      // Highway boundaries check
      s.position.x = Math.max(-3.5, Math.min(3.5, s.position.x)); // stay on road width
      
      // Z track boundaries
      s.position.z = Math.max(-30, Math.min(TRACK_LENGTH + 30, s.position.z));
    }

    // Apply computed state to 3D meshes
    if (groupRef.current) {
      groupRef.current.position.copy(s.position);
      groupRef.current.rotation.y = s.rotation;
      groupRef.current.rotation.z = s.tiltAngle;
    }

    // Export state to shared ref
    if (ref) {
      ref.current = {
        position: [s.position.x, s.position.y, s.position.z],
        rotation: s.rotation,
        speed: Math.abs(s.speed),
        isBoosting: s.isBoosting,
      };
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {children}
    </group>
  );
});

VehicleController.displayName = 'VehicleController';

export default VehicleController;
