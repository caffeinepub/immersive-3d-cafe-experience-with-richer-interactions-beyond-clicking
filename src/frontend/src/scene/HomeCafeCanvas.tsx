import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useCallback } from 'react';
import { checkWebGLSupport } from './utils/webglSupport';
import { logSceneFailure } from './utils/sceneDiagnostics';
import type { DiagnosticInfo } from './utils/sceneDiagnostics';
import CafeScene from './CafeScene';
import SceneErrorBoundary from './SceneErrorBoundary';
import SceneLoadingOverlay from './ui/SceneLoadingOverlay';
import SceneErrorOverlay from './ui/SceneErrorOverlay';

export default function HomeCafeCanvas() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  // Check WebGL support on mount
  const webglSupport = checkWebGLSupport();
  
  const handleBasicRoomReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleSceneError = useCallback((err: Error) => {
    const diagnostic = logSceneFailure('scene-render', err.message, err);
    setDiagnostics(diagnostic);
    setError(err.message || 'Unknown scene error');
    setIsLoading(false);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setDiagnostics(null);
    setIsLoading(true);
    setRetryKey(prev => prev + 1);
  }, []);

  // Show error overlay if WebGL is not supported
  if (!webglSupport.supported) {
    return (
      <SceneErrorOverlay
        message={webglSupport.reason || 'WebGL not supported'}
        onRetry={handleRetry}
        diagnostics={diagnostics}
      />
    );
  }

  // Detect mobile/tablet for responsive render settings
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <>
      {/* Three.js Canvas - full screen background */}
      <Canvas
        className="absolute inset-0"
        camera={{ 
          position: isMobile ? [0, 1.6, 10] : [0, 1.6, 8], 
          fov: isMobile ? 65 : 60 
        }}
        shadows
        gl={{ 
          antialias: !isMobile, 
          alpha: false,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        dpr={isMobile ? [1, 1.5] : isTablet ? [1, 2] : [1, 2]}
      >
        <Suspense fallback={null}>
          <SceneErrorBoundary
            onError={handleSceneError}
            onReset={handleRetry}
            resetKey={retryKey}
          >
            <CafeScene
              navigationEnabled={true}
              roomFirstMode={true}
              onBasicRoomReady={handleBasicRoomReady}
              onSceneError={handleSceneError}
            />
          </SceneErrorBoundary>
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      {isLoading && (
        <SceneLoadingOverlay
          roomFirstMode={true}
          onRetry={handleRetry}
        />
      )}

      {/* Error overlay */}
      {error && !isLoading && (
        <SceneErrorOverlay
          message={error}
          onRetry={handleRetry}
          diagnostics={diagnostics}
        />
      )}
    </>
  );
}
