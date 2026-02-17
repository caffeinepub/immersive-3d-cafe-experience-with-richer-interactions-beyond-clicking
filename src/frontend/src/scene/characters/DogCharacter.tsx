import { useRef } from 'react';
import { Group } from 'three';

interface DogCharacterProps {
  position: [number, number, number];
  rotation?: number;
  furColor?: string;
  scale?: number;
}

/**
 * Legacy primitive dog character component - now static only (no animation).
 * Used as fallback when GLB models fail to load.
 * All useFrame animation logic has been removed to keep dogs fully static.
 */
export default function DogCharacter({
  position,
  rotation = 0,
  furColor = '#8b6f47',
  scale = 1,
}: DogCharacterProps) {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.12, 0.3]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.18, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.1, 0.12]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.16, 0.26]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.08]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.16, 0.3]} castShadow>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial color="#1a1612" roughness={0.3} />
      </mesh>

      {/* Left Ear */}
      <mesh position={[-0.05, 0.24, 0.2]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.02]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Right Ear */}
      <mesh position={[0.05, 0.24, 0.2]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.02]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.2, -0.2]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 0.12, 6]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Front Left Leg */}
      <mesh position={[-0.05, 0.05, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Front Right Leg */}
      <mesh position={[0.05, 0.05, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Back Left Leg */}
      <mesh position={[-0.05, 0.05, -0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>

      {/* Back Right Leg */}
      <mesh position={[0.05, 0.05, -0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color={furColor} roughness={0.8} />
      </mesh>
    </group>
  );
}
