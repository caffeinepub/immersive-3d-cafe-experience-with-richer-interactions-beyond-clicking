import LocalGltfModel from '../assets/LocalGltfModel';

interface TableModelProps {
  position: [number, number, number];
  scale?: number;
}

interface ChairModelProps {
  position: [number, number, number];
  rotation?: number;
  scale?: number;
}

/**
 * Model-backed furniture components that load local GLB/GLTF assets.
 * Provides primitive fallbacks if model loading fails.
 */

export function TableModel({ position, scale = 1 }: TableModelProps) {
  // Primitive fallback table
  const fallback = (
    <group position={position}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.05, 12]} />
        <meshStandardMaterial color="#d4b896" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 8]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
    </group>
  );

  return (
    <LocalGltfModel
      path="/assets/models/furniture/table-chair-set.glb"
      position={position}
      scale={scale * 0.8}
      fallback={fallback}
    />
  );
}

export function ChairModel({ position, rotation = 0, scale = 1 }: ChairModelProps) {
  // Primitive fallback chair
  const fallback = (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#d4b896" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.75, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.5, 0.04]} />
        <meshStandardMaterial color="#d4b896" roughness={0.6} />
      </mesh>
      <mesh position={[-0.15, 0.22, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.44, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, 0.22, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.44, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
    </group>
  );

  return (
    <LocalGltfModel
      path="/assets/models/furniture/table-chair-set.glb"
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale * 0.8}
      fallback={fallback}
    />
  );
}
