import LocalGltfModel from '../assets/LocalGltfModel';

interface DogModelProps {
  position: [number, number, number];
  rotation?: number;
  modelPath: string;
  scale?: number;
}

/**
 * Static dog GLB/GLTF renderer component that loads a local model from frontend static assets.
 * Includes a non-animated primitive fallback if loading fails.
 */
export default function DogModel({
  position,
  rotation = 0,
  modelPath,
  scale = 1,
}: DogModelProps) {
  // Simple primitive fallback - static dog shape
  const fallback = (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.12, 0.3]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.18, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.1, 0.12]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.05, 0.05, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
      <mesh position={[0.05, 0.05, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
      <mesh position={[-0.05, 0.05, -0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
      <mesh position={[0.05, 0.05, -0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
    </group>
  );

  return (
    <LocalGltfModel
      path={modelPath}
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale}
      fallback={fallback}
    />
  );
}
