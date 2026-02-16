import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import BasicCafeRoomFallback from './environment/BasicCafeRoomFallback';
import { useCafeNavigation } from './controls/useCafeNavigation';
import { logSceneSuccess } from './utils/sceneDiagnostics';

interface CafeSceneProps {
  navigationEnabled: boolean;
  roomFirstMode?: boolean;
  onBasicRoomReady?: () => void;
  onSceneError?: (error: Error) => void;
}

export default function CafeScene({ 
  navigationEnabled,
  roomFirstMode = false,
  onBasicRoomReady,
  onSceneError
}: CafeSceneProps) {
  useCafeNavigation(navigationEnabled);
  const hasNotifiedReady = useRef(false);

  // Detect first frame and notify parent that basic room is ready
  useFrame(() => {
    if (!hasNotifiedReady.current && onBasicRoomReady) {
      hasNotifiedReady.current = true;
      logSceneSuccess('basic-room-render', 'Basic room rendered successfully');
      onBasicRoomReady();
    }
  });

  // Catch any errors during render
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (onSceneError && event.error) {
        onSceneError(event.error);
      }
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onSceneError]);

  return (
    <>
      <color attach="background" args={['#1a1612']} />
      <fog attach="fog" args={['#1a1612', 10, 30]} />
      
      {/* Basic lights - always available */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, -3]} intensity={0.4} color="#ff9966" />
      
      {/* Basic room - renders immediately in room-first mode */}
      <BasicCafeRoomFallback />
      
      {/* Full environment stack is intentionally disabled in room-first mode */}
      {!roomFirstMode && (
        <>
          {/* Future: Physics, CafeEnvironment, InteractionManager will be added here */}
        </>
      )}
    </>
  );
}
