import type { Texture } from 'three';
import NeonCanvasLabel from '../components/NeonCanvasLabel';

interface FurnitureProps {
  position?: [number, number, number];
  rotation?: number;
  contourTexture?: Texture;
}

export function Counter({ contourTexture }: { contourTexture?: Texture }) {
  return (
    <group position={[0, 0, -6]}>
      {/* Counter base */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 1.8, 1.2]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Counter top with contour texture */}
      <mesh position={[0, 1.86, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.1, 1.3]} />
        <meshStandardMaterial
          map={contourTexture}
          color="#d4b896"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Front panel */}
      <mesh position={[0, 0.9, 0.65]} castShadow receiveShadow>
        <boxGeometry args={[6, 1.8, 0.05]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
      </mesh>

      {/* Neon "Menu" label on counter front face */}
      <NeonCanvasLabel
        text="Menu"
        fontSize={70}
        position={[0, 1.2, 0.68]}
        width={2.5}
        height={0.6}
        textColor="#ffffff"
        glowColor="#00ff00"
        glowBlur={25}
      />

      {/* Side panels */}
      <mesh position={[-3, 0.9, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
      </mesh>
      <mesh position={[3, 0.9, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
      </mesh>

      {/* Footrest bar */}
      <mesh position={[0, 0.3, 0.4]} castShadow>
        <boxGeometry args={[5.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

export function CafeTable({ position = [0, 0, 0], contourTexture }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Table top with contour texture */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 16]} />
        <meshStandardMaterial
          map={contourTexture}
          color="#d4b896"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Central pedestal */}
      <mesh position={[0, 0.375, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.75, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 16]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  );
}

export function WoodenChair({ position = [0, 0, 0], rotation = 0, contourTexture }: FurnitureProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Seat with contour texture */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.05, 0.45]} />
        <meshStandardMaterial
          map={contourTexture}
          color="#c4a882"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Backrest with contour texture */}
      <mesh position={[0, 0.75, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.55, 0.05]} />
        <meshStandardMaterial
          map={contourTexture}
          color="#c4a882"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.18, 0.225, -0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0.18, 0.225, -0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[-0.18, 0.225, 0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0.18, 0.225, 0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function BarStool({ position = [0, 0, 0], contourTexture }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Seat with contour texture */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.18, 0.05, 16]} />
        <meshStandardMaterial
          map={contourTexture}
          color="#c4a882"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Central pole */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Footrest ring */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}
