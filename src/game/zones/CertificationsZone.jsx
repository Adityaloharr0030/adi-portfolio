/* eslint-disable react/no-unknown-property */
/**
 * CertificationsZone.jsx
 * ──────────────────────
 * 3D zone — trophy room with floating certificate cards.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { zonePositions, certifications } from '../../data/portfolioData';

const zone = zonePositions.certifications;
const cx = zone.x;
const cz = zone.z;

const CertCard = ({ cert, index, total }) => {
  const ref = useRef();
  const angle = (index / total) * Math.PI * 1.2 - Math.PI * 0.6;
  const radius = 5;
  const px = Math.sin(angle) * radius;
  const pz = Math.cos(angle) * radius;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 0.6 + index * 0.8) * 0.15;
    }
  });

  return (
    <group ref={ref} position={[px, 2.5, pz]} rotation={[0, -angle, 0]}>
      {/* Card */}
      <mesh>
        <boxGeometry args={[2.2, 1.5, 0.04]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive={cert.color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Award icon */}
      <Text position={[0, 0.35, 0.03]} fontSize={0.3} anchorX="center" anchorY="middle">
        🏆
      </Text>

      {/* Title */}
      <Text
        position={[0, -0.05, 0.03]}
        fontSize={0.1}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
      >
        {cert.title}
      </Text>

      {/* Issuer */}
      <Text
        position={[0, -0.35, 0.03]}
        fontSize={0.09}
        color={cert.color}
        anchorX="center"
        anchorY="middle"
      >
        {cert.issuer}
      </Text>

      {/* Date */}
      <Text
        position={[0, -0.55, 0.03]}
        fontSize={0.07}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {cert.date}
      </Text>

      {/* Border glow */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.35, 1.65, 0.02]} />
        <meshStandardMaterial emissive={cert.color} emissiveIntensity={0.2} color="#000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const CertificationsZone = () => {
  return (
    <group position={[cx, 0, cz]}>
      <pointLight position={[0, 8, 0]} color={zone.color} intensity={3} distance={25} />

      {certifications.map((cert, i) => (
        <CertCard key={cert.title} cert={cert} index={i} total={certifications.length} />
      ))}

      <Text
        position={[0, 7, 0]}
        fontSize={0.5}
        color={zone.color}
        anchorX="center"
        anchorY="middle"
      >
        CREDENTIALS
      </Text>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6, 7, 32]} />
        <meshStandardMaterial emissive={zone.color} emissiveIntensity={0.5} color="#000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export default CertificationsZone;
