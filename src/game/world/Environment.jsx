/* eslint-disable react/no-unknown-property */
/**
 * Environment.jsx
 * ───────────────
 * Lightweight neon-cyber environment: gradient sky, grid ground, ambient lighting.
 * Optimized — removed heavy shadow maps, reduced light count and star particles.
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
        vec2 gridCoord = mod(vWorldPos.xz, 10.0);
        float lineX = 1.0 - smoothstep(0.0, 0.3, gridCoord.x) * smoothstep(10.0, 9.7, gridCoord.x);
        float lineZ = 1.0 - smoothstep(0.0, 0.3, gridCoord.y) * smoothstep(10.0, 9.7, gridCoord.y);
        float gridLine = max(lineX, lineZ);

        float dist = length(vWorldPos.xz) / 120.0;
        float fade = 1.0 - smoothstep(0.3, 1.0, dist);

        vec3 color = mix(uColor1, uColor2, sin(vWorldPos.x * 0.02 + uTime * 0.3) * 0.5 + 0.5);
        float alpha = gridLine * fade * 0.3;

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
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
    <planeGeometry args={[400, 400]} />
    <meshBasicMaterial color="#080812" />
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
      <sphereGeometry args={[200, 16, 16]} />
      <shaderMaterial {...skyShader} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
};

/* ── Floating stars / particles ───────────────────────────────────────────── */
const Stars = () => {
  const pointsRef = useRef();
  const STAR_COUNT = 600;

  const positions = useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 80 + rand() * 120;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 5;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={STAR_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#c084fc"
        transparent
        opacity={0.5}
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
      {/* Lighting — minimal set for performance */}
      <ambientLight intensity={0.6} color="#a5b4fc" />
      <directionalLight position={[30, 40, 20]} intensity={0.8} color="#818cf8" />
      <directionalLight position={[-20, 30, -30]} intensity={0.4} color="#c084fc" />

      {/* Fog */}
      <fog attach="fog" args={['#050510', 60, 200]} />

      {/* World elements */}
      <SkyDome />
      <Ground />
      <NeonGrid />
      <Stars />
    </>
  );
};

export default Environment;
