import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { usePlane } from '@react-three/cannon';
import { Counter, CafeTable, WoodenChair, BarStool } from './CafeFurniture';
import CafeSceneDressing from './CafeSceneDressing';
import { useNonBlockingTexture } from '../hooks/useNonBlockingTexture';
import { logSceneSuccess } from '../utils/sceneDiagnostics';

interface CafeEnvironmentProps {
  onMounted?: () => void;
}

export default function CafeEnvironment({ onMounted }: CafeEnvironmentProps) {
  const contourTexture = useNonBlockingTexture('/assets/generated/contour-texture-warm.dim_1024x1024.png');
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
      {/* Floor - renders immediately with fallback color */}
      <mesh ref={floorRef} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          map={contourTexture}
          color="#3d3228"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2.5, -8]} receiveShadow>
        <boxGeometry args={[30, 5, 0.2]} />
        <meshStandardMaterial color="#2a2420" roughness={0.9} />
      </mesh>

      <mesh position={[-8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial color="#2a2420" roughness={0.9} />
      </mesh>

      <mesh position={[8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial color="#2a2420" roughness={0.9} />
      </mesh>

      {/* UPGRADED FURNITURE */}
      
      {/* Counter with detailed construction */}
      <Counter contourTexture={contourTexture} />

      {/* Left table with chairs */}
      <CafeTable position={[-3, 0, 2]} contourTexture={contourTexture} />
      <WoodenChair position={[-3.7, 0, 1.3]} rotation={0} />
      <WoodenChair position={[-2.3, 0, 1.3]} rotation={Math.PI} />
      <WoodenChair position={[-3.7, 0, 2.7]} rotation={0} />
      <WoodenChair position={[-2.3, 0, 2.7]} rotation={Math.PI} />

      {/* Right table with chairs */}
      <CafeTable position={[3, 0, 2]} contourTexture={contourTexture} />
      <WoodenChair position={[3.7, 0, 1.3]} rotation={0} />
      <WoodenChair position={[2.3, 0, 1.3]} rotation={Math.PI} />
      <WoodenChair position={[3.7, 0, 2.7]} rotation={0} />
      <WoodenChair position={[2.3, 0, 2.7]} rotation={Math.PI} />

      {/* Bar stools at counter */}
      <BarStool position={[-0.8, 0, -3.8]} />
      <BarStool position={[0.8, 0, -3.8]} />

      {/* Small side table near left wall */}
      <mesh position={[-6, 0.35, -2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.7, 8]} />
        <meshStandardMaterial color="#4a3f32" roughness={0.6} />
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

      {/* Shelving unit on back wall */}
      <mesh position={[4, 1.5, -7.85]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 0.15]} />
        <meshStandardMaterial color="#3d3228" roughness={0.7} />
      </mesh>
      {/* Shelf dividers */}
      <mesh position={[4, 1.5, -7.85]} castShadow>
        <boxGeometry args={[2, 0.05, 0.2]} />
        <meshStandardMaterial color="#4a3f32" roughness={0.6} />
      </mesh>
      <mesh position={[4, 2.2, -7.85]} castShadow>
        <boxGeometry args={[2, 0.05, 0.2]} />
        <meshStandardMaterial color="#4a3f32" roughness={0.6} />
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

      {/* Rug under seating area */}
      <mesh position={[0, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>

      {/* Wall decor - framed art */}
      <mesh position={[-7.85, 2, -2]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.05]} />
        <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[-7.82, 2, -2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
      </mesh>

      {/* Another wall art piece */}
      <mesh position={[7.85, 2.2, 3]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[7.82, 2.2, 3]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial color="#6a5a4a" roughness={0.8} />
      </mesh>

      {/* Scene dressing - espresso machine, grinder, pastry case, etc. */}
      <CafeSceneDressing />

      {/* Ambient lighting elements */}
      <pointLight position={[0, 3, -5]} intensity={0.5} color="#ffcc99" distance={8} />
      <pointLight position={[-3, 2, 2]} intensity={0.3} color="#ffcc99" distance={5} />
      <pointLight position={[3, 2, 2]} intensity={0.3} color="#ffcc99" distance={5} />
      <pointLight position={[-6, 2, -2]} intensity={0.2} color="#ffcc99" distance={4} />
    </group>
  );
}
