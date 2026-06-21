/* eslint-disable react/no-unknown-property */
/**
 * Vehicle.jsx
 * ───────────
 * Procedural low-poly car built from Three.js primitives.
 * No external model file required.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Wheel = ({ position, speed = 0, vehicleRef }) => {
  const wheelRef = useRef();

  useFrame((state, delta) => {
    if (wheelRef.current) {
      const currentSpeed = vehicleRef ? (vehicleRef.current?.speed || 0) : speed;
      wheelRef.current.rotation.x += currentSpeed * 10 * delta;
    }
  });

  return (
    <group position={position}>
      <mesh ref={wheelRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Wheel rim accent */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.26, 8]} />
        <meshStandardMaterial color="#0d0d1a" emissive="#818cf8" emissiveIntensity={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
};

const Vehicle = ({ vehicleRef }) => {
  const bodyGlowRef = useRef();
  const headlightLRef = useRef();
  const headlightRRef = useRef();

  useFrame((state) => {
    // Subtle underglow pulse
    if (bodyGlowRef.current) {
      bodyGlowRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });

  return (
    <group>
      {/* ── Car body ──────────────────────────── */}
      {/* Lower body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 4.2]} />
        <meshStandardMaterial
          color="#0c1025"
          roughness={0.3}
          metalness={0.7}
          emissive="#818cf8"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Upper cabin */}
      <mesh position={[0, 1.0, -0.2]} castShadow>
        <boxGeometry args={[1.7, 0.55, 2.2]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.05, 0.85]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[1.6, 0.6]} />
        <meshStandardMaterial
          color="#1a1a3e"
          transparent
          opacity={0.4}
          metalness={1}
          roughness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Neon accents ──────────────────────── */}
      {/* Side neon strips */}
      <mesh position={[1.01, 0.35, 0]}>
        <boxGeometry args={[0.02, 0.08, 3.8]} />
        <meshStandardMaterial emissive="#38bdf8" emissiveIntensity={1} color="#000" />
      </mesh>
      <mesh position={[-1.01, 0.35, 0]}>
        <boxGeometry args={[0.02, 0.08, 3.8]} />
        <meshStandardMaterial emissive="#38bdf8" emissiveIntensity={1} color="#000" />
      </mesh>

      {/* Front neon bar */}
      <mesh position={[0, 0.4, 2.11]}>
        <boxGeometry args={[1.8, 0.06, 0.02]} />
        <meshStandardMaterial emissive="#818cf8" emissiveIntensity={1.2} color="#000" />
      </mesh>

      {/* Rear neon bar */}
      <mesh position={[0, 0.4, -2.11]}>
        <boxGeometry args={[1.8, 0.06, 0.02]} />
        <meshStandardMaterial emissive="#f472b6" emissiveIntensity={1.2} color="#000" />
      </mesh>

      {/* ── Headlights ────────────────────────── */}
      <mesh position={[0.6, 0.55, 2.1]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1.5} color="#fff" />
      </mesh>
      <mesh position={[-0.6, 0.55, 2.1]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1.5} color="#fff" />
      </mesh>

      {/* Headlight spot lights */}
      <spotLight
        ref={headlightLRef}
        position={[0.6, 0.55, 2.2]}
        target-position={[0.6, 0, 12]}
        angle={0.4}
        penumbra={0.5}
        intensity={3}
        distance={30}
        color="#b8c4ff"
      />
      <spotLight
        ref={headlightRRef}
        position={[-0.6, 0.55, 2.2]}
        target-position={[-0.6, 0, 12]}
        angle={0.4}
        penumbra={0.5}
        intensity={3}
        distance={30}
        color="#b8c4ff"
      />

      {/* ── Tail lights ───────────────────────── */}
      <mesh position={[0.7, 0.55, -2.1]}>
        <boxGeometry args={[0.3, 0.12, 0.05]} />
        <meshStandardMaterial emissive="#f472b6" emissiveIntensity={1} color="#200010" />
      </mesh>
      <mesh position={[-0.7, 0.55, -2.1]}>
        <boxGeometry args={[0.3, 0.12, 0.05]} />
        <meshStandardMaterial emissive="#f472b6" emissiveIntensity={1} color="#200010" />
      </mesh>

      {/* ── Underglow ─────────────────────────── */}
      <pointLight
        ref={bodyGlowRef}
        position={[0, 0.1, 0]}
        color="#c084fc"
        intensity={1.5}
        distance={6}
      />

      {/* ── Wheels ────────────────────────────── */}
      <Wheel position={[1.1, 0.15, 1.3]} vehicleRef={vehicleRef} />
      <Wheel position={[-1.1, 0.15, 1.3]} vehicleRef={vehicleRef} />
      <Wheel position={[1.1, 0.15, -1.3]} vehicleRef={vehicleRef} />
      <Wheel position={[-1.1, 0.15, -1.3]} vehicleRef={vehicleRef} />

      {/* ── Roof accent ───────────────────────── */}
      <mesh position={[0, 1.3, -0.2]}>
        <boxGeometry args={[0.6, 0.02, 1.0]} />
        <meshStandardMaterial emissive="#818cf8" emissiveIntensity={0.5} color="#000" />
      </mesh>
    </group>
  );
};

export default Vehicle;
