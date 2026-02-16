import { useMemo } from 'react';
import * as THREE from 'three';

interface MenuBoardFrameGlowProps {
  width: number;
  height: number;
  depth?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  glowColor?: string;
  glowIntensity?: number;
  frameThickness?: number;
}

/**
 * Reusable neon green edge-glow component for rectangular frames.
 * Renders a slightly offset emissive outline around the frame edge to create a visible glow effect without z-fighting.
 */
export default function MenuBoardFrameGlow({
  width,
  height,
  depth = 0.05,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  glowColor = '#00ff00',
  glowIntensity = 2,
  frameThickness = 0.04,
}: MenuBoardFrameGlowProps) {
  // Create edge geometry for the frame outline
  const edgeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Outer rectangle
    shape.moveTo(-width / 2, -height / 2);
    shape.lineTo(width / 2, -height / 2);
    shape.lineTo(width / 2, height / 2);
    shape.lineTo(-width / 2, height / 2);
    shape.lineTo(-width / 2, -height / 2);
    
    // Inner rectangle (hole)
    const hole = new THREE.Path();
    const innerWidth = width - frameThickness * 2;
    const innerHeight = height - frameThickness * 2;
    hole.moveTo(-innerWidth / 2, -innerHeight / 2);
    hole.lineTo(innerWidth / 2, -innerHeight / 2);
    hole.lineTo(innerWidth / 2, innerHeight / 2);
    hole.lineTo(-innerWidth / 2, innerHeight / 2);
    hole.lineTo(-innerWidth / 2, -innerHeight / 2);
    shape.holes.push(hole);
    
    return new THREE.ShapeGeometry(shape);
  }, [width, height, frameThickness]);

  return (
    <mesh
      position={[position[0], position[1], position[2] - depth / 2 - 0.005]}
      rotation={rotation}
      geometry={edgeGeometry}
    >
      <meshStandardMaterial
        color={glowColor}
        emissive={glowColor}
        emissiveIntensity={glowIntensity}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}
