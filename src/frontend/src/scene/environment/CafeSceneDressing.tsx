import { Texture } from 'three';

interface CafeSceneDressingProps {
  contourTexture?: Texture;
}

export default function CafeSceneDressing({ contourTexture }: CafeSceneDressingProps) {
  return (
    <group>
      {/* 1. Espresso Machine on counter - shiny silver chrome materials */}
      <group position={[2, 1.86, -5]}>
        {/* Machine body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.4, 0.35]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.15} metalness={0.95} />
        </mesh>
        
        {/* Top section */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.45, 0.1, 0.3]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.98} />
        </mesh>
        
        {/* Group head */}
        <mesh position={[0, -0.05, 0.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.92} />
        </mesh>
        
        {/* Steam wand */}
        <mesh position={[-0.15, 0, 0.1]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.08} metalness={0.98} />
        </mesh>
      </group>

      {/* 2. Coffee Grinder on counter - metal materials preserved */}
      <group position={[1, 1.86, -5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.25, 8]} />
          <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Hopper - glass preserved */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#1a1612" roughness={0.1} metalness={0.1} opacity={0.3} transparent />
        </mesh>
      </group>

      {/* 3. Pastry Display Case on counter - beige base with glass preserved */}
      <group position={[-2, 1.86, -4.8]}>
        {/* Base - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.1, 0.5]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.6} 
          />
        </mesh>
        
        {/* Glass case - preserved */}
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
        <mesh position={[0.2, 0.15, -0.1]} castShadow>
          <torusGeometry args={[0.04, 0.02, 8, 8]} />
          <meshStandardMaterial color="#b8865a" roughness={0.7} />
        </mesh>
      </group>

      {/* 4. Menu Board behind counter - beige with contour texture */}
      <group position={[0, 3, -7.9]}>
        {/* Board surface - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 1.5, 0.05]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
        
        {/* Frame */}
        <mesh position={[0, 0, -0.03]} castShadow>
          <boxGeometry args={[3.1, 1.6, 0.02]} />
          <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* 5. Napkin Holder on counter - beige with contour texture */}
      <group position={[-1, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.08, 0.12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.6} 
          />
        </mesh>
        
        {/* Napkins */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.12, 0.04, 0.1]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.9} />
        </mesh>
      </group>

      {/* 6. Condiment Caddy on counter - beige with contour texture */}
      <group position={[-0.5, 1.86, -4.5]}>
        {/* Caddy base - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.05, 0.15]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.6} 
          />
        </mesh>
        
        {/* Salt shaker - glass preserved */}
        <mesh position={[-0.08, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.1} opacity={0.6} transparent />
        </mesh>
        
        {/* Pepper shaker - glass preserved */}
        <mesh position={[0.08, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
          <meshStandardMaterial color="#2a2420" roughness={0.1} metalness={0.1} opacity={0.6} transparent />
        </mesh>
      </group>

      {/* 7. Coffee Bean Bags on shelf - beige with contour texture */}
      <group position={[4, 0.8, -7.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.3, 0.08]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.7} 
          />
        </mesh>
      </group>

      <group position={[4.3, 0.8, -7.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.3, 0.08]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#b89968" 
            roughness={0.7} 
          />
        </mesh>
      </group>

      {/* 8. Wall Clock */}
      <group position={[-4, 3.5, -7.9]}>
        {/* Clock face - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#e8dcc8" 
            roughness={0.5} 
          />
        </mesh>
        
        {/* Clock hands - metal preserved */}
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.01]} />
          <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.01]} />
          <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* 9. Tip Jar on counter - glass preserved */}
      <group position={[0.5, 1.86, -4.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#e8f4f8" roughness={0.05} metalness={0.1} opacity={0.4} transparent />
        </mesh>
        
        {/* Coins inside */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.01, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* 10. Chalkboard Stand near entrance - beige with contour texture */}
      <group position={[-5, 0, 5]}>
        {/* Stand base - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.05, 0.5]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
        
        {/* Post */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
          <meshStandardMaterial color="#3d3228" roughness={0.7} />
        </mesh>
        
        {/* Chalkboard */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.6, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      </group>

      {/* 11. Plant Pot near entrance - beige with contour texture */}
      <group position={[5, 0, 5]}>
        {/* Pot - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.3, 8]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.7} 
          />
        </mesh>
        
        {/* Plant */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <coneGeometry args={[0.2, 0.4, 6]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.35, 0.1]} castShadow>
          <coneGeometry args={[0.15, 0.3, 6]} />
          <meshStandardMaterial color="#3a5a38" roughness={0.8} />
        </mesh>
      </group>

      {/* 12. Bean Bag Seating near window - beige with contour texture */}
      <group position={[6, 0.2, -3]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.9} 
          />
        </mesh>
      </group>

      <group position={[6, 0.2, -1]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.9} 
          />
        </mesh>
      </group>

      {/* NEW COUNTER ITEMS */}

      {/* 13. Stacked Ceramic Cups on counter - beige with contour texture */}
      <group position={[1.5, 1.86, -4.7]}>
        {/* Bottom cup */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#e8dcc8" 
            roughness={0.5} 
          />
        </mesh>
        {/* Middle cup */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#e8dcc8" 
            roughness={0.5} 
          />
        </mesh>
        {/* Top cup */}
        <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#e8dcc8" 
            roughness={0.5} 
          />
        </mesh>
      </group>

      {/* 14. To-Go Cup Cluster on counter */}
      <group position={[-1.5, 1.86, -4.7]}>
        {/* Cup 1 - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.12, 12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
        {/* Lid 1 */}
        <mesh position={[0, 0.065, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.052, 0.01, 12]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
        </mesh>
        
        {/* Cup 2 - beige with contour texture */}
        <mesh position={[0.1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.12, 12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
        {/* Lid 2 */}
        <mesh position={[0.1, 0.065, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.052, 0.01, 12]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
        </mesh>
        
        {/* Cup 3 - beige with contour texture */}
        <mesh position={[0.05, 0, 0.09]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.12, 12]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
        {/* Lid 3 */}
        <mesh position={[0.05, 0.065, 0.09]} castShadow>
          <cylinderGeometry args={[0.052, 0.052, 0.01, 12]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
        </mesh>
      </group>

      {/* 15. Syrup Bottles on counter - glass with colored liquid */}
      <group position={[2.5, 1.86, -4.8]}>
        {/* Bottle 1 - Vanilla */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
          <meshStandardMaterial color="#f4e8d0" roughness={0.1} metalness={0.1} opacity={0.7} transparent />
        </mesh>
        {/* Pump 1 */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 6]} />
          <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Bottle 2 - Caramel */}
        <mesh position={[0.1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
          <meshStandardMaterial color="#c89664" roughness={0.1} metalness={0.1} opacity={0.7} transparent />
        </mesh>
        {/* Pump 2 */}
        <mesh position={[0.1, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 6]} />
          <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Bottle 3 - Hazelnut */}
        <mesh position={[0.2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
          <meshStandardMaterial color="#b8865a" roughness={0.1} metalness={0.1} opacity={0.7} transparent />
        </mesh>
        {/* Pump 3 */}
        <mesh position={[0.2, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 6]} />
          <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>

      {/* 16. Small Serving Tray on counter - beige with contour texture */}
      <group position={[0, 1.86, -4.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.02, 0.2]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.5} 
          />
        </mesh>
        {/* Small spoons on tray */}
        <mesh position={[-0.08, 0.015, 0]} castShadow>
          <boxGeometry args={[0.02, 0.005, 0.12]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.015, 0]} castShadow>
          <boxGeometry args={[0.02, 0.005, 0.12]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0.08, 0.015, 0]} castShadow>
          <boxGeometry args={[0.02, 0.005, 0.12]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* 17. Receipt/Cash Register Block on counter - beige with contour texture */}
      <group position={[-2.5, 1.86, -4.7]}>
        {/* Main body - beige with contour texture */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.15, 0.2]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.6} 
          />
        </mesh>
        {/* Screen/display */}
        <mesh position={[0, 0.08, 0.08]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Small receipt paper roll */}
        <mesh position={[0.08, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 8]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.8} />
        </mesh>
      </group>

      {/* 18. Small Milk Pitcher on counter - metal */}
      <group position={[1.2, 1.86, -4.6]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.1, 8]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Spout */}
        <mesh position={[0.04, 0.03, 0]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.03, 0.02, 0.04]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Handle */}
        <mesh position={[-0.05, 0, 0]} castShadow>
          <torusGeometry args={[0.03, 0.008, 6, 8, Math.PI]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
