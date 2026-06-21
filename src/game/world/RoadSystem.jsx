/* eslint-disable react/no-unknown-property */
/**
 * RoadSystem.jsx
 * ────────────────
 * Procedural straight multi-lane cyberpunk highway.
 * Renders the highway surface, glowing lane dividers, guardrails, and gate arches.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { zonePositions } from '../../data/portfolioData';

const ROAD_WIDTH = 8;
const ROAD_LENGTH = 550; // runs from Z = -100 to Z = 450
const ROAD_Z_CENTER = 175; // center position along Z-axis

/* ── Road surface mesh ────────────────────────────────────────────────────── */
const RoadSurface = () => {
  const roadRef = useRef();

  // Road shader with center dashed line and solid side lane markings
  const roadShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uLineColor: { value: new THREE.Color('#818cf8') },
      uEdgeColor: { value: new THREE.Color('#c084fc') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uLineColor;
      uniform vec3 uEdgeColor;
      varying vec2 vUv;

      void main() {
        // Road surface - dark asphalt
        vec3 roadColor = vec3(0.06, 0.06, 0.12);

        // Center dashed line (along vUv.x = 0.5)
        float centerDist = abs(vUv.x - 0.5);
        float centerLine = smoothstep(0.02, 0.01, centerDist);
        // Make it dashed along the length (vUv.y)
        float dash = step(0.5, fract(vUv.y * 70.0 + uTime * 0.8));
        centerLine *= dash;

        // Edge lines (solid glow at vUv.x = 0.02 and vUv.x = 0.98)
        float edgeL = smoothstep(0.05, 0.02, vUv.x);
        float edgeR = smoothstep(0.05, 0.02, 1.0 - vUv.x);
        float edgeLine = max(edgeL, edgeR);

        // Combine
        vec3 color = roadColor;
        color = mix(color, uLineColor, centerLine * 0.8);
        color = mix(color, uEdgeColor, edgeLine * 0.65);

        // Add subtle side lane division marks
        float laneDist1 = abs(vUv.x - 0.25);
        float laneDist2 = abs(vUv.x - 0.75);
        float laneL = smoothstep(0.008, 0.004, laneDist1) * step(0.5, fract(vUv.y * 35.0));
        float laneR = smoothstep(0.008, 0.004, laneDist2) * step(0.5, fract(vUv.y * 35.0));
        color = mix(color, vec3(0.25, 0.25, 0.35), (laneL + laneR) * 0.4);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), []);

  useFrame((state) => {
    if (roadRef.current) {
      roadRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, ROAD_Z_CENTER]}>
      <planeGeometry args={[ROAD_WIDTH, ROAD_LENGTH]} />
      <shaderMaterial {...roadShader} side={THREE.DoubleSide} />
    </mesh>
  );
};

/* ── Guard Rails ──────────────────────────────────────────────────────────── */
const GuardRails = () => {
  const railPositions = useMemo(() => {
    const arr = [];
    const halfW = ROAD_WIDTH / 2 + 0.4;
    const spacing = 6;

    for (let z = -100; z <= 450; z += spacing) {
      arr.push({ key: `l-${z}`, position: [-halfW, 0.4, z], color: '#818cf8' });
      arr.push({ key: `r-${z}`, position: [halfW, 0.4, z], color: '#c084fc' });
    }

    return arr;
  }, []);

  return (
    <group>
      {railPositions.map((post) => (
        <mesh key={post.key} position={post.position} castShadow>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#0c0d1a" emissive={post.color} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
};

/* ── Zone Gate Arches ─────────────────────────────────────────────────────── */
const ZoneGate = ({ position, color }) => {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15;
    }
  });

  return (
    <group position={position} rotation={[0, 0, 0]}>
      {/* Left pillar */}
      <mesh position={[-4, 2.5, 0]} castShadow>
        <boxGeometry args={[0.4, 5, 0.4]} />
        <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[4, 2.5, 0]} castShadow>
        <boxGeometry args={[0.4, 5, 0.4]} />
        <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Top beam */}
      <mesh ref={glowRef} position={[0, 5.2, 0]}>
        <boxGeometry args={[8.8, 0.3, 0.3]} />
        <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Glow light */}
      <pointLight position={[0, 4, 0]} color={color} intensity={2} distance={15} />
    </group>
  );
};

/* ── Main RoadSystem ──────────────────────────────────────────────────────── */
const RoadSystem = () => {
  const gates = useMemo(() => {
    return Object.entries(zonePositions).map(([key, zone]) => {
      return {
        key,
        position: [zone.x, 0, zone.z],
        color: zone.color,
      };
    });
  }, []);

  return (
    <group>
      <RoadSurface />
      <GuardRails />
      {gates.map(({ key, ...gateProps }) => (
        <ZoneGate key={key} {...gateProps} />
      ))}
    </group>
  );
};

export default RoadSystem;
