import { useContourTexture } from '../hooks/useContourTexture';
import { useWallMapTexture } from '../hooks/useWallMapTexture';
import { Counter, CafeTable, WoodenChair } from './CafeFurniture';
import { createContourOverlayMaterial } from '../materials/contourStyle';
import CommercialEspressoMachine from './CommercialEspressoMachine';
import WallFrameLabel from '../components/WallFrameLabel';
import MenuBoardFrameGlow from '../components/MenuBoardFrameGlow';

/**
 * Minimal always-available fallback room with very large "Seven Balance" label text, neon green frame glow on the menu board, and four table-and-chairs sets (one original plus three duplicates on the right side).
 * Renders immediately without any Suspense or Physics dependencies to ensure the user always sees some 3D geometry even if other scene elements fail.
 */
export default function BasicCafeRoomFallback() {
  const { texture: contourTexture, floorVariant: contourOverlayTexture } = useContourTexture();
  const wallMapTexture = useWallMapTexture();

  return (
    <group>
      {/* Ambient light for basic visibility */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />

      {/* Floor - two-pass rendering with base + contour overlay */}
      {/* Base floor pass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
      </mesh>

      {/* Contour overlay pass */}
      {contourOverlayTexture && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <primitive object={createContourOverlayMaterial(contourOverlayTexture)} attach="material" />
        </mesh>
      )}

      {/* Walls with green world-map texture */}
      {/* Back wall */}
      <mesh position={[0, 2, -8]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* Ceiling - matching walls with contour overlay */}
      {/* Base ceiling pass */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.9} />
      </mesh>

      {/* Ceiling contour overlay pass */}
      {contourOverlayTexture && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.999, 0]}>
          <planeGeometry args={[20, 20]} />
          <primitive object={createContourOverlayMaterial(contourOverlayTexture)} attach="material" />
        </mesh>
      )}

      {/* Counter behind back wall */}
      <Counter contourTexture={contourTexture} />

      {/* Commercial Espresso Machine on counter */}
      <CommercialEspressoMachine position={[2, 2.16, -5]} contourTexture={contourTexture} />

      {/* Coffee Grinder on counter */}
      <group position={[1, 1.86, -5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.25, 8]} />
          <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#1a1612" roughness={0.1} metalness={0.1} opacity={0.3} transparent />
        </mesh>
      </group>

      {/* Pastry Display Case on counter */}
      <group position={[-2, 1.86, -4.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.1, 0.5]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#c4a882" 
            roughness={0.6} 
          />
        </mesh>
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
      </group>

      {/* Menu Board behind counter with neon green glow */}
      <group position={[0, 3, -7.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 1.5, 0.05]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#d4b896" 
            roughness={0.7} 
          />
        </mesh>
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
        
        {/* Seven Balance Label - Very Large and Prominent */}
        <WallFrameLabel
          text="Seven Balance"
          width={2.8}
          height={1.0}
          fontSize={240}
          color="#2a2420"
          position={[0, 0, 0.03]}
          surfaceOffset={0.001}
          canvasWidth={3072}
          canvasHeight={1024}
          padding={80}
        />
      </group>

      {/* Wall Clock */}
      <group position={[-4, 3.5, -7.9]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial 
            map={contourTexture}
            color="#e8dcc8" 
            roughness={0.5} 
          />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.02, 0.15, 0.01]} />
          <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.01]} />
          <meshStandardMaterial color="#1a1612" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* Original seating area - one table with four chairs all facing toward the table */}
      <CafeTable position={[0, 0, 2]} contourTexture={contourTexture} />
      {/* Front chairs (z=1.3) facing +Z toward table */}
      <WoodenChair position={[0.7, 0, 1.3]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[-0.7, 0, 1.3]} rotation={0} contourTexture={contourTexture} />
      {/* Back chairs (z=2.7) facing -Z toward table */}
      <WoodenChair position={[0.7, 0, 2.7]} rotation={Math.PI} contourTexture={contourTexture} />
      <WoodenChair position={[-0.7, 0, 2.7]} rotation={Math.PI} contourTexture={contourTexture} />

      {/* DUPLICATED SEATING SETS ON RIGHT SIDE (positive X) */}
      
      {/* Seating set 1 - right side, front area */}
      <CafeTable position={[6.5, 0, -2]} contourTexture={contourTexture} />
      <WoodenChair position={[7.2, 0, -2.7]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[5.8, 0, -2.7]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[7.2, 0, -1.3]} rotation={Math.PI} contourTexture={contourTexture} />
      <WoodenChair position={[5.8, 0, -1.3]} rotation={Math.PI} contourTexture={contourTexture} />

      {/* Seating set 2 - right side, middle area */}
      <CafeTable position={[6.5, 0, 2]} contourTexture={contourTexture} />
      <WoodenChair position={[7.2, 0, 1.3]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[5.8, 0, 1.3]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[7.2, 0, 2.7]} rotation={Math.PI} contourTexture={contourTexture} />
      <WoodenChair position={[5.8, 0, 2.7]} rotation={Math.PI} contourTexture={contourTexture} />

      {/* Seating set 3 - right side, back area */}
      <CafeTable position={[6.5, 0, 6]} contourTexture={contourTexture} />
      <WoodenChair position={[7.2, 0, 5.3]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[5.8, 0, 5.3]} rotation={0} contourTexture={contourTexture} />
      <WoodenChair position={[7.2, 0, 6.7]} rotation={Math.PI} contourTexture={contourTexture} />
      <WoodenChair position={[5.8, 0, 6.7]} rotation={Math.PI} contourTexture={contourTexture} />
    </group>
  );
}
