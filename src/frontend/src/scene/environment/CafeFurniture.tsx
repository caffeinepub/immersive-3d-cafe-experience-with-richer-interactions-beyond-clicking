import { Texture } from 'three';

interface FurnitureProps {
  contourTexture?: Texture;
}

// Counter with multi-part construction
export function Counter({ contourTexture }: FurnitureProps) {
  return (
    <group position={[0, 0, -5]}>
      {/* Main counter body */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 1.8, 1.2]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      
      {/* Counter top with wood texture */}
      <mesh position={[0, 1.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.08, 1.3]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#4a3f32" 
          roughness={0.5} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Front panel detail */}
      <mesh position={[0, 0.5, 0.61]} castShadow>
        <boxGeometry args={[5.8, 1.4, 0.02]} />
        <meshStandardMaterial color="#2a2420" roughness={0.8} />
      </mesh>
      
      {/* Decorative trim */}
      <mesh position={[0, 0.05, 0.62]} castShadow>
        <boxGeometry args={[6, 0.1, 0.05]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Cafe table with pedestal base
export function CafeTable({ position, contourTexture }: { position: [number, number, number] } & FurnitureProps) {
  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.05, 12]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#4a3f32" 
          roughness={0.5}
        />
      </mesh>
      
      {/* Pedestal */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 8]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 12]} />
        <meshStandardMaterial color="#2a2420" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}

// Wooden chair with back
export function WoodenChair({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#4a3f32" roughness={0.6} />
      </mesh>
      
      {/* Back rest */}
      <mesh position={[0, 0.75, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.5, 0.04]} />
        <meshStandardMaterial color="#4a3f32" roughness={0.6} />
      </mesh>
      
      {/* Legs - front left */}
      <mesh position={[-0.15, 0.22, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.44, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      
      {/* Legs - front right */}
      <mesh position={[0.15, 0.22, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.44, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      
      {/* Legs - back left */}
      <mesh position={[-0.15, 0.45, -0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.9, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      
      {/* Legs - back right */}
      <mesh position={[0.15, 0.45, -0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.9, 6]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Bar stool
export function BarStool({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.18, 0.08, 8]} />
        <meshStandardMaterial color="#4a3f32" roughness={0.6} />
      </mesh>
      
      {/* Center post */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Footrest ring */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.015, 6, 8]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 8]} />
        <meshStandardMaterial color="#2a2420" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}
