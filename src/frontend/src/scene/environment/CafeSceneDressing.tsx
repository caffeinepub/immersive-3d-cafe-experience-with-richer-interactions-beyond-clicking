import { useNonBlockingTexture } from '../hooks/useNonBlockingTexture';

export default function CafeSceneDressing() {
  const contourTexture = useNonBlockingTexture('/assets/generated/contour-texture-warm.dim_1024x1024.png');
  
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
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Steam wand */}
        <mesh position={[-0.15, 0, 0.1]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* 2. Coffee Grinder on counter */}
      <group position={[1, 1.86, -5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.25, 8]} />
          <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Hopper */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.2, 8]} />
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
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.7} />
        </mesh>
        <mesh position={[0.1, 0.15, 0.1]} castShadow>
          <boxGeometry args={[0.08, 0.05, 0.08]} />
          <meshStandardMaterial color="#c89664" roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.15, -0.1]} castShadow>
          <torusGeometry args={[0.05, 0.02, 6, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.7} />
        </mesh>
      </group>

      {/* 4. Stack of Coffee Cups on counter */}
      <group position={[-1, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 8]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.11, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 8]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 8]} />
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
          <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.6} color="#ffcc99" distance={4} />
      </group>

      <group position={[-3, 4, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.5} color="#ffcc99" distance={3.5} />
      </group>

      <group position={[3, 4, 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
          <meshStandardMaterial color="#3d3228" roughness={0.4} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.5} color="#ffcc99" distance={3.5} />
      </group>

      {/* 7. Potted Plants */}
      <group position={[-5, 0, 4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.25, 6, 6]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
      </group>

      <group position={[5, 0, 4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.25, 6, 6]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
      </group>

      {/* 8. Wall Sconces */}
      <group position={[-7.8, 2.5, 2]}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <coneGeometry args={[0.12, 0.2, 6]} />
          <meshStandardMaterial color="#3d3228" roughness={0.5} />
        </mesh>
        <pointLight position={[0.2, 0, 0]} intensity={0.3} color="#ffcc99" distance={3} />
      </group>

      <group position={[7.8, 2.5, 2]}>
        <mesh rotation={[0, -Math.PI / 2, 0]} castShadow>
          <coneGeometry args={[0.12, 0.2, 6]} />
          <meshStandardMaterial color="#3d3228" roughness={0.5} />
        </mesh>
        <pointLight position={[-0.2, 0, 0]} intensity={0.3} color="#ffcc99" distance={3} />
      </group>

      {/* 9. Coffee Bags on Shelf */}
      <group position={[3.5, 1.3, -7.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.18, 0.06]} />
          <meshStandardMaterial color="#4a3f32" roughness={0.8} />
        </mesh>
      </group>

      <group position={[4.2, 1.3, -7.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.18, 0.06]} />
          <meshStandardMaterial color="#3d3228" roughness={0.8} />
        </mesh>
      </group>

      {/* 10. Napkin Holder on counter */}
      <group position={[0, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.08, 0.12]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.6} metalness={0.3} />
        </mesh>
      </group>

      {/* 11. Sugar/Condiment Containers */}
      <group position={[0.3, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 6]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.5} />
        </mesh>
      </group>

      <group position={[0.45, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 6]} />
          <meshStandardMaterial color="#e8d5c4" roughness={0.5} />
        </mesh>
      </group>

      {/* 12. Cash Register */}
      <group position={[-2.5, 1.86, -5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.15, 0.25]} />
          <meshStandardMaterial color="#1a1612" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.1, -0.05]} castShadow>
          <boxGeometry args={[0.25, 0.05, 0.15]} />
          <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* 13. Tip Jar */}
      <group position={[-1.5, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial 
            color="#e8f4f8" 
            roughness={0.1} 
            metalness={0.1} 
            opacity={0.4} 
            transparent 
          />
        </mesh>
      </group>
    </group>
  );
}
