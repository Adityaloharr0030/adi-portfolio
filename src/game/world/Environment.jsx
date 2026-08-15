/* eslint-disable react/no-unknown-property */
/**
 * Environment.jsx
 * ───────────────
 * 🌸 Sakura Environment — simplified since real photo handles sky/ground.
 * Only adds falling petal particles and warm lighting on top of the photo.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Falling Sakura Petals (3D particles over the photo) ──────────────────── */
const SakuraPetals = () => {
  const pointsRef = useRef();
  const PETAL_COUNT = 350;

  const { positions, offsets } = useMemo(() => {
    let seed = 77;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const pos = new Float32Array(PETAL_COUNT * 3);
    const off = new Float32Array(PETAL_COUNT);

    for (let i = 0; i < PETAL_COUNT; i++) {
      pos[i * 3]     = (rand() - 0.5) * 140;
      pos[i * 3 + 1] = rand() * 35 + 2;
      pos[i * 3 + 2] = (rand() - 0.5) * 380;
      off[i]         = rand() * Math.PI * 2;
    }
    return { positions: pos, offsets: off };
  }, []);

  const posArray = useRef(new Float32Array(positions));

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = posArray.current;
    for (let i = 0; i < PETAL_COUNT; i++) {
      const o = offsets[i];
      pos[i * 3]     += Math.sin(t * 0.3 + o) * 0.009;
      pos[i * 3 + 1] -= 0.038;
      pos[i * 3 + 2] += Math.cos(t * 0.2 + o) * 0.006;
      if (pos[i * 3 + 1] < -1) {
        pos[i * 3 + 1] = 35 + Math.random() * 10;
        pos[i * 3]     = (Math.random() - 0.5) * 140;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PETAL_COUNT}
          array={posArray.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#f9c4d8"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Transparent ground plane (road sits on this) ─────────────────────────── */
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
    <planeGeometry args={[400, 400]} />
    <meshBasicMaterial color="#1a0d10" transparent opacity={0.7} />
  </mesh>
);

/* ── Main Environment Component ───────────────────────────────────────────── */
const Environment = () => {
  return (
    <>
      {/* Warm sakura-tinted lighting */}
      <ambientLight intensity={0.8} color="#f9c4d8" />
      <directionalLight position={[-40, 60, -100]} intensity={1.2} color="#ffe4f0" />
      <directionalLight position={[30, 20, 30]}  intensity={0.4} color="#c8a2c8" />

      {/* Subtle depth fog matching photo atmosphere */}
      <fog attach="fog" args={['#3d1a2a', 40, 160]} />

      {/* Minimal ground + 3D petals */}
      <Ground />
      <SakuraPetals />
    </>
  );
};

export default Environment;
