/* eslint-disable react/no-unknown-property */
/**
 * Buildings.jsx
 * ─────────────
 * Lightweight metropolitan skyline along the straight highway.
 * Optimized for smooth 60fps scroll performance.
 */
import { useMemo } from 'react';
import * as THREE from 'three';
import { techStrip } from '../../data/portfolioData';

const BUILDING_COUNT = 30;

/* ── Street Light (static, no animation) ──────────────────────────────────── */
const StreetLight = ({ position, side }) => (
  <group position={position}>
    <mesh position={[0, 2, 0]}>
      <cylinderGeometry args={[0.06, 0.08, 4, 6]} />
      <meshBasicMaterial color="#111222" />
    </mesh>
    <mesh position={[side * 0.8, 3.7, 0]}>
      <sphereGeometry args={[0.12, 6, 6]} />
      <meshBasicMaterial color="#fbbf24" />
    </mesh>
  </group>
);

/* ── Billboard (static glow, no animation) ────────────────────────────────── */
const Billboard = ({ position, color }) => (
  <group position={position}>
    <mesh position={[0, 1.8, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 3.6, 6]} />
      <meshBasicMaterial color="#0a0a15" />
    </mesh>
    <mesh position={[0, 3.8, 0]}>
      <boxGeometry args={[4.2, 1.4, 0.3]} />
      <meshBasicMaterial color="#050510" />
    </mesh>
    <mesh position={[0, 3.8, 0.16]}>
      <planeGeometry args={[3.8, 1.0]} />
      <meshBasicMaterial color={color} />
    </mesh>
  </group>
);

/* ── Cyberpunk Building (wireframe overlay, high perf) ───────────────────────── */
const SimpleBuilding = ({ position, width, height, depth, color }) => (
  <group position={position}>
    {/* Core dark glass structure */}
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[width, height, depth]} />
      <meshBasicMaterial color="#05050a" />
    </mesh>
    {/* High-tech glowing edges (wireframe) */}
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[width + 0.05, height + 0.05, depth + 0.05]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
    {/* Accent crown ring */}
    <mesh position={[0, height + 0.1, 0]}>
      <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
      <meshBasicMaterial color={color} />
    </mesh>
  </group>
);

/* ── Main Buildings Generator ─────────────────────────────────────────────── */
const Buildings = () => {
  const cityElements = useMemo(() => {
    const arr = [];
    const colors = ['#818cf8', '#c084fc', '#38bdf8', '#f472b6', '#4ade80'];

    const rng = (seed) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(999);

    // 1. Buildings along both sides
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const isLeft = rand() > 0.5;
      const xOffset = isLeft ? -13 - rand() * 26 : 13 + rand() * 26;
      const zOffset = -120 + (i / BUILDING_COUNT) * 540 + rand() * 12;
      const width = 4 + rand() * 5;
      const height = 12 + rand() * 28;
      const depth = 4 + rand() * 5;
      const color = colors[Math.floor(rand() * colors.length)];

      arr.push({
        type: 'building',
        key: `b-${i}`,
        props: { position: [xOffset, 0, zOffset], width, height, depth, color },
      });
    }

    // 2. Streetlights (wider spacing = fewer objects)
    for (let z = -100; z <= 440; z += 35) {
      arr.push({ type: 'streetlight', key: `sl-l-${z}`, props: { position: [-4.4, 0, z], side: -1 } });
      arr.push({ type: 'streetlight', key: `sl-r-${z}`, props: { position: [4.4, 0, z], side: 1 } });
    }

    // 3. Billboards
    const billboardLabels = techStrip.slice(0, 4);
    for (let i = 0; i < billboardLabels.length; i++) {
      const z = -40 + i * 100;
      const isLeft = i % 2 === 0;
      arr.push({
        type: 'billboard',
        key: `bill-${i}`,
        props: {
          position: [isLeft ? -5.5 : 5.5, 0, z],
          color: colors[i % colors.length],
        },
      });
    }

    return arr;
  }, []);

  return (
    <group>
      {cityElements.map((el) => {
        if (el.type === 'building') return <SimpleBuilding key={el.key} {...el.props} />;
        if (el.type === 'streetlight') return <StreetLight key={el.key} {...el.props} />;
        if (el.type === 'billboard') return <Billboard key={el.key} {...el.props} />;
        return null;
      })}
    </group>
  );
};

export default Buildings;
