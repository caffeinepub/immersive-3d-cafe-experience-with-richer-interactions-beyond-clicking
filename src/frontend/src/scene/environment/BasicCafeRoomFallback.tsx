import { useContourTexture } from '../hooks/useContourTexture';
import { useWallMapTexture } from '../hooks/useWallMapTexture';
import { Counter, CafeTable, WoodenChair } from './CafeFurniture';
import { createContourOverlayMaterial } from '../materials/contourStyle';

/**
 * Minimal always-available fallback room that renders immediately
 * without any Suspense or Physics dependencies to ensure the user
 * always sees some 3D geometry even if other scene elements fail.
 * Now uses two-pass floor rendering with contour overlay, green world-map texture on walls, interior wall decor, matching ceiling, simple countertop props, and a shiny chrome espresso machine.
 */
export default function BasicCafeRoomFallback() {
  const { floorVariant, furnitureVariant } = useContourTexture();
  const wallMapTexture = useWallMapTexture();

  return (
    <group>
      {/* Floor - base layer with lighter color for high-contrast */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#f5ede0" 
          roughness={0.85} 
          metalness={0.05} 
        />
      </mesh>

      {/* Floor contour overlay - unlit layer slightly above base for guaranteed visibility */}
      {floorVariant && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <planeGeometry args={[30, 30]} />
          <primitive object={createContourOverlayMaterial(floorVariant, 0.8)} attach="material" />
        </mesh>
      )}

      {/* Ceiling - base layer with warm neutral color */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]} receiveShadow>
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
          <primitive object={createContourOverlayMaterial(floorVariant, 0.6)} attach="material" />
        </mesh>
      )}

      {/* Back wall - with green world-map texture */}
      <mesh position={[0, 2.5, -8]} receiveShadow>
        <boxGeometry args={[30, 5, 0.2]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* Left wall - with green world-map texture */}
      <mesh position={[-8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* Right wall - with green world-map texture */}
      <mesh position={[8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial 
          map={wallMapTexture}
          color="#d4e8d4" 
          roughness={0.9} 
        />
      </mesh>

      {/* Wall Decor - Back Wall */}
      <group>
        {/* Large framed art piece - center back wall */}
        <group position={[0, 3, -7.85]}>
          {/* Frame */}
          <mesh>
            <boxGeometry args={[2.2, 1.5, 0.08]} />
            <meshStandardMaterial color="#3d2f1f" roughness={0.6} metalness={0.1} />
          </mesh>
          {/* Canvas/art surface */}
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[2, 1.3, 0.02]} />
            <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
          </mesh>
        </group>

        {/* Smaller framed art - left side of back wall */}
        <group position={[-4, 2.8, -7.85]}>
          <mesh>
            <boxGeometry args={[1.2, 1.2, 0.08]} />
            <meshStandardMaterial color="#3d2f1f" roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[1.05, 1.05, 0.02]} />
            <meshStandardMaterial color="#d4c4a8" roughness={0.8} />
          </mesh>
        </group>

        {/* Wall clock - right side of back wall */}
        <group position={[4.5, 3.2, -7.85]}>
          {/* Clock face */}
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.08, 32]} />
            <meshStandardMaterial color="#f5ede0" roughness={0.7} />
          </mesh>
          {/* Clock rim */}
          <mesh>
            <torusGeometry args={[0.4, 0.05, 16, 32]} />
            <meshStandardMaterial color="#3d2f1f" roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Hour hand */}
          <mesh position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.03, 0.2, 0.01]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Minute hand */}
          <mesh position={[0, 0, 0.06]} rotation={[0, 0, Math.PI / 3]}>
            <boxGeometry args={[0.02, 0.3, 0.01]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Wall Decor - Left Wall */}
      <group>
        {/* Floating shelf with small items */}
        <group position={[-7.85, 2.5, -2]}>
          {/* Shelf board */}
          <mesh>
            <boxGeometry args={[0.08, 0.15, 1.5]} />
            <meshStandardMaterial color="#6b5744" roughness={0.7} metalness={0.05} />
          </mesh>
          {/* Small decorative vase */}
          <mesh position={[0.05, 0.2, -0.3]}>
            <cylinderGeometry args={[0.08, 0.06, 0.25, 16]} />
            <meshStandardMaterial color="#8b7355" roughness={0.6} />
          </mesh>
          {/* Small book stack */}
          <mesh position={[0.05, 0.12, 0.3]}>
            <boxGeometry args={[0.12, 0.15, 0.2]} />
            <meshStandardMaterial color="#c4a57b" roughness={0.8} />
          </mesh>
        </group>

        {/* Wall sconce light - left wall */}
        <group position={[-7.85, 3.5, 2]}>
          {/* Sconce backplate */}
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
            <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Light fixture arm */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
            <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Light shade */}
          <mesh position={[0.2, 0, 0]}>
            <coneGeometry args={[0.12, 0.15, 16]} />
            <meshStandardMaterial color="#f5ede0" roughness={0.7} />
          </mesh>
          {/* Warm point light */}
          <pointLight position={[0.2, 0, 0]} intensity={0.8} distance={3} color="#ffd9a8" />
        </group>

        {/* Framed art - left wall center */}
        <group position={[-7.85, 2.8, 4]}>
          <mesh>
            <boxGeometry args={[0.08, 1.4, 1]} />
            <meshStandardMaterial color="#3d2f1f" roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0.05, 0, 0]}>
            <boxGeometry args={[0.02, 1.25, 0.85]} />
            <meshStandardMaterial color="#d8c9b0" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Wall Decor - Right Wall */}
      <group>
        {/* Decorative ledge with plants */}
        <group position={[7.85, 2.2, 3]}>
          {/* Ledge */}
          <mesh>
            <boxGeometry args={[0.08, 0.12, 1.2]} />
            <meshStandardMaterial color="#6b5744" roughness={0.7} metalness={0.05} />
          </mesh>
          {/* Small potted plant */}
          <mesh position={[0.05, 0.15, -0.3]}>
            <cylinderGeometry args={[0.08, 0.06, 0.15, 12]} />
            <meshStandardMaterial color="#8b7355" roughness={0.7} />
          </mesh>
          <mesh position={[0.05, 0.22, -0.3]}>
            <coneGeometry args={[0.1, 0.15, 8]} />
            <meshStandardMaterial color="#3a5a38" roughness={0.8} />
          </mesh>
          {/* Another small plant */}
          <mesh position={[0.05, 0.15, 0.3]}>
            <cylinderGeometry args={[0.08, 0.06, 0.15, 12]} />
            <meshStandardMaterial color="#8b7355" roughness={0.7} />
          </mesh>
          <mesh position={[0.05, 0.22, 0.3]}>
            <coneGeometry args={[0.1, 0.15, 8]} />
            <meshStandardMaterial color="#2d4a2b" roughness={0.8} />
          </mesh>
        </group>

        {/* Framed art - right wall */}
        <group position={[7.85, 3, -2]}>
          <mesh>
            <boxGeometry args={[0.08, 1.6, 1.2]} />
            <meshStandardMaterial color="#3d2f1f" roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0.05, 0, 0]}>
            <boxGeometry args={[0.02, 1.45, 1.05]} />
            <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Furniture */}
      <Counter contourTexture={furnitureVariant} />
      
      <CafeTable position={[-3, 0, 0]} contourTexture={furnitureVariant} />
      <WoodenChair position={[-3.5, 0, 0]} rotation={Math.PI / 4} contourTexture={furnitureVariant} />
      <WoodenChair position={[-2.5, 0, 0]} rotation={-Math.PI / 4} contourTexture={furnitureVariant} />
      
      <CafeTable position={[3, 0, 2]} contourTexture={furnitureVariant} />
      <WoodenChair position={[3.5, 0, 2]} rotation={Math.PI / 4} contourTexture={furnitureVariant} />
      <WoodenChair position={[2.5, 0, 2]} rotation={-Math.PI / 4} contourTexture={furnitureVariant} />

      {/* Simple Countertop Props for Fallback */}
      <group>
        {/* Espresso Machine - shiny silver/chrome */}
        <group position={[0, 1.86, -4.9]}>
          {/* Machine body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.4, 0.35]} />
            <meshStandardMaterial color="#e8e8e8" roughness={0.15} metalness={0.95} />
          </mesh>
          
          {/* Top section */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.1, 0.3]} />
            <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.98} />
          </mesh>
          
          {/* Group head */}
          <mesh position={[0, -0.05, 0.2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.92} />
          </mesh>
          
          {/* Steam wand */}
          <mesh position={[-0.15, 0, 0.1]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.08} metalness={0.98} />
          </mesh>
        </group>

        {/* Ceramic cups stack */}
        <group position={[1, 1.86, -4.7]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
            <meshStandardMaterial 
              map={furnitureVariant}
              color="#e8dcc8" 
              roughness={0.5} 
            />
          </mesh>
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
            <meshStandardMaterial 
              map={furnitureVariant}
              color="#e8dcc8" 
              roughness={0.5} 
            />
          </mesh>
        </group>

        {/* To-go cups */}
        <group position={[-1, 1.86, -4.7]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.12, 12]} />
            <meshStandardMaterial 
              map={furnitureVariant}
              color="#d4b896" 
              roughness={0.7} 
            />
          </mesh>
          <mesh position={[0, 0.065, 0]} castShadow>
            <cylinderGeometry args={[0.052, 0.052, 0.01, 12]} />
            <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
          </mesh>
          
          <mesh position={[0.1, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.12, 12]} />
            <meshStandardMaterial 
              map={furnitureVariant}
              color="#d4b896" 
              roughness={0.7} 
            />
          </mesh>
          <mesh position={[0.1, 0.065, 0]} castShadow>
            <cylinderGeometry args={[0.052, 0.052, 0.01, 12]} />
            <meshStandardMaterial color="#f8f8f8" roughness={0.6} />
          </mesh>
        </group>

        {/* Syrup bottles */}
        <group position={[2, 1.86, -4.8]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
            <meshStandardMaterial color="#f4e8d0" roughness={0.1} metalness={0.1} opacity={0.7} transparent />
          </mesh>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 6]} />
            <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.5} />
          </mesh>
          
          <mesh position={[0.1, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
            <meshStandardMaterial color="#c89664" roughness={0.1} metalness={0.1} opacity={0.7} transparent />
          </mesh>
          <mesh position={[0.1, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 6]} />
            <meshStandardMaterial color="#2a2420" roughness={0.4} metalness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
