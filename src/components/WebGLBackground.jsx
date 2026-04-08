/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './WebGLBackground.css';

// Interactive blob that loosely follows mouse
const InteractiveBlob = () => {
  const mesh = useRef();
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (mesh.current) {
      // Gentle constant rotation
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      
      // Slight move towards mouse
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, (mouse.x * 2), 0.05);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, (mouse.y * 2), 0.05);
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={1.5}
    >
      <Sphere args={[1, 64, 64]} ref={mesh} scale={2.2}>
        <MeshDistortMaterial
          color="#818cf8"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#38bdf8"
          emissiveIntensity={0.1}
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

// A dynamic particle ring
const ParticleRing = () => {
  const points = useRef();

  // Generate random points in a ring
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      const radius = 6 + Math.random() * 5;
      const theta = Math.random() * 2 * Math.PI;
      const x = radius * Math.cos(theta);
      const y = (Math.random() - 0.5) * 4;
      const z = radius * Math.sin(theta);
      
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c084fc"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const WebGLBackground = () => {
  // Respect user accessibility parameters to prevent nausea for users with vestibular disorders
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="webgl-bg-wrapper" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#c084fc" />
        
        {/* Render our custom components */}
        <InteractiveBlob />
        <ParticleRing />
        
        {/* Drei helper for a beautiful animated starfield */}
        <Stars 
          radius={50} 
          depth={50} 
          count={4000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
