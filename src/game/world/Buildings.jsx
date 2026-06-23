/* eslint-disable react/no-unknown-property */
/**
 * Buildings.jsx
 * ─────────────
 * Generates a realistic metropolitan skyline along the straight highway.
 * Includes complex compound skyscrapers, cylindrical towers with roof spires,
 * neon billboards, red hazard warning lights, and streetlights with light cones.
 */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BUILDING_COUNT = 65;
const ROAD_LENGTH = 550;

/* ── Street Light Lamppost ─────────────────────────────────────────────────── */
const StreetLight = ({ position, side }) => {
  const bulbRef = useRef();

  useFrame((state) => {
    if (bulbRef.current) {
      bulbRef.current.emissiveIntensity = 3.0 + Math.sin(state.clock.elapsedTime * 6) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Light Pole */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 4, 8]} />
        <meshStandardMaterial color="#111222" roughness={0.8} />
      </mesh>
      {/* Overhang Arm */}
      <mesh position={[side * 0.4, 4, 0]} rotation={[0, 0, side * Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#111222" />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[side * 0.8, 3.8, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshStandardMaterial color="#0a0b14" />
      </mesh>
      {/* Glowing Bulb */}
      <mesh position={[side * 0.8, 3.7, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial ref={bulbRef} color="#fff" emissive="#fbbf24" emissiveIntensity={3} />
      </mesh>
    </group>
  );
};

/* ── Neon Highway Billboard ────────────────────────────────────────────────── */
const Billboard = ({ position, label, color }) => {
  const signRef = useRef();

  useFrame((state) => {
    if (signRef.current && signRef.current.material) {
      signRef.current.material.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Support Pillar */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3.6, 8]} />
        <meshStandardMaterial color="#0a0a15" />
      </mesh>
      {/* Billboard Frame */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <boxGeometry args={[4.2, 1.4, 0.3]} />
        <meshStandardMaterial color="#050510" roughness={0.6} />
      </mesh>
      {/* Glowing Sign Panel (Front) */}
      <mesh position={[0, 3.8, 0.16]}>
        <planeGeometry args={[3.8, 1.0]} />
        <meshStandardMaterial
          ref={signRef}
          color="#000"
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

/* ── Red Hazard Beacon (Tall Skyscraper Roofs) ────────────────────────────── */
const HazardBeacon = ({ position }) => {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      const flash = Math.floor(state.clock.elapsedTime * 2) % 2 === 0;
      lightRef.current.emissiveIntensity = flash ? 3 : 0;
    }
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial ref={lightRef} color="#000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

/* ── Compound City Building Component ─────────────────────────────────────── */
const DetailedBuilding = ({ position, width, height, depth, color, type }) => {
  // Generate random window patterns
  const windowRows = Math.floor(height / 2);
  const windowCols = Math.max(1, Math.floor(width / 1.6));

  return (
    <group position={position}>
      {/* Render based on building architectural type */}
      {type === 'stepped' && (
        <group>
          {/* Base tier */}
          <mesh position={[0, height * 0.2, 0]} castShadow>
            <boxGeometry args={[width, height * 0.4, depth]} />
            <meshStandardMaterial color="#060610" roughness={0.7} metalness={0.3} />
          </mesh>
          {/* Middle tier */}
          <mesh position={[0, height * 0.55, 0]} castShadow>
            <boxGeometry args={[width * 0.75, height * 0.3, depth * 0.75]} />
            <meshStandardMaterial color="#080814" roughness={0.7} metalness={0.3} />
          </mesh>
          {/* Top spire box */}
          <mesh position={[0, height * 0.8, 0]} castShadow>
            <boxGeometry args={[width * 0.5, height * 0.2, depth * 0.5]} />
            <meshStandardMaterial color="#0a0a1a" roughness={0.6} metalness={0.4} />
          </mesh>
          {/* Spire needle */}
          <mesh position={[0, height * 0.95, 0]}>
            <cylinderGeometry args={[0.02, 0.08, height * 0.1, 4]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          {/* Rooftop flashing warning beacon */}
          <HazardBeacon position={[0, height * 1.0, 0]} />
        </group>
      )}

      {type === 'cylindrical' && (
        <group>
          {/* Bottom base box */}
          <mesh position={[0, height * 0.08, 0]}>
            <boxGeometry args={[width * 1.2, height * 0.16, width * 1.2]} />
            <meshStandardMaterial color="#05050d" />
          </mesh>
          {/* Main Tower Cylinder */}
          <mesh position={[0, height * 0.5, 0]} castShadow>
            <cylinderGeometry args={[width * 0.4, width * 0.45, height * 0.84, 12]} />
            <meshStandardMaterial color="#060612" roughness={0.6} metalness={0.4} />
          </mesh>
          {/* Roof Spire Spindle */}
          <mesh position={[0, height * 0.95, 0]}>
            <cylinderGeometry args={[0.02, 0.05, height * 0.12, 6]} />
            <meshStandardMaterial color="#222" emissive={color} emissiveIntensity={0.2} />
          </mesh>
          <HazardBeacon position={[0, height * 1.01, 0]} />
        </group>
      )}

      {type === 'neon_column' && (
        <group>
          {/* Column structure */}
          <mesh position={[0, height / 2, 0]} castShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color="#070715" roughness={0.7} metalness={0.3} />
          </mesh>
          {/* Four vertical corner neon tubes */}
          <mesh position={[width / 2 + 0.05, height / 2, depth / 2 + 0.05]}>
            <cylinderGeometry args={[0.05, 0.05, height, 4]} />
            <meshStandardMaterial emissive={color} emissiveIntensity={1} color="#000" />
          </mesh>
          <mesh position={[-width / 2 - 0.05, height / 2, depth / 2 + 0.05]}>
            <cylinderGeometry args={[0.05, 0.05, height, 4]} />
            <meshStandardMaterial emissive={color} emissiveIntensity={1} color="#000" />
          </mesh>
          <mesh position={[width / 2 + 0.05, height / 2, -depth / 2 - 0.05]}>
            <cylinderGeometry args={[0.05, 0.05, height, 4]} />
            <meshStandardMaterial emissive={color} emissiveIntensity={1} color="#000" />
          </mesh>
          <mesh position={[-width / 2 - 0.05, height / 2, -depth / 2 - 0.05]}>
            <cylinderGeometry args={[0.05, 0.05, height, 4]} />
            <meshStandardMaterial emissive={color} emissiveIntensity={1} color="#000" />
          </mesh>
        </group>
      )}

      {type === 'blocky' && (
        <group>
          {/* Main structure */}
          <mesh position={[0, height / 2, 0]} castShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color="#090a18" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Accent crown ring */}
          <mesh position={[0, height + 0.1, 0]}>
            <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
            <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.8} />
          </mesh>
          {/* Horizontal window panels */}
          {Array.from({ length: windowRows }).map((_, r) => (
            <mesh key={`p-${r}`} position={[0, 1.2 + r * 2.2, depth / 2 + 0.02]}>
              <boxGeometry args={[width - 0.8, 0.4, 0.04]} />
              <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={0.25} />
            </mesh>
          ))}
        </group>
      )}

      {/* Flat window meshes for skyscraper look (applies to stepped & cylindrical as details) */}
      {type !== 'blocky' && (
        <group>
          {Array.from({ length: windowRows }).map((_, r) =>
            Array.from({ length: windowCols }).map((_, c) => {
              // Deterministic seed based on position
              const randVal = Math.sin(position[0] * 12.5 + position[2] * 4.2 + r * 8.9 + c * 3.3);
              const isLit = randVal > -0.3; // 65% windows lit
              const intensity = isLit ? 0.35 + Math.abs(randVal) * 0.45 : 0;
              return (
                <mesh
                  key={`win-${r}-${c}`}
                  position={[
                    -width / 2 + 0.8 + c * 1.5,
                    1.2 + r * 2.2,
                    depth / 2 + 0.02,
                  ]}
                >
                  <planeGeometry args={[0.55, 0.95]} />
                  <meshStandardMaterial
                    color="#000"
                    emissive="#ffeebb"
                    emissiveIntensity={intensity}
                  />
                </mesh>
              );
            })
          )}
        </group>
      )}
    </group>
  );
};

/* ── Main Buildings Generator ─────────────────────────────────────────────── */
const Buildings = () => {
  // Procedural skyline placement along both sides of Z-axis road
  const cityElements = useMemo(() => {
    const arr = [];
    const colors = ['#818cf8', '#c084fc', '#38bdf8', '#f472b6', '#4ade80'];
    const types = ['stepped', 'cylindrical', 'neon_column', 'blocky'];

    const rng = (seed) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(999);

    // 1. Skyscrapers along both sides
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const isLeft = rand() > 0.5;
      const xOffset = isLeft ? -13 - rand() * 26 : 13 + rand() * 26;
      
      // Distribute along Z axis (from Z = -120 to Z = 420)
      const zOffset = -120 + (i / BUILDING_COUNT) * 540 + rand() * 12;

      const width = 4 + rand() * 5;
      const height = 12 + rand() * 32; // taller skyscrapers for real city canyon
      const depth = 4 + rand() * 5;
      const color = colors[Math.floor(rand() * colors.length)];
      const type = types[Math.floor(rand() * types.length)];

      arr.push({
        type: 'building',
        key: `b-${i}`,
        props: {
          position: [xOffset, 0, zOffset],
          width,
          height,
          depth,
          color,
          type,
        },
      });
    }

    // 2. Streetlights along both sides of the highway
    for (let z = -100; z <= 440; z += 18) {
      arr.push({ type: 'streetlight', key: `sl-l-${z}`, props: { position: [-4.4, 0, z], side: -1 } });
      arr.push({ type: 'streetlight', key: `sl-r-${z}`, props: { position: [4.4, 0, z], side: 1 } });
    }

    // 3. Neon billboards along the road
    const billboardLabels = ['ADITYA', 'B.TECH 2027', 'REACT / NEXT', 'SPRING BOOT', 'SALESFORCE', 'JAVA CORE'];
    for (let i = 0; i < billboardLabels.length; i++) {
      const z = -40 + i * 70;
      const isLeft = i % 2 === 0;
      arr.push({
        type: 'billboard',
        key: `bill-${i}`,
        props: {
          position: [isLeft ? -5.5 : 5.5, 0, z],
          label: billboardLabels[i],
          color: colors[i % colors.length],
        },
      });
    }

    return arr;
  }, []);

  return (
    <group>
      {cityElements.map((el) => {
        if (el.type === 'building') {
          return <DetailedBuilding key={el.key} {...el.props} />;
        } else if (el.type === 'streetlight') {
          return <StreetLight key={el.key} {...el.props} />;
        } else if (el.type === 'billboard') {
          return <Billboard key={el.key} {...el.props} />;
        }
        return null;
      })}
    </group>
  );
};

export default Buildings;
