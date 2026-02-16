import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export function useCafeNavigation(enabled: boolean) {
  const { camera, gl } = useThree();
  const keysPressed = useRef<Set<string>>(new Set());
  const velocity = useRef(new Vector3());
  const moveSpeed = 3;
  const euler = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  
  // Detect touch/coarse pointer for mobile
  const isTouchDevice = useRef(false);

  useEffect(() => {
    if (!enabled) {
      // Clear all pressed keys when navigation is disabled
      keysPressed.current.clear();
      return;
    }

    // Detect if device has coarse pointer (touch)
    if (typeof window !== 'undefined') {
      isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
    }

    // Adjust look speed for touch devices
    const lookSpeed = isTouchDevice.current ? 0.003 : 0.002;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Support pointer lock rotation
      if (document.pointerLockElement) {
        euler.current.y -= e.movementX * lookSpeed;
        euler.current.x -= e.movementY * lookSpeed;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      }
    };

    // Drag-to-look on canvas (works on both mouse and touch)
    const handleCanvasPointerDown = (e: PointerEvent) => {
      // Only handle primary pointer (left mouse or first touch)
      if (e.isPrimary && e.button === 0) {
        isDragging.current = true;
        gl.domElement.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    };

    const handleCanvasPointerMove = (e: PointerEvent) => {
      if (isDragging.current && e.isPrimary && !document.pointerLockElement) {
        euler.current.y -= e.movementX * lookSpeed;
        euler.current.x -= e.movementY * lookSpeed;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
        e.preventDefault();
      }
    };

    const handleCanvasPointerUp = (e: PointerEvent) => {
      if (isDragging.current && e.isPrimary) {
        isDragging.current = false;
        try {
          gl.domElement.releasePointerCapture(e.pointerId);
        } catch (err) {
          // Ignore errors if pointer capture was already released
        }
      }
    };

    const handleCanvasDoubleClick = () => {
      // Optional: Request pointer lock on double-click for enhanced experience (desktop only)
      if (!isTouchDevice.current && !document.pointerLockElement) {
        gl.domElement.requestPointerLock();
      }
    };

    // Prevent context menu on long press (mobile)
    const handleContextMenu = (e: Event) => {
      if (isTouchDevice.current) {
        e.preventDefault();
      }
    };

    // Window-level keyboard listeners (work without focus)
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Canvas-specific pointer listeners for drag-to-look
    gl.domElement.addEventListener('pointerdown', handleCanvasPointerDown);
    gl.domElement.addEventListener('pointermove', handleCanvasPointerMove);
    gl.domElement.addEventListener('pointerup', handleCanvasPointerUp);
    gl.domElement.addEventListener('pointercancel', handleCanvasPointerUp);
    gl.domElement.addEventListener('dblclick', handleCanvasDoubleClick);
    gl.domElement.addEventListener('contextmenu', handleContextMenu);

    // Ensure canvas doesn't interfere with UI overlays
    gl.domElement.style.touchAction = 'none';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      
      gl.domElement.removeEventListener('pointerdown', handleCanvasPointerDown);
      gl.domElement.removeEventListener('pointermove', handleCanvasPointerMove);
      gl.domElement.removeEventListener('pointerup', handleCanvasPointerUp);
      gl.domElement.removeEventListener('pointercancel', handleCanvasPointerUp);
      gl.domElement.removeEventListener('dblclick', handleCanvasDoubleClick);
      gl.domElement.removeEventListener('contextmenu', handleContextMenu);

      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      
      // Clear pressed keys on cleanup
      keysPressed.current.clear();
      isDragging.current = false;
    };
  }, [enabled, gl.domElement]);

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
