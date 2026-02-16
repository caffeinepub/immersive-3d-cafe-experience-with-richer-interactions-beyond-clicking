import { Texture } from 'three';

interface CommercialEspressoMachineProps {
  position?: [number, number, number];
  contourTexture?: Texture;
}

/**
 * Commercial-grade espresso machine prop with multiple group heads,
 * steam wands, and professional café machine details.
 * Designed to sit with its base on the counter surface.
 */
export default function CommercialEspressoMachine({ 
  position = [0, 0, 0],
  contourTexture 
}: CommercialEspressoMachineProps) {
  return (
    <group position={position}>
      {/* Main machine body - wider commercial unit */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.6, 0.5]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.15} metalness={0.95} />
      </mesh>
      
      {/* Top section with controls */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.15, 0.1, 0.45]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.98} />
      </mesh>
      
      {/* Control panel display */}
      <mesh position={[0, 0.35, 0.23]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} emissive="#003300" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Left group head assembly */}
      <group position={[-0.35, -0.1, 0.28]}>
        {/* Group head */}
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 12]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.92} />
        </mesh>
        {/* Portafilter holder */}
        <mesh position={[0, -0.12, 0]} castShadow>
          <boxGeometry args={[0.15, 0.04, 0.12]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>
      
      {/* Right group head assembly */}
      <group position={[0.35, -0.1, 0.28]}>
        {/* Group head */}
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 12]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.92} />
        </mesh>
        {/* Portafilter holder */}
        <mesh position={[0, -0.12, 0]} castShadow>
          <boxGeometry args={[0.15, 0.04, 0.12]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>
      
      {/* Left steam wand */}
      <group position={[-0.5, 0.05, 0.15]}>
        <mesh rotation={[0, 0, -0.4]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.08} metalness={0.98} />
        </mesh>
        {/* Steam wand tip */}
        <mesh position={[-0.12, -0.12, 0]} rotation={[0, 0, -0.4]} castShadow>
          <cylinderGeometry args={[0.015, 0.025, 0.08, 8]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.95} />
        </mesh>
      </group>
      
      {/* Right steam wand */}
      <group position={[0.5, 0.05, 0.15]}>
        <mesh rotation={[0, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.08} metalness={0.98} />
        </mesh>
        {/* Steam wand tip */}
        <mesh position={[0.12, -0.12, 0]} rotation={[0, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.015, 0.025, 0.08, 8]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.95} />
        </mesh>
      </group>
      
      {/* Hot water spout */}
      <group position={[0, 0.05, 0.15]}>
        <mesh rotation={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.25, 8]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.08} metalness={0.98} />
        </mesh>
      </group>
      
      {/* Drip tray */}
      <mesh position={[0, -0.32, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.04, 0.35]} />
        <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Drip tray grate */}
      <mesh position={[0, -0.29, 0.15]} castShadow>
        <boxGeometry args={[1.05, 0.02, 0.3]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Control knobs */}
      <mesh position={[-0.45, 0.15, 0.23]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
        <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.25, 0.15, 0.23]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
        <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.25, 0.15, 0.23]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
        <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.15, 0.23]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
        <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.5} />
      </mesh>
      
      {/* Pressure gauges */}
      <mesh position={[-0.35, 0.25, 0.23]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh position={[0.35, 0.25, 0.23]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* Cup warming tray on top */}
      <mesh position={[0, 0.42, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.04, 0.3]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}
