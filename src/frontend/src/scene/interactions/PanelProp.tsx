import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Text } from '@react-three/drei';

interface PanelPropProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  propType?: 'card' | 'cup' | 'sign';
}

export default function PanelProp({ position, label, onClick, propType = 'card' }: PanelPropProps) {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      const floatOffset = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.position.y = position[1] + floatOffset;

      // Scale feedback
      const targetScale = isPressed ? 0.9 : isHovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick();
  };

  // Render different prop types
  const renderProp = () => {
    switch (propType) {
      case 'cup':
        return (
          <group>
            {/* Cup body - taller and more defined */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.14, 0.11, 0.35, 20]} />
              <meshStandardMaterial
                color="#e8d5c4"
                roughness={0.5}
                emissive={isHovered ? '#ff8844' : '#aa4422'}
                emissiveIntensity={isHovered ? 0.3 : 0.1}
              />
            </mesh>
            
            {/* Coffee liquid inside */}
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.02, 20]} />
              <meshStandardMaterial
                color="#3d2817"
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            
            {/* Handle - more prominent */}
            <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <torusGeometry args={[0.1, 0.025, 10, 20, Math.PI]} />
              <meshStandardMaterial
                color="#e8d5c4"
                roughness={0.5}
                emissive={isHovered ? '#ff8844' : '#aa4422'}
                emissiveIntensity={isHovered ? 0.3 : 0.1}
              />
            </mesh>
            
            {/* Saucer underneath */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
              <meshStandardMaterial
                color="#e8d5c4"
                roughness={0.5}
              />
            </mesh>
          </group>
        );
      case 'sign':
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.3, 0.05]} />
            <meshStandardMaterial
              color="#3d3228"
              roughness={0.7}
              emissive={isHovered ? '#ff8844' : '#aa4422'}
              emissiveIntensity={isHovered ? 0.4 : 0.15}
            />
          </mesh>
        );
      case 'card':
      default:
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.25, 0.02]} />
            <meshStandardMaterial
              color="#3d3228"
              roughness={0.7}
              emissive={isHovered ? '#ff8844' : '#aa4422'}
              emissiveIntensity={isHovered ? 0.4 : 0.15}
            />
          </mesh>
        );
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {renderProp()}
      </mesh>
      
      {/* 3D Text Label - positioned for better visibility on cup */}
      <Text
        position={propType === 'cup' ? [0, 0, 0.16] : [0, 0, 0.03]}
        fontSize={propType === 'cup' ? 0.1 : 0.08}
        color={isHovered ? '#ffcc99' : '#3d2817'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.008}
        outlineColor={propType === 'cup' ? '#e8d5c4' : '#1a1612'}
        font="/fonts/inter-bold.woff"
      >
        {label}
      </Text>

      {/* Glow effect when hovered */}
      {isHovered && (
        <pointLight
          position={[0, 0, 0.3]}
          intensity={0.5}
          distance={2}
          color="#ff8844"
        />
      )}
    </group>
  );
}
