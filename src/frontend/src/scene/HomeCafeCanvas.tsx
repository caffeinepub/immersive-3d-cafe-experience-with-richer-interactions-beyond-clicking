import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { checkWebGLSupport } from './utils/webglSupport';
import { isLikelyWebGLError, formatWebGLErrorReason } from './utils/webglFailureHeuristics';
import { logSceneFailure } from './utils/sceneDiagnostics';
import type { DiagnosticInfo } from './utils/sceneDiagnostics';
import CafeScene from './CafeScene';
import SceneErrorBoundary from './SceneErrorBoundary';
import CanvasMountErrorBoundary from './CanvasMountErrorBoundary';
import SceneLoadingOverlay from './ui/SceneLoadingOverlay';
import SceneErrorOverlay from './ui/SceneErrorOverlay';
import NonWebGLFallback from './ui/NonWebGLFallback';
import WebGLCheckingOverlay from './ui/WebGLCheckingOverlay';

export default function HomeCafeCanvas() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [webglReason, setWebglReason] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check WebGL support on mount and when retry key changes
  useEffect(() => {
    console.log('[HomeCafeCanvas] Checking WebGL support...');
    const webglSupport = checkWebGLSupport();
    
    if (!webglSupport.supported) {
      console.error('[HomeCafeCanvas] WebGL check failed:', webglSupport.reason);
      const diagnostic = logSceneFailure(
        'webgl-init',
        webglSupport.reason || 'WebGL not supported',
        undefined
      );
      setDiagnostics(diagnostic);
      setWebglSupported(false);
      setWebglReason(webglSupport.reason || 'WebGL not supported');
      setIsLoading(false);
    } else {
      console.log('[HomeCafeCanvas] WebGL check passed:', {
        version: webglSupport.contextVersion,
        warnings: webglSupport.warnings
      });
      setWebglSupported(true);
      setWebglReason(null);
      // Reset diagnostics when WebGL is supported on retry
      if (retryKey > 0) {
        setDiagnostics(null);
      }
    }
  }, [retryKey]);

  // Listen for webglcontextlost events
  useEffect(() => {
    if (!webglSupported) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.error('[HomeCafeCanvas] WebGL context lost');
      const reason = 'WebGL context was lost. This can happen due to GPU driver issues or browser resource limits.';
      const diagnostic = logSceneFailure('webgl-init', reason, undefined);
      setDiagnostics(diagnostic);
      setWebglSupported(false);
      setWebglReason(reason);
      setIsLoading(false);
    };

    // Try to attach listener to canvas if available
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      };
    }
  }, [webglSupported]);
  
  const handleBasicRoomReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleSceneError = useCallback((err: Error) => {
    console.error('[HomeCafeCanvas] Scene error caught:', err);
    
    // Check if this is likely a WebGL-related error
    if (isLikelyWebGLError(err)) {
      console.error('[HomeCafeCanvas] Error appears to be WebGL-related, switching to NonWebGLFallback');
      const reason = formatWebGLErrorReason(err);
      const diagnostic = logSceneFailure('webgl-init', reason, err);
      setDiagnostics(diagnostic);
      setWebglSupported(false);
      setWebglReason(reason);
      setIsLoading(false);
    } else {
      // Non-WebGL error, show generic scene error overlay
      const diagnostic = logSceneFailure('scene-render', err.message, err);
      setDiagnostics(diagnostic);
      setError(err.message || 'Unknown scene error');
      setIsLoading(false);
    }
  }, []);

  const handleCanvasMountError = useCallback((err: Error) => {
    console.error('[HomeCafeCanvas] Canvas mount error caught:', err);
    
    // Canvas mount errors are likely WebGL-related
    if (isLikelyWebGLError(err)) {
      console.error('[HomeCafeCanvas] Canvas mount error appears to be WebGL-related, switching to NonWebGLFallback');
      const reason = formatWebGLErrorReason(err);
      const diagnostic = logSceneFailure('webgl-init', reason, err);
      setDiagnostics(diagnostic);
      setWebglSupported(false);
      setWebglReason(reason);
      setIsLoading(false);
    } else {
      // Treat as generic scene error
      const diagnostic = logSceneFailure('scene-render', err.message, err);
      setDiagnostics(diagnostic);
      setError(err.message || 'Canvas mount error');
      setIsLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    console.log('[HomeCafeCanvas] Retrying scene mount (re-checking WebGL support)...');
    setError(null);
    setDiagnostics(null);
    setIsLoading(true);
    setWebglSupported(null);
    setWebglReason(null);
    setRetryKey(prev => prev + 1);
  }, []);

  // Show checking overlay while WebGL support is being determined
  if (webglSupported === null) {
    return <WebGLCheckingOverlay />;
  }

  // Show non-blocking fallback if WebGL is not supported
  // This renders at z-index 5, below TopNav (z-20) and panels (z-30)
  if (webglSupported === false) {
    return (
      <NonWebGLFallback
        reason={webglReason || 'WebGL not supported'}
        onRecheck={handleRetry}
      />
    );
  }

  // Detect mobile/tablet for responsive render settings
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <>
      {/* Three.js Canvas - full screen background */}
      <CanvasMountErrorBoundary onError={handleCanvasMountError}>
        <Canvas
          key={retryKey}
          ref={canvasRef}
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
          onCreated={() => {
            console.log('[HomeCafeCanvas] Canvas created successfully');
          }}
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
      </CanvasMountErrorBoundary>

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
