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
 * Primitive furniture components that render directly without GLB dependencies for reliable fallback rendering.
 */

export function TableModel({ position, scale = 1 }: TableModelProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65 * scale, 0.65 * scale, 0.05, 12]} />
        <meshStandardMaterial color="#d4b896" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08 * scale, 0.12 * scale, 0.7, 8]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function ChairModel({ position, rotation = 0, scale = 1 }: ChairModelProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4 * scale, 0.05, 0.4 * scale]} />
        <meshStandardMaterial color="#d4b896" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.75, -0.18 * scale]} castShadow receiveShadow>
        <boxGeometry args={[0.38 * scale, 0.5, 0.04]} />
        <meshStandardMaterial color="#d4b896" roughness={0.6} />
      </mesh>
      <mesh position={[-0.15 * scale, 0.22, 0.15 * scale]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02 * scale, 0.025 * scale, 0.44, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      <mesh position={[0.15 * scale, 0.22, 0.15 * scale]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02 * scale, 0.025 * scale, 0.44, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
    </group>
  );
}
