import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import CafeEnvironment from './environment/CafeEnvironment';
import InteractionManager from './interactions/InteractionManager';
import { useCafeNavigation } from './controls/useCafeNavigation';

interface CafeSceneProps {
  navigationEnabled: boolean;
}

export default function CafeScene({ navigationEnabled }: CafeSceneProps) {
  useCafeNavigation(navigationEnabled);

  return (
    <Suspense fallback={null}>
      <color attach="background" args={['#1a1612']} />
      <fog attach="fog" args={['#1a1612', 10, 30]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, -3]} intensity={0.4} color="#ff9966" />
      
      <Environment preset="warehouse" />
      
      <Physics gravity={[0, -9.81, 0]}>
        <CafeEnvironment />
        <InteractionManager navigationEnabled={navigationEnabled} />
      </Physics>

      {!navigationEnabled && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      )}
    </Suspense>
  );
}
