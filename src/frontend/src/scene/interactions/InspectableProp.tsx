import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html } from '@react-three/drei';

export default function InspectableProp() {
  const meshRef = useRef<Mesh>(null);
  const [isInspecting, setIsInspecting] = useState(false);
  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current && isInspecting) {
      meshRef.current.rotation.y = rotation;
    }
  });

  const handleDragStart = () => {
    setIsInspecting(true);
  };

  const handleDrag = (e: any) => {
    if (isInspecting) {
      setRotation((prev) => prev + e.movementX * 0.01);
    }
  };

  const handleDragEnd = () => {
    setIsInspecting(false);
  };

  return (
    <group position={[3, 1.2, 2]}>
      <mesh
        ref={meshRef}
        onPointerDown={handleDragStart}
        onPointerMove={handleDrag}
        onPointerUp={handleDragEnd}
        castShadow
      >
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial
          color="#8b6f47"
          roughness={0.6}
          metalness={0.2}
          emissive={isInspecting ? '#ff8844' : '#000000'}
          emissiveIntensity={isInspecting ? 0.3 : 0}
        />
      </mesh>
      {isInspecting && (
        <Html center distanceFactor={6}>
          <div className="pointer-events-none rounded-lg bg-background/90 px-3 py-2 text-xs text-foreground shadow-lg backdrop-blur-sm">
            Drag to rotate
          </div>
        </Html>
      )}
    </group>
  );
}
