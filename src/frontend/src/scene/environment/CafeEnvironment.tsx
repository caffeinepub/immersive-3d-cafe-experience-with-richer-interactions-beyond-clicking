import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { usePlane } from '@react-three/cannon';
import { Counter, CafeTable, WoodenChair, BarStool } from './CafeFurniture';
import CafeSceneDressing from './CafeSceneDressing';
import { useContourTexture } from '../hooks/useContourTexture';
import { useWallMapTexture } from '../hooks/useWallMapTexture';
import { logSceneSuccess } from '../utils/sceneDiagnostics';
import { createContourOverlayMaterial } from '../materials/contourStyle';

interface CafeEnvironmentProps {
  onMounted?: () => void;
}

export default function CafeEnvironment({ onMounted }: CafeEnvironmentProps) {
  const { floorVariant, furnitureVariant } = useContourTexture();
  const wallMapTexture = useWallMapTexture();
  const hasMounted = useRef(false);
  
  // Signal when full environment has mounted
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      logSceneSuccess('full-environment-mount', 'Full café environment mounted successfully');
      if (onMounted) {
        onMounted();
      }
    }
  }, [onMounted]);

  // Floor
  const [floorRef] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <group>
      {/* Floor - lighter base color for high-contrast black contour lines */}
      <mesh ref={floorRef} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          map={floorVariant}
          color="#f5ede0"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Ceiling - base layer with warm neutral color */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]} receiveShadow castShadow={false}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#f5ede0"
          roughness={0.85}
          metalness={0.05}
          side={2} // DoubleSide to be visible from below
        />
      </mesh>

      {/* Ceiling contour overlay - unlit layer slightly below base for visibility from below */}
      {floorVariant && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.999, 0]}>
          <planeGeometry args={[30, 30]} />
          <primitive object={createContourOverlayMaterial(floorVariant, 0.5)} attach="material" />
        </mesh>
      )}

      {/* Walls - with green world-map texture */}
      <mesh position={[0, 2.5, -8]} receiveShadow>
        <boxGeometry args={[30, 5, 0.2]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      <mesh position={[-8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      <mesh position={[8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* UPGRADED FURNITURE */}
      
      {/* Counter with detailed construction */}
      <Counter contourTexture={furnitureVariant} />

      {/* Single table with four chairs - all facing toward the table */}
      <CafeTable position={[0, 0, 2]} contourTexture={furnitureVariant} />
      {/* Front chairs (z=1.3) facing +Z toward table */}
      <WoodenChair position={[0.7, 0, 1.3]} rotation={0} contourTexture={furnitureVariant} />
      <WoodenChair position={[-0.7, 0, 1.3]} rotation={0} contourTexture={furnitureVariant} />
      {/* Back chairs (z=2.7) facing -Z toward table */}
      <WoodenChair position={[0.7, 0, 2.7]} rotation={Math.PI} contourTexture={furnitureVariant} />
      <WoodenChair position={[-0.7, 0, 2.7]} rotation={Math.PI} contourTexture={furnitureVariant} />

      {/* Bar stools at counter */}
      <BarStool position={[-0.8, 0, -3.8]} contourTexture={furnitureVariant} />
      <BarStool position={[0.8, 0, -3.8]} contourTexture={furnitureVariant} />

      {/* Small side table near left wall - beige with contour texture */}
      <mesh position={[-6, 0.35, -2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.7, 8]} />
        <meshStandardMaterial 
          map={furnitureVariant}
          color="#d4b896" 
          roughness={0.6} 
        />
      </mesh>

      {/* Plant on side table */}
      <mesh position={[-6, 0.75, -2]} castShadow>
        <coneGeometry args={[0.15, 0.3, 6]} />
        <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
      </mesh>
      <mesh position={[-6, 0.65, -2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 8]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
      </mesh>

      {/* Shelving unit on back wall - beige with contour texture */}
      <mesh position={[4, 1.5, -7.85]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 0.15]} />
        <meshStandardMaterial 
          map={furnitureVariant}
          color="#c4a882" 
          roughness={0.7} 
        />
      </mesh>
      {/* Shelf dividers */}
      <mesh position={[4, 1.5, -7.85]} castShadow>
        <boxGeometry args={[2, 0.05, 0.2]} />
        <meshStandardMaterial color="#d4b896" roughness={0.6} />
      </mesh>
      <mesh position={[4, 2.2, -7.85]} castShadow>
        <boxGeometry args={[2, 0.05, 0.2]} />
        <meshStandardMaterial color="#d4b896" roughness={0.6} />
      </mesh>

      {/* Decorative items on shelves */}
      <mesh position={[3.3, 1.8, -7.8]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.25, 8]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
      </mesh>
      <mesh position={[4.7, 1.8, -7.8]} castShadow>
        <boxGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#6a5a4a" roughness={0.7} />
      </mesh>

      {/* Rug under seating area - beige with contour texture */}
      <mesh position={[0, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial 
          map={furnitureVariant}
          color="#d4b896" 
          roughness={0.9} 
        />
      </mesh>

      {/* Wall decor - framed art with contour texture on art surface */}
      <mesh position={[-7.85, 2, -2]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.05]} />
        <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[-7.82, 2, -2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshStandardMaterial 
          map={furnitureVariant}
          color="#d4b896" 
          roughness={0.8} 
        />
      </mesh>

      {/* Another wall art piece with contour texture */}
      <mesh position={[7.85, 2.2, 3]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[7.82, 2.2, 3]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.55, 0.55]} />
        <meshStandardMaterial 
          map={furnitureVariant}
          color="#d4b896" 
          roughness={0.8} 
        />
      </mesh>

      {/* Scene dressing props (espresso machine, pastry case, etc.) */}
      <CafeSceneDressing contourTexture={furnitureVariant} />
    </group>
  );
}
