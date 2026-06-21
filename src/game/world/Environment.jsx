/* eslint-disable react/no-unknown-property */
/**
 * Environment.jsx
 * ───────────────
 * Neon-cyber environment: gradient sky, volumetric fog, grid ground, ambient lighting.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Neon Grid Ground ─────────────────────────────────────────────────────── */
const NeonGrid = () => {
  const gridRef = useRef();

  const gridShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#818cf8') },
      uColor2: { value: new THREE.Color('#c084fc') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying vec3 vWorldPos;

      void main() {
        vec2 grid = abs(fract(vWorldPos.xz * 0.1 - 0.5) - 0.5) / fwidth(vWorldPos.xz * 0.1);
        float line = min(grid.x, grid.y);
        float gridLine = 1.0 - min(line, 1.0);

        // Fade with distance from center
        float dist = length(vWorldPos.xz) / 120.0;
        float fade = 1.0 - smoothstep(0.3, 1.0, dist);

        // Pulse animation
        float pulse = sin(uTime * 0.5 + dist * 3.0) * 0.15 + 0.85;

        vec3 color = mix(uColor1, uColor2, sin(vWorldPos.x * 0.02 + uTime * 0.3) * 0.5 + 0.5);
        float alpha = gridLine * fade * pulse * 0.35;

        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[300, 300, 1, 1]} />
      <shaderMaterial
        {...gridShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ── Ground plane (solid dark) ────────────────────────────────────────────── */
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
    <planeGeometry args={[400, 400]} />
    <meshStandardMaterial color="#080812" roughness={0.95} metalness={0.1} />
  </mesh>
);

/* ── Sky dome with gradient ───────────────────────────────────────────────── */
const SkyDome = () => {
  const skyShader = useMemo(() => ({
    uniforms: {
      uTopColor: { value: new THREE.Color('#050510') },
      uBottomColor: { value: new THREE.Color('#0a0a20') },
      uHorizonColor: { value: new THREE.Color('#0d0d2b') },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform vec3 uHorizonColor;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition).y;
        vec3 color;
        if (h > 0.0) {
          color = mix(uHorizonColor, uTopColor, pow(h, 0.6));
        } else {
          color = mix(uHorizonColor, uBottomColor, pow(-h, 0.4));
        }
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), []);

  return (
    <mesh>
      <sphereGeometry args={[200, 32, 32]} />
      <shaderMaterial {...skyShader} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
};

/* ── Floating stars / particles ───────────────────────────────────────────── */
const Stars = () => {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    // Pure seeded pseudo-random generator to satisfy react-hooks/purity
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 80 + rand() * 120;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 5; // Keep above ground
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2000} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#c084fc"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Main Environment Component ───────────────────────────────────────────── */
const Environment = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} color="#a5b4fc" />
      <directionalLight
        position={[30, 40, 20]}
        intensity={1.0}
        color="#818cf8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <directionalLight position={[-20, 30, -30]} intensity={0.6} color="#c084fc" />
      <pointLight position={[0, 15, 0]} intensity={1.0} color="#38bdf8" distance={100} />
      <pointLight position={[50, 10, 0]} intensity={0.8} color="#818cf8" distance={60} />
      <pointLight position={[-50, 10, 0]} intensity={0.8} color="#c084fc" distance={60} />
      <pointLight position={[0, 10, 50]} intensity={0.8} color="#f472b6" distance={60} />
      <pointLight position={[0, 10, -50]} intensity={0.8} color="#4ade80" distance={60} />

      {/* Fog — pushed farther back for better visibility */}
      <fog attach="fog" args={['#050510', 80, 250]} />

      {/* World elements */}
      <SkyDome />
      <Ground />
      <NeonGrid />
      <Stars />
    </>
  );
};

export default Environment;
