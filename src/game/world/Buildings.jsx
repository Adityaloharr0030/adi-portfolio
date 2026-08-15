/* eslint-disable react/no-unknown-property */
/**
 * Buildings.jsx  →  CherryTrees.jsx
 * ────────────────────────────────
 * 🌸 Japanese cherry blossom trees lining the road.
 * Replaces the cyberpunk buildings with beautiful sakura trees.
 */
import { useMemo } from 'react';
import * as THREE from 'three';

/* ── Single Cherry Blossom Tree ───────────────────────────────────────────── */
const CherryTree = ({ position, trunkHeight = 6, canopyRadius = 3.5, color = '#f4a7c3', lean = 0 }) => (
  <group position={position} rotation={[0, lean, 0]}>
    {/* Trunk */}
    <mesh position={[0, trunkHeight / 2, 0]}>
      <cylinderGeometry args={[0.18, 0.28, trunkHeight, 7]} />
      <meshBasicMaterial color="#3d1a10" />
    </mesh>

    {/* Main blossom canopy — layered spheres for volume */}
    <mesh position={[0, trunkHeight + canopyRadius * 0.5, 0]}>
      <sphereGeometry args={[canopyRadius, 8, 7]} />
      <meshBasicMaterial color={color} transparent opacity={0.88} />
    </mesh>

    {/* Secondary canopy blob — offset for organic shape */}
    <mesh position={[canopyRadius * 0.4, trunkHeight + canopyRadius * 0.7, -canopyRadius * 0.2]}>
      <sphereGeometry args={[canopyRadius * 0.72, 7, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} />
    </mesh>

    {/* Third petal cluster */}
    <mesh position={[-canopyRadius * 0.35, trunkHeight + canopyRadius * 0.55, canopyRadius * 0.25]}>
      <sphereGeometry args={[canopyRadius * 0.65, 7, 6]} />
      <meshBasicMaterial color="#f9c4d8" transparent opacity={0.72} />
    </mesh>

    {/* Wisteria-tinted inner glow blob */}
    <mesh position={[0, trunkHeight + canopyRadius * 0.65, 0]}>
      <sphereGeometry args={[canopyRadius * 0.45, 6, 5]} />
      <meshBasicMaterial color="#e8b4d4" transparent opacity={0.55} />
    </mesh>
  </group>
);

/* ── Stone Lantern (replaces street lights) ──────────────────────────────── */
const StoneLantern = ({ position }) => (
  <group position={position}>
    {/* Base stone */}
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.25, 0.35, 0.6, 6]} />
      <meshBasicMaterial color="#4a3540" />
    </mesh>
    {/* Pillar */}
    <mesh position={[0, 1.2, 0]}>
      <cylinderGeometry args={[0.1, 0.14, 1.8, 6]} />
      <meshBasicMaterial color="#5a4050" />
    </mesh>
    {/* Lantern body */}
    <mesh position={[0, 2.4, 0]}>
      <boxGeometry args={[0.5, 0.55, 0.5]} />
      <meshBasicMaterial color="#3a2030" />
    </mesh>
    {/* Lantern roof */}
    <mesh position={[0, 2.8, 0]}>
      <coneGeometry args={[0.4, 0.35, 4]} />
      <meshBasicMaterial color="#4a2535" />
    </mesh>
    {/* Warm glow inside */}
    <mesh position={[0, 2.4, 0]}>
      <boxGeometry args={[0.35, 0.38, 0.35]} />
      <meshBasicMaterial color="#fbbf70" transparent opacity={0.6} />
    </mesh>
  </group>
);

/* ── Main Scene Generator ────────────────────────────────────────────────── */
const Buildings = () => {
  const sceneElements = useMemo(() => {
    const arr = [];

    // Deterministic RNG
    const rng = (seed) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(999);

    // Petal color palette
    const colors = ['#f4a7c3', '#f9c4d8', '#e8b4d4', '#c8a2c8', '#f2afc5'];

    // 1. Cherry trees along both sides of the road
    const TREE_COUNT = 36;
    for (let i = 0; i < TREE_COUNT; i++) {
      const isLeft = i % 2 === 0;
      // Trees close to road edge, staggered in depth
      const xOffset = isLeft
        ? -(5 + rand() * 14)
        : (5 + rand() * 14);
      const zOffset = -100 + (i / TREE_COUNT) * 520 + rand() * 8;
      const trunkH = 5 + rand() * 4;
      const canopyR = 3 + rand() * 2.5;
      const color = colors[Math.floor(rand() * colors.length)];
      const lean = (rand() - 0.5) * 0.18; // slight natural lean

      arr.push({
        type: 'tree',
        key: `tree-${i}`,
        props: { position: [xOffset, 0, zOffset], trunkHeight: trunkH, canopyRadius: canopyR, color, lean },
      });
    }

    // 2. Background trees — further back, denser forest feel
    const BG_COUNT = 22;
    for (let i = 0; i < BG_COUNT; i++) {
      const isLeft = rand() > 0.5;
      const xOffset = isLeft ? -(18 + rand() * 20) : (18 + rand() * 20);
      const zOffset = -80 + rand() * 500;
      const trunkH = 7 + rand() * 5;
      const canopyR = 4 + rand() * 3;
      const color = colors[Math.floor(rand() * colors.length)];

      arr.push({
        type: 'tree',
        key: `bg-tree-${i}`,
        props: { position: [xOffset, 0, zOffset], trunkHeight: trunkH, canopyRadius: canopyR, color, lean: 0 },
      });
    }

    // 3. Stone lanterns along roadside (replaces streetlights)
    for (let z = -80; z <= 440; z += 30) {
      arr.push({ type: 'lantern', key: `ll-${z}`, props: { position: [-3.8, 0, z] } });
      arr.push({ type: 'lantern', key: `lr-${z}`, props: { position: [3.8, 0, z] } });
    }

    return arr;
  }, []);

  return (
    <group>
      {sceneElements.map((el) => {
        if (el.type === 'tree')    return <CherryTree   key={el.key} {...el.props} />;
        if (el.type === 'lantern') return <StoneLantern key={el.key} {...el.props} />;
        return null;
      })}
    </group>
  );
};

export default Buildings;
