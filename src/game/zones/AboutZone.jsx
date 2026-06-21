/* eslint-disable react/no-unknown-property */
/**
 * AboutZone.jsx
 * ─────────────
 * 3D zone for the About section — floating holographic profile card.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { zonePositions } from '../../data/portfolioData';

const zone = zonePositions.about;
const cx = zone.x;
const cz = zone.z;

const AboutZone = () => {
  const groupRef = useRef();
  const floatRef = useRef();

  useFrame((state) => {
    if (floatRef.current) {
      floatRef.current.position.y = 4 + Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
      floatRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[cx, 0, cz]}>
      {/* Zone light beacon */}
      <pointLight position={[0, 8, 0]} color={zone.color} intensity={3} distance={25} />

      {/* Floating holographic card */}
      <group ref={floatRef} position={[0, 4, 0]}>
        {/* Card backing */}
        <mesh>
          <boxGeometry args={[5, 3, 0.08]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive={zone.color}
            emissiveIntensity={0.1}
            transparent
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Name text */}
        <Text
          position={[0, 0.7, 0.06]}
          fontSize={0.5}
          color={zone.color}
          anchorX="center"
          anchorY="middle"
        >
          ABOUT ME
        </Text>

        {/* Subtitle */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          color="#a5b4fc"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          B.Tech Computer Engineering • 2027
        </Text>

        <Text
          position={[0, -0.5, 0.06]}
          fontSize={0.15}
          color="#8888aa"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          Drive closer to learn more
        </Text>

        {/* Decorative border glow */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[5.2, 3.2, 0.02]} />
          <meshStandardMaterial
            color="#000"
            emissive={zone.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Ground marker ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6, 7, 32]} />
        <meshStandardMaterial
          color="#000"
          emissive={zone.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default AboutZone;
