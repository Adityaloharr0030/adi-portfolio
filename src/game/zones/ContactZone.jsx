/* eslint-disable react/no-unknown-property */
/**
 * ContactZone.jsx
 * ───────────────
 * 3D zone — finish line area with contact info and resume pickup.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { zonePositions, personalInfo } from '../../data/portfolioData';

const zone = zonePositions.contact;
const cx = zone.x;
const cz = zone.z;

const ContactZone = () => {
  const orbRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orbRef.current) {
      orbRef.current.position.y = 4 + Math.sin(t * 1.5) * 0.3;
      orbRef.current.rotation.y = t * 0.5;
      orbRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8;
    }
  });

  return (
    <group position={[cx, 0, cz]}>
      {/* Floating contact orb */}
      <group ref={orbRef} position={[0, 4, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#0a1a0a"
            emissive={zone.color}
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner glow */}
        <mesh>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshStandardMaterial
            emissive={zone.color}
            emissiveIntensity={0.6}
            color="#000"
            transparent
            opacity={0.3}
          />
        </mesh>

      </group>

      {/* Orbiting ring */}
      <group ref={ringRef} position={[0, 4, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2, 0.03, 8, 64]} />
          <meshStandardMaterial emissive={zone.color} emissiveIntensity={1} color="#000" />
        </mesh>
      </group>

      {/* Zone title */}
      <Text
        position={[0, 7.5, 0]}
        fontSize={0.6}
        color={zone.color}
        anchorX="center"
        anchorY="middle"
      >
        CONTACT
      </Text>

      {/* Email display */}
      <Text
        position={[0, 2, 3]}
        fontSize={0.18}
        color="#a5b4fc"
        anchorX="center"
        anchorY="middle"
      >
        {personalInfo.email}
      </Text>

      {/* Social links */}
      <Text
        position={[-1.5, 1.5, 3]}
        fontSize={0.15}
        color="#818cf8"
        anchorX="center"
        anchorY="middle"
      >
        GitHub ↗
      </Text>
      <Text
        position={[1.5, 1.5, 3]}
        fontSize={0.15}
        color="#0ea5e9"
        anchorX="center"
        anchorY="middle"
      >
        LinkedIn ↗
      </Text>

      {/* Resume pickup indicator */}
      <group position={[0, 0.8, -3]}>
        <mesh>
          <boxGeometry args={[1.2, 1.6, 0.05]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive="#fbbf24"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
        <Text position={[0, 0.3, 0.04]} fontSize={0.35} anchorX="center" anchorY="middle">
          📄
        </Text>
        <Text
          position={[0, -0.2, 0.04]}
          fontSize={0.1}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          RESUME
        </Text>
        <Text
          position={[0, -0.45, 0.04]}
          fontSize={0.08}
          color="#888"
          anchorX="center"
          anchorY="middle"
        >
          Download via menu
        </Text>
      </group>

      {/* Checkered finish line */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 1.2 - 5.4, 0.025, 5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.6, 2]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#1a1a2e' : '#2a2a3e'}
            emissive={i % 2 === 0 ? '#4ade80' : '#000'}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Ground marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6, 7, 32]} />
        <meshStandardMaterial emissive={zone.color} emissiveIntensity={0.5} color="#000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export default ContactZone;
