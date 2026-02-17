import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { useCharacterMaterial } from './characterMaterials';
import { SKIN_TONES, CLOTHING_COLORS } from './characterMaterials';

interface HumanCharacterProps {
  position: [number, number, number];
  rotation?: number;
  skinTone?: keyof typeof SKIN_TONES;
  shirtColor?: keyof typeof CLOTHING_COLORS;
  pantsColor?: keyof typeof CLOTHING_COLORS;
  seated?: boolean;
  walking?: boolean;
  walkPath?: Vector3[];
}

/**
 * Lightweight low-poly human character built from simple primitives.
 * Supports seated pose and subtle walking/idle animations.
 * Optimized with shared geometries and materials for performance.
 */
export default function HumanCharacter({
  position,
  rotation = 0,
  skinTone = 'medium',
  shirtColor = 'blue',
  pantsColor = 'gray',
  seated = false,
  walking = false,
  walkPath = [],
}: HumanCharacterProps) {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const leftArmRef = useRef<Group>(null);
  const rightArmRef = useRef<Group>(null);
  const leftLegRef = useRef<Group>(null);
  const rightLegRef = useRef<Group>(null);
  const walkProgressRef = useRef(0);

  const skinMaterial = useCharacterMaterial(SKIN_TONES[skinTone]);
  const shirtMaterial = useCharacterMaterial(CLOTHING_COLORS[shirtColor]);
  const pantsMaterial = useCharacterMaterial(CLOTHING_COLORS[pantsColor]);

  // Subtle idle/walk animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Head bob
    if (headRef.current) {
      headRef.current.position.y = seated ? 0.65 : 0.75 + Math.sin(time * 2) * 0.01;
    }

    if (walking && walkPath.length >= 2) {
      // Walking animation along path
      walkProgressRef.current += delta * 0.3;
      if (walkProgressRef.current >= 1) {
        walkProgressRef.current = 0;
      }

      const pathIndex = Math.floor(walkProgressRef.current * (walkPath.length - 1));
      const nextIndex = (pathIndex + 1) % walkPath.length;
      const t = (walkProgressRef.current * (walkPath.length - 1)) % 1;

      const currentPoint = walkPath[pathIndex];
      const nextPoint = walkPath[nextIndex];

      groupRef.current.position.x = currentPoint.x + (nextPoint.x - currentPoint.x) * t;
      groupRef.current.position.z = currentPoint.z + (nextPoint.z - currentPoint.z) * t;

      // Face direction of movement
      const dx = nextPoint.x - currentPoint.x;
      const dz = nextPoint.z - currentPoint.z;
      groupRef.current.rotation.y = Math.atan2(dx, dz);

      // Arm swing
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(time * 4) * 0.3;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(time * 4 + Math.PI) * 0.3;
      }

      // Leg swing
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(time * 4) * 0.4;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = Math.sin(time * 4 + Math.PI) * 0.4;
      }
    } else if (!seated) {
      // Subtle idle breathing
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.05;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.05;
      }
    }
  });

  const torsoHeight = seated ? 0.35 : 0.45;
  const legLength = seated ? 0.25 : 0.35;
  const legBend = seated ? Math.PI / 2.2 : 0;

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, seated ? 0.65 : 0.75, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.12, 8, 8]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, seated ? 0.4 : 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, torsoHeight, 0.18]} />
        <primitive object={shirtMaterial} attach="material" />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.18, seated ? 0.55 : 0.6, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
          <primitive object={shirtMaterial} attach="material" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.32, 0]} castShadow>
          <sphereGeometry args={[0.05, 6, 6]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.18, seated ? 0.55 : 0.6, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
          <primitive object={shirtMaterial} attach="material" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.32, 0]} castShadow>
          <sphereGeometry args={[0.05, 6, 6]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.1, seated ? 0.15 : 0.2, 0]} rotation={[legBend, 0, 0]}>
        <mesh position={[0, -legLength / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, legLength, 6]} />
          <primitive object={pantsMaterial} attach="material" />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -legLength - 0.03, seated ? 0.08 : 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.06, seated ? 0.15 : 0.12]} />
          <meshStandardMaterial color="#2a2420" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.1, seated ? 0.15 : 0.2, 0]} rotation={[legBend, 0, 0]}>
        <mesh position={[0, -legLength / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, legLength, 6]} />
          <primitive object={pantsMaterial} attach="material" />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -legLength - 0.03, seated ? 0.08 : 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.06, seated ? 0.15 : 0.12]} />
          <meshStandardMaterial color="#2a2420" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
