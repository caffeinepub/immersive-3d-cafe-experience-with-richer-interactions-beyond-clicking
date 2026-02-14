import { useTexture } from '@react-three/drei';

export default function CafeSceneDressing() {
  const contourTexture = useTexture('/assets/generated/contour-texture-warm.dim_2048x2048.png');
  
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
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
      </group>

      {/* 5. Wall Menu Board behind counter */}
      <group position={[-2.5, 2.5, -7.9]}>
        {/* Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.2, 0.05]} />
          <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.3} />
        </mesh>
        
        {/* Board surface */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.4, 1.1]} />
          <meshStandardMaterial color="#1a1612" roughness={0.9} />
        </mesh>
        
        {/* Menu text lines (decorative) */}
        <mesh position={[0, 0.3, 0.04]}>
          <boxGeometry args={[1.0, 0.05, 0.01]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.15, 0.04]}>
          <boxGeometry args={[0.9, 0.04, 0.01]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.95, 0.04, 0.01]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.15, 0.04]}>
          <boxGeometry args={[0.85, 0.04, 0.01]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.8} />
        </mesh>
      </group>

      {/* 6. Pendant Light above counter */}
      <group position={[0, 3.5, -5]}>
        {/* Cord */}
        <mesh castShadow>
          <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
          <meshStandardMaterial color="#1a1612" roughness={0.8} />
        </mesh>
        
        {/* Shade */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.25, 0.3, 16, 1, true]} />
          <meshStandardMaterial 
            color="#3d3228" 
            roughness={0.6} 
            side={2}
          />
        </mesh>
        
        {/* Bulb glow */}
        <pointLight position={[0, -0.7, 0]} intensity={0.6} color="#ffcc99" distance={6} />
      </group>

      {/* 7. Pendant Light above left table */}
      <group position={[-3, 3, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
          <meshStandardMaterial color="#1a1612" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.2, 0.25, 16, 1, true]} />
          <meshStandardMaterial color="#3d3228" roughness={0.6} side={2} />
        </mesh>
        <pointLight position={[0, -0.6, 0]} intensity={0.4} color="#ffcc99" distance={4} />
      </group>

      {/* 8. Pendant Light above right table */}
      <group position={[3, 3, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
          <meshStandardMaterial color="#1a1612" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.2, 0.25, 16, 1, true]} />
          <meshStandardMaterial color="#3d3228" roughness={0.6} side={2} />
        </mesh>
        <pointLight position={[0, -0.6, 0]} intensity={0.4} color="#ffcc99" distance={4} />
      </group>

      {/* 9. Small potted plant on left table */}
      <group position={[-3.3, 0.78, 1.7]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
      </group>

      {/* 10. Book/Magazine on right table */}
      <group position={[3.2, 0.78, 2.2]} rotation={[0, 0.3, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.02, 0.2]} />
          <meshStandardMaterial color="#4a3a2a" roughness={0.8} />
        </mesh>
      </group>

      {/* 11. Coat rack near entrance */}
      <group position={[6, 0, 6]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#2a2420" roughness={0.8} metalness={0.2} />
        </mesh>
        
        {/* Pole */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 12]} />
          <meshStandardMaterial color="#3d3228" roughness={0.6} />
        </mesh>
        
        {/* Hooks */}
        <mesh position={[0.15, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.05, 0.015, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[-0.15, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <torusGeometry args={[0.05, 0.015, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.5} metalness={0.4} />
        </mesh>
      </group>

      {/* 12. Trash bin near counter */}
      <group position={[2.8, 0, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.4, 16]} />
          <meshStandardMaterial color="#2a2420" roughness={0.7} />
        </mesh>
      </group>

      {/* 13. Small side shelf with coffee supplies */}
      <group position={[2.8, 1.2, -7.7]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.8, 0.25]} />
          <meshStandardMaterial color="#3d3228" roughness={0.7} />
        </mesh>
        
        {/* Shelf */}
        <mesh position={[0, 0, 0.13]} castShadow>
          <boxGeometry args={[0.55, 0.03, 0.23]} />
          <meshStandardMaterial color="#4a3f32" roughness={0.6} />
        </mesh>
        
        {/* Items on shelf */}
        <mesh position={[-0.15, 0.05, 0.13]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
        </mesh>
        <mesh position={[0.1, 0.05, 0.13]} castShadow>
          <boxGeometry args={[0.08, 0.1, 0.06]} />
          <meshStandardMaterial color="#6a5a4a" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
