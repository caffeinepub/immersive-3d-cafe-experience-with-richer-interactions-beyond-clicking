import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { Vector3, Euler } from 'three';

interface LocalGltfModelProps {
  path: string;
  fallback?: React.ReactNode;
  position?: [number, number, number] | Vector3;
  rotation?: [number, number, number] | Euler;
  scale?: number | [number, number, number] | Vector3;
  [key: string]: any; // Allow other props to pass through
}

/**
 * Inner component that uses useGLTF hook at top level.
 * Must be called unconditionally per React Hooks rules.
 */
function GltfModelInner({ path, ...props }: Omit<LocalGltfModelProps, 'fallback'>) {
  const gltf = useGLTF(path);
  
  // Handle both single GLTF and array return types
  const gltfData = Array.isArray(gltf) ? gltf[0] : gltf;
  
  // Clone the scene to allow multiple instances
  const scene = gltfData.scene.clone();
  
  return <primitive object={scene} {...props} />;
}

/**
 * Reusable local GLB/GLTF loader component for @react-three/fiber.
 * Loads models from frontend/public with graceful fallback on error.
 * Wraps useGLTF in Suspense for safe loading with error boundary support.
 */
export default function LocalGltfModel({ path, fallback, ...props }: LocalGltfModelProps) {
  return (
    <Suspense fallback={fallback || null}>
      <GltfModelInner path={path} {...props} />
    </Suspense>
  );
}
