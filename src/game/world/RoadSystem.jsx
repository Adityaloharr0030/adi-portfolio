/* eslint-disable react/no-unknown-property */
/**
 * RoadSystem.jsx
 * ────────────────
 * Lightweight straight multi-lane cyberpunk highway.
 * Optimized: removed pointLights from gates, reduced guard rail density.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { zonePositions } from '../../data/portfolioData';

const ROAD_WIDTH = 8;
const ROAD_LENGTH = 550;
const ROAD_Z_CENTER = 175;

/* ── Road surface mesh ────────────────────────────────────────────────────── */
const RoadSurface = ({ vehicleRef }) => {
  const roadRef = useRef();
  const speedAccum = useRef(0);

  const roadShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: 0 },
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
      uniform float uSpeed;
      uniform vec3 uLineColor;
      uniform vec3 uEdgeColor;
      varying vec2 vUv;

      void main() {
        vec3 roadColor = vec3(0.06, 0.06, 0.12);

        float centerDist = abs(vUv.x - 0.5);
        float centerLine = smoothstep(0.02, 0.01, centerDist);
        float dash = step(0.5, fract(vUv.y * 70.0 + uSpeed * 0.05));
        centerLine *= dash;

        float edgeL = smoothstep(0.05, 0.02, vUv.x);
        float edgeR = smoothstep(0.05, 0.02, 1.0 - vUv.x);
        float edgeLine = max(edgeL, edgeR);

        vec3 color = roadColor;
        color = mix(color, uLineColor, centerLine * 0.8);
        color = mix(color, uEdgeColor, edgeLine * 0.65);

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
      const mat = roadRef.current.material;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      if (vehicleRef?.current) {
        const spd = vehicleRef.current.speed || 0;
        speedAccum.current += spd * 2;
        mat.uniforms.uSpeed.value = speedAccum.current;
      }
    }
  });

  return (
    <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, ROAD_Z_CENTER]}>
      <planeGeometry args={[ROAD_WIDTH, ROAD_LENGTH]} />
      <shaderMaterial {...roadShader} side={THREE.DoubleSide} />
    </mesh>
  );
};

/* ── Guard Rails (wider spacing) ──────────────────────────────────────────── */
const GuardRails = () => {
  const railPositions = useMemo(() => {
    const arr = [];
    const halfW = ROAD_WIDTH / 2 + 0.4;

    for (let z = -100; z <= 450; z += 14) {
      arr.push({ key: `l-${z}`, position: [-halfW, 0.4, z], color: '#818cf8' });
      arr.push({ key: `r-${z}`, position: [halfW, 0.4, z], color: '#c084fc' });
    }

    return arr;
  }, []);

  return (
    <group>
      {railPositions.map((post) => (
        <mesh key={post.key} position={post.position}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshBasicMaterial color={post.color} />
        </mesh>
      ))}
    </group>
  );
};

/* ── Zone Gate Arches (no pointLights) ────────────────────────────────────── */
const ZoneGate = ({ position, color }) => (
  <group position={position}>
    <mesh position={[-4, 2.5, 0]}>
      <boxGeometry args={[0.4, 5, 0.4]} />
      <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.4} />
    </mesh>
    <mesh position={[4, 2.5, 0]}>
      <boxGeometry args={[0.4, 5, 0.4]} />
      <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.4} />
    </mesh>
    <mesh position={[0, 5.2, 0]}>
      <boxGeometry args={[8.8, 0.3, 0.3]} />
      <meshStandardMaterial color="#0d0d1a" emissive={color} emissiveIntensity={0.6} />
    </mesh>
  </group>
);

/* ── Main RoadSystem ──────────────────────────────────────────────────────── */
const RoadSystem = ({ vehicleRef }) => {
  const gates = useMemo(() => {
    return Object.entries(zonePositions).map(([key, zone]) => ({
      key,
      position: [zone.x, 0, zone.z],
      color: zone.color,
    }));
  }, []);

  return (
    <group>
      <RoadSurface vehicleRef={vehicleRef} />
      <GuardRails />
      {gates.map(({ key, ...gateProps }) => (
        <ZoneGate key={key} {...gateProps} />
      ))}
    </group>
  );
};

export default RoadSystem;
