import { Suspense, useEffect, useRef } from 'react';
import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import BasicCafeRoomFallback from './environment/BasicCafeRoomFallback';
import CafeEnvironment from './environment/CafeEnvironment';
import InteractionManager from './interactions/InteractionManager';
import { useCafeNavigation } from './controls/useCafeNavigation';
import { logSceneFailure, logSceneSuccess } from './utils/sceneDiagnostics';

interface CafeSceneProps {
  navigationEnabled: boolean;
  onFullEnvironmentMounted?: () => void;
  onEnvironmentError?: (stage: string, message: string) => void;
}

export default function CafeScene({ 
  navigationEnabled, 
  onFullEnvironmentMounted,
  onEnvironmentError 
}: CafeSceneProps) {
  useCafeNavigation(navigationEnabled);
  const hasLoggedFallback = useRef(false);

  // Log when fallback room renders (first frame)
  useFrame(() => {
    if (!hasLoggedFallback.current) {
      hasLoggedFallback.current = true;
      logSceneSuccess('fallback-render', 'Basic fallback room rendered successfully');
    }
  });

  return (
    <>
      <color attach="background" args={['#1a1612']} />
      <fog attach="fog" args={['#1a1612', 10, 30]} />
      
      {/* Basic lights - always available */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, -3]} intensity={0.4} color="#ff9966" />
      
      {/* Fallback room - renders immediately, no dependencies */}
      <BasicCafeRoomFallback />
      
      {/* Environment in isolated Suspense to prevent blocking */}
      <Suspense fallback={null}>
        <EnvironmentWrapper onError={onEnvironmentError} />
      </Suspense>
      
      {/* Full scene with Physics - renders on top of fallback */}
      <Physics gravity={[0, -9.81, 0]}>
        <Suspense fallback={null}>
          <CafeEnvironment onMounted={onFullEnvironmentMounted} />
          <InteractionManager navigationEnabled={navigationEnabled} />
        </Suspense>
      </Physics>
    </>
  );
}

// Isolated environment component with error handling
interface EnvironmentWrapperProps {
  onError?: (stage: string, message: string) => void;
}

function EnvironmentWrapper({ onError }: EnvironmentWrapperProps) {
  try {
    return <Environment preset="warehouse" />;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown environment error';
    logSceneFailure('environment-load', 'Failed to load environment preset', error as Error);
    if (onError) {
      onError('environment-load', errorMessage);
    }
    // Return null to allow scene to render without environment
    return null;
  }
}
