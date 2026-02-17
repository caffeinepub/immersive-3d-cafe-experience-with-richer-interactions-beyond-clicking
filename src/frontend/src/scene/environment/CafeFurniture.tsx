import { Texture } from 'three';
import { TableModel, ChairModel } from './FurnitureModels';

interface FurnitureProps {
  contourTexture?: Texture;
}

// Counter with multi-part construction and beige contour texture on prominent surfaces
export function Counter({ contourTexture }: FurnitureProps) {
  return (
    <group position={[0, 0, -5]}>
      {/* Main counter body - beige with contour texture */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 1.8, 1.2]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#c4a882" 
          roughness={0.7} 
        />
      </mesh>
      
      {/* Counter top with contour texture - distinct beige surface */}
      <mesh position={[0, 1.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.08, 1.3]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#d4b896" 
          roughness={0.5} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Front panel detail - beige with contour texture */}
      <mesh position={[0, 0.5, 0.61]} castShadow>
        <boxGeometry args={[5.8, 1.4, 0.02]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#b89968" 
          roughness={0.8} 
        />
      </mesh>
      
      {/* Decorative trim */}
      <mesh position={[0, 0.05, 0.62]} castShadow>
        <boxGeometry args={[6, 0.1, 0.05]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Cafe table - now uses model with fallback to original geometry
export function CafeTable({ position, contourTexture }: { position: [number, number, number] } & FurnitureProps) {
  return (
    <TableModel position={position} scale={1} />
  );
}

// Wooden chair - now uses model with fallback to original geometry
export function WoodenChair({ position, rotation = 0, contourTexture }: { position: [number, number, number]; rotation?: number } & FurnitureProps) {
  return (
    <ChairModel position={position} rotation={rotation} scale={1} />
  );
}

// Bar stool with beige contour texture on seat
export function BarStool({ position, contourTexture }: { position: [number, number, number] } & FurnitureProps) {
  return (
    <group position={position}>
      {/* Seat - beige with contour texture */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.18, 0.08, 8]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#d4b896" 
          roughness={0.6} 
        />
      </mesh>
      
      {/* Center post */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Footrest ring */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.015, 8, 16]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 8]} />
        <meshStandardMaterial color="#2a2420" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}
