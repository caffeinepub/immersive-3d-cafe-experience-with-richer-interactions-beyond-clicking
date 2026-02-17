import { useRef } from 'react';
import { Group } from 'three';
import { useCharacterMaterial } from './characterMaterials';
import { FUR_COLORS } from './characterMaterials';

interface DogCharacterProps {
  position: [number, number, number];
  rotation?: number;
  furColor?: keyof typeof FUR_COLORS;
  scale?: number;
}

/**
 * Lightweight dog character built from simple primitives.
 * Fully static with no animations - dogs remain fixed in position and rotation.
 * Optimized with shared geometries and materials for performance.
 */
export default function DogCharacter({
  position,
  rotation = 0,
  furColor = 'brown',
  scale = 1,
}: DogCharacterProps) {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const tailRef = useRef<Group>(null);
  const bodyRef = useRef<Group>(null);

  const furMaterial = useCharacterMaterial(FUR_COLORS[furColor]);
  const noseMaterial = useCharacterMaterial('#1a1612', 0.3);

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Body */}
      <group ref={bodyRef}>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.12, 0.3]} />
          <primitive object={furMaterial} attach="material" />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 0.18, 0.18]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.12, 0.1, 0.12]} />
          <primitive object={furMaterial} attach="material" />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.02, 0.08]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.08]} />
          <primitive object={furMaterial} attach="material" />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.02, 0.12]} castShadow>
          <sphereGeometry args={[0.02, 6, 6]} />
          <primitive object={noseMaterial} attach="material" />
        </mesh>
        {/* Left Ear */}
        <mesh position={[-0.05, 0.06, 0.02]} rotation={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.04, 0.08, 0.02]} />
          <primitive object={furMaterial} attach="material" />
        </mesh>
        {/* Right Ear */}
        <mesh position={[0.05, 0.06, 0.02]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.04, 0.08, 0.02]} />
          <primitive object={furMaterial} attach="material" />
        </mesh>
      </group>

      {/* Tail */}
      <group ref={tailRef} position={[0, 0.15, -0.15]}>
        <mesh position={[0, 0.05, -0.05]} rotation={[0.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.03, 0.12, 6]} />
          <primitive object={furMaterial} attach="material" />
        </mesh>
      </group>

      {/* Front Left Leg */}
      <mesh position={[-0.05, 0.05, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <primitive object={furMaterial} attach="material" />
      </mesh>

      {/* Front Right Leg */}
      <mesh position={[0.05, 0.05, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <primitive object={furMaterial} attach="material" />
      </mesh>

      {/* Back Left Leg */}
      <mesh position={[-0.05, 0.05, -0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <primitive object={furMaterial} attach="material" />
      </mesh>

      {/* Back Right Leg */}
      <mesh position={[0.05, 0.05, -0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <primitive object={furMaterial} attach="material" />
      </mesh>
    </group>
  );
}
