import { Texture } from 'three';
import CommercialEspressoMachine from './CommercialEspressoMachine';
import WallFrameLabel from '../components/WallFrameLabel';
import MenuBoardFrameGlow from '../components/MenuBoardFrameGlow';

interface CafeSceneDressingProps {
  contourTexture?: Texture;
}

/**
 * Scene dressing props with larger "Seven Balance" label text and neon green frame glow on the menu board, plus beige contour texture applied to appropriate surfaces.
 */
export default function CafeSceneDressing({ contourTexture }: CafeSceneDressingProps) {
  return (
    <group>
      {/* 1. Commercial Espresso Machine on counter */}
      <CommercialEspressoMachine position={[2, 2.16, -5]} contourTexture={contourTexture} />

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

      {/* 4. Menu Board behind counter with neon green glow - beige with contour texture */}
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

        {/* Neon Green Frame Glow */}
        <MenuBoardFrameGlow
          width={3.1}
          height={1.6}
          depth={0.02}
          position={[0, 0, -0.03]}
          glowColor="#00ff00"
          glowIntensity={2.5}
          frameThickness={0.06}
        />

        {/* Seven Balance Label - Larger and more visible */}
        <WallFrameLabel
          text="Seven Balance"
          width={2.8}
          height={0.6}
          fontSize={140}
          color="#2a2420"
          position={[0, 0, 0.03]}
          surfaceOffset={0.001}
        />
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

      {/* 9. Chalkboard Stand near entrance - beige with contour texture */}
      <group position={[-5, 0, 5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.05, 0.5]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
          <meshStandardMaterial color="#3d3228" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.6, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      </group>

      {/* 10. Plant Pot near entrance - beige with contour texture */}
      <group position={[5, 0, 5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.3, 8]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.7} 
          />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <coneGeometry args={[0.2, 0.4, 6]} />
          <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.35, 0.1]} castShadow>
          <coneGeometry args={[0.15, 0.3, 6]} />
          <meshStandardMaterial color="#3a5a38" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
