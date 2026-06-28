/* eslint-disable react/no-unknown-property */
/**
 * SkillsZone.jsx
 * ──────────────
 * 3D zone — skill pillars with height proportional to proficiency.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { zonePositions, skillCategories } from '../../data/portfolioData';

const zone = zonePositions.skills;
const cx = zone.x;
const cz = zone.z;

const SkillPillar = ({ name, level, color, position }) => {
  const pillarRef = useRef();
  const height = (level / 100) * 5 + 1;

  useFrame((state) => {
    if (pillarRef.current) {
      pillarRef.current.material.emissiveIntensity =
        0.3 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Pillar */}
      <mesh ref={pillarRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Top cap glow */}
      <mesh position={[0, height + 0.05, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={0.8} color="#000" />
      </mesh>

      {/* Label */}
      <Text
        position={[0, height + 0.5, 0]}
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="bottom"
        maxWidth={1.5}
        textAlign="center"
      >
        {name}
      </Text>

      {/* Percentage */}
      <Text
        position={[0, height + 0.25, 0]}
        fontSize={0.15}
        color="#fff"
        anchorX="center"
        anchorY="bottom"
      >
        {`${level}%`}
      </Text>

    </group>
  );
};

const SkillsZone = () => {
  // Flatten all skills with positions in a grid
  const allSkills = [];
  skillCategories.forEach((cat, ci) => {
    cat.skills.forEach((skill, si) => {
      const row = ci;
      const col = si;
      allSkills.push({
        ...skill,
        color: cat.color,
        position: [col * 1.4 - (cat.skills.length * 1.4) / 2 + 0.7, 0, row * 2 - 3],
        key: `${cat.title}-${skill.name}`,
      });
    });
  });

  return (
    <group position={[cx, 0, cz]}>

      {/* Category labels */}
      {skillCategories.map((cat, i) => (
        <Text
          key={cat.title}
          position={[-5, 3, i * 2 - 3]}
          fontSize={0.2}
          color={cat.color}
          anchorX="right"
          anchorY="middle"
        >
          {cat.icon + ' ' + cat.title}
        </Text>
      ))}

      {/* Skill pillars */}
      {allSkills.map(({ key, ...skillProps }) => (
        <SkillPillar key={key} {...skillProps} />
      ))}

      {/* Zone title */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.6}
        color={zone.color}
        anchorX="center"
        anchorY="middle"
      >
        SKILLS
      </Text>

      {/* Ground marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6, 7, 32]} />
        <meshStandardMaterial emissive={zone.color} emissiveIntensity={0.5} color="#000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export default SkillsZone;
