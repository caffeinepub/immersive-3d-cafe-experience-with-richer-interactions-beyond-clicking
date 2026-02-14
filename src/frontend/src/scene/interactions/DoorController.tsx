import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Camera } from 'three';

interface DoorControllerProps {
  camera: Camera;
}

export default function DoorController({ camera }: DoorControllerProps) {
  const doorRef = useRef<Mesh>(null);
  const [isOpen, setIsOpen] = useState(false);
  const targetRotation = useRef(0);

  useFrame(() => {
    if (!doorRef.current) return;

    const cameraPos = new Vector3();
    camera.getWorldPosition(cameraPos);
    const doorPos = new Vector3(6, 1, -7);
    const distance = cameraPos.distanceTo(doorPos);

    const shouldOpen = distance < 3;
    if (shouldOpen !== isOpen) {
      setIsOpen(shouldOpen);
      targetRotation.current = shouldOpen ? -Math.PI / 2 : 0;
    }

    doorRef.current.rotation.y += (targetRotation.current - doorRef.current.rotation.y) * 0.05;
  });

  return (
    <group position={[6, 0, -7]}>
      <mesh ref={doorRef} position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
      </mesh>
    </group>
  );
}
