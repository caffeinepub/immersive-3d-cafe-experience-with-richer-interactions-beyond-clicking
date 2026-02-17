import { useRef } from 'react';
import { Group } from 'three';

interface HumanCharacterProps {
  position: [number, number, number];
  rotation?: number;
  skinTone?: string;
  shirtColor?: string;
  pantsColor?: string;
  seated?: boolean;
}

/**
 * Legacy primitive human character component - now static only (no animation).
 * Used as fallback when GLB models fail to load.
 * All useFrame animation logic has been removed to keep characters fully static.
 */
export default function HumanCharacter({
  position,
  rotation = 0,
  skinTone = '#d4a882',
  shirtColor = '#4a7c9e',
  pantsColor = '#3d3d3d',
  seated = false,
}: HumanCharacterProps) {
  const groupRef = useRef<Group>(null);

  const torsoHeight = seated ? 0.35 : 0.45;
  const legLength = seated ? 0.25 : 0.35;
  const legBend = seated ? Math.PI / 2.2 : 0;

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Head */}
      <mesh position={[0, seated ? 0.65 : 0.75, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={skinTone} roughness={0.8} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, seated ? 0.4 : 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, torsoHeight, 0.18]} />
        <meshStandardMaterial color={shirtColor} roughness={0.7} />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.18, seated ? 0.55 : 0.6, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.32, 0]} castShadow>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.18, seated ? 0.55 : 0.6, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.32, 0]} castShadow>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.1, seated ? 0.15 : 0.2, 0]} rotation={[legBend, 0, 0]}>
        <mesh position={[0, -legLength / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, legLength, 6]} />
          <meshStandardMaterial color={pantsColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -legLength - 0.03, seated ? 0.08 : 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.06, seated ? 0.15 : 0.12]} />
          <meshStandardMaterial color="#2a2420" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.1, seated ? 0.15 : 0.2, 0]} rotation={[legBend, 0, 0]}>
        <mesh position={[0, -legLength / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, legLength, 6]} />
          <meshStandardMaterial color={pantsColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -legLength - 0.03, seated ? 0.08 : 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.06, seated ? 0.15 : 0.12]} />
          <meshStandardMaterial color="#2a2420" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
