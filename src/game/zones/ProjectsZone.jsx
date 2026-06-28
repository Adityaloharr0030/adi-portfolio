/* eslint-disable react/no-unknown-property */
/**
 * ProjectsZone.jsx
 * ────────────────
 * 3D zone for the Projects section — floating holographic screens.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { zonePositions, projects } from '../../data/portfolioData';

const zone = zonePositions.projects;
const cx = zone.x;
const cz = zone.z;

const ProjectScreen = ({ project, index, total }) => {
  const ref = useRef();
  const angle = (index / total) * Math.PI * 0.8 - Math.PI * 0.4;
  const radius = 6;
  const px = Math.sin(angle) * radius;
  const pz = Math.cos(angle) * radius;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.2;
    }
  });

  return (
    <group ref={ref} position={[px, 3, pz]} rotation={[0, -angle, 0]}>
      {/* Screen */}
      <mesh>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive={zone.color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Project icon */}
      <Text
        position={[0, 0.5, 0.04]}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {project.icon}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0, 0.04]}
        fontSize={0.22}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        {project.title}
      </Text>

      {/* Category tag */}
      <Text
        position={[0, -0.4, 0.04]}
        fontSize={0.12}
        color={zone.color}
        anchorX="center"
        anchorY="middle"
      >
        {project.category}
      </Text>

      {/* Tech chips */}
      <Text
        position={[0, -0.7, 0.04]}
        fontSize={0.1}
        color="#8888aa"
        anchorX="center"
        anchorY="middle"
      >
        {project.tech.join(' • ')}
      </Text>

      {/* Glow border */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[3.15, 2.15, 0.02]} />
        <meshStandardMaterial
          emissive={zone.color}
          emissiveIntensity={0.25}
          color="#000"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

const ProjectsZone = () => {
  return (
    <group position={[cx, 0, cz]}>
      {/* Project screens arranged in an arc */}
      {projects.map((project, i) => (
        <ProjectScreen
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}

      {/* Zone label */}
      <Text
        position={[0, 7, 0]}
        fontSize={0.6}
        color={zone.color}
        anchorX="center"
        anchorY="middle"
      >
        PROJECTS
      </Text>

      {/* Ground marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6, 7, 32]} />
        <meshStandardMaterial
          emissive={zone.color}
          emissiveIntensity={0.5}
          color="#000"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default ProjectsZone;
