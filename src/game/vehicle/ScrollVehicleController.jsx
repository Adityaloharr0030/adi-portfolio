/* eslint-disable react/no-unknown-property */
/**
 * ScrollVehicleController.jsx
 * ───────────────────────────
 * Scroll-driven vehicle movement along a straight Z-axis highway.
 * Decoupled from React renders: reads window scroll position directly in useFrame.
 */
import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ScrollVehicleController = forwardRef(({ children }, ref) => {
  const groupRef = useRef();
  const stateRef = useRef({
    speed: 0,
    rotation: 0,
    position: new THREE.Vector3(0, 0, 0),
    tiltAngle: 0,
  });

  useFrame((state, delta) => {
    const s = stateRef.current;

    // Get current scroll position of the window directly
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? window.scrollY / docHeight : 0;

    // Map scroll percentage (0 to 1) to target Z position (0 to 320)
    // 320 matches the final 'contact' zone at the end of the straight road
    const targetZ = scrollPct * 320;

    // Smoothly interpolate the vehicle's Z coordinate towards the target Z
    const prevZ = s.position.z;
    const clampedDelta = Math.min(delta, 0.1);
    s.position.z += (targetZ - s.position.z) * (1 - Math.exp(-3 * clampedDelta)); // smooth framerate-independent lerp
    s.position.x = 0;
    s.position.y = 0;

    // Calculate instantaneous speed for wheel rotation
    s.speed = Math.abs(s.position.z - prevZ) / Math.max(0.001, delta);

    // Car runs straight forward along Z axis: rotation Y is 0, tilt is 0
    s.rotation = 0;
    s.tiltAngle = 0;

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
        speed: s.speed,
        isBoosting: false,
      };
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {children}
    </group>
  );
});

ScrollVehicleController.displayName = 'ScrollVehicleController';
export default ScrollVehicleController;