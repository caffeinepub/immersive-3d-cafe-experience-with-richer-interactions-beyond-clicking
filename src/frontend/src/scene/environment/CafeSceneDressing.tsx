import { useNonBlockingTexture } from '../hooks/useNonBlockingTexture';

export default function CafeSceneDressing() {
  const contourTexture = useNonBlockingTexture('/assets/generated/contour-texture-warm.dim_2048x2048.png');
  
  return (
    <group>
      {/* 1. Espresso Machine on counter */}
      <group position={[2, 1.86, -5]}>
        {/* Machine body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.4, 0.35]} />
          <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.6} />
        </mesh>
        
        {/* Top section */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.45, 0.1, 0.3]} />
          <meshStandardMaterial color="#1a1612" roughness={0.2} metalness={0.7} />
        </mesh>
        
        {/* Group head */}
        <mesh position={[0, -0.05, 0.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Steam wand */}
        <mesh position={[-0.15, 0, 0.1]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* 2. Coffee Grinder on counter */}
      <group position={[1, 1.86, -5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.25, 16]} />
          <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Hopper */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#1a1612" roughness={0.1} metalness={0.1} opacity={0.3} transparent />
        </mesh>
      </group>

      {/* 3. Pastry Display Case on counter */}
      <group position={[-2, 1.86, -4.8]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.1, 0.5]} />
          <meshStandardMaterial color="#3d3228" roughness={0.6} />
        </mesh>
        
        {/* Glass case */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.4, 0.45]} />
          <meshStandardMaterial 
            color="#e8f4f8" 
            roughness={0.05} 
            metalness={0.1} 
            opacity={0.3} 
            transparent 
          />
        </mesh>
        
        {/* Pastries inside */}
        <mesh position={[-0.2, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#d4a574" roughness={0.7} />
        </mesh>
        <mesh position={[0.1, 0.15, 0.1]} castShadow>
          <boxGeometry args={[0.08, 0.05, 0.08]} />
          <meshStandardMaterial color="#c89664" roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.15, -0.1]} castShadow>
          <torusGeometry args={[0.05, 0.02, 8, 16]} />
          <meshStandardMaterial color="#d4a574" roughness={0.7} />
        </mesh>
      </group>

      {/* 4. Stack of Coffee Cups on counter */}
      <group position={[-1, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
      </group>

      {/* 5. Menu Board on back wall */}
      <group position={[-2, 2.5, -7.9]}>
        {/* Board frame */}
        <mesh castShadow>
          <boxGeometry args={[1.5, 1.2, 0.05]} />
          <meshStandardMaterial color="#1a1612" roughness={0.4} />
        </mesh>
        {/* Board surface */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.4, 1.1]} />
          <meshStandardMaterial color="#2a2420" roughness={0.8} />
        </mesh>
      </group>

      {/* 6. Pendant Lights */}
      <group position={[0, 4.2, -5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.6} color="#ffcc99" distance={4} />
      </group>

      <group position={[-3, 4, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.5} color="#ffcc99" distance={3.5} />
      </group>

      <group position={[3, 4, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.5} color="#ffcc99" distance={3.5} />
      </group>

      {/* 7. Potted Plants */}
      <group position={[-7, 0, -6]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
      </group>

      <group position={[7, 0, -6]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
      </group>

      {/* 8. Magazine on left table */}
      <mesh position={[-3.3, 0.71, 2.3]} rotation={[-Math.PI / 2, 0, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.28, 0.01]} />
        <meshStandardMaterial 
          map={contourTexture}
          color="#6a5a4a" 
          roughness={0.7} 
        />
      </mesh>

      {/* 9. Coat Rack near entrance */}
      <group position={[6, 0, 6]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.35, 0.1, 16]} />
          <meshStandardMaterial color="#3d3228" roughness={0.6} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2, 12]} />
          <meshStandardMaterial color="#4a3f32" roughness={0.5} />
        </mesh>
        {/* Hooks */}
        <mesh position={[0.15, 1.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[-0.15, 1.8, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* 10. Trash Bin near counter */}
      <group position={[3.5, 0, -5.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.18, 0.5, 16]} />
          <meshStandardMaterial color="#2a2420" roughness={0.6} />
        </mesh>
      </group>

      {/* 11. Supply Shelf behind counter */}
      <group position={[0, 1.2, -6.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 0.4]} />
          <meshStandardMaterial color="#3d3228" roughness={0.6} />
        </mesh>
        {/* Items on shelf */}
        <mesh position={[-0.4, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.15, 12]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#6a5a4a" roughness={0.7} />
        </mesh>
        <mesh position={[0.4, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.18, 12]} />
          <meshStandardMaterial color="#4a3f32" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
