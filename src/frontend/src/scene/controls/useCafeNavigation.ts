import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export function useCafeNavigation(enabled: boolean) {
  const { camera } = useThree();
  const keysPressed = useRef<Set<string>>(new Set());
  const velocity = useRef(new Vector3());
  const moveSpeed = 3;
  const lookSpeed = 0.002;
  const euler = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        euler.current.y -= e.movementX * lookSpeed;
        euler.current.x -= e.movementY * lookSpeed;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      }
    };

    const handleClick = () => {
      document.body.requestPointerLock();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, [enabled]);

  useFrame((state, delta) => {
    if (!enabled) return;

    const direction = new Vector3();
    const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    forward.y = 0;
    forward.normalize();
    right.y = 0;
    right.normalize();

    if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
      direction.add(forward);
    }
    if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
      direction.sub(forward);
    }
    if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
      direction.sub(right);
    }
    if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
      direction.add(right);
    }

    if (direction.length() > 0) {
      direction.normalize();
      velocity.current.lerp(direction.multiplyScalar(moveSpeed), 0.1);
    } else {
      velocity.current.lerp(new Vector3(), 0.1);
    }

    camera.position.add(velocity.current.clone().multiplyScalar(delta));
    camera.position.y = 1.6; // Keep camera at eye level

    // Apply rotation
    camera.rotation.set(euler.current.x, euler.current.y, 0, 'YXZ');

    // Boundary constraints
    camera.position.x = Math.max(-7, Math.min(7, camera.position.x));
    camera.position.z = Math.max(-7, Math.min(7, camera.position.z));
  });
}
