import LocalGltfModel from '../assets/LocalGltfModel';

interface HumanModelProps {
  position: [number, number, number];
  rotation?: number;
  modelPath: string;
  scale?: number;
}

/**
 * Static human GLB/GLTF renderer component that loads a local model from frontend static assets.
 * Includes a non-animated primitive fallback if loading fails.
 */
export default function HumanModel({
  position,
  rotation = 0,
  modelPath,
  scale = 1,
}: HumanModelProps) {
  // Simple primitive fallback - static human shape
  const fallback = (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Head */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#d4a882" roughness={0.8} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.45, 0.18]} />
        <meshStandardMaterial color="#4a7c9e" roughness={0.7} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.175, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 6]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.175, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 6]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.8} />
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
