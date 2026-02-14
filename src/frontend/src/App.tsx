import { useState, useCallback } from 'react';
import { ThemeProvider } from 'next-themes';
import { Canvas } from '@react-three/fiber';
import { Toaster } from '@/components/ui/sonner';
import CafeScene from './scene/CafeScene';
import TopNav from './components/nav/TopNav';
import HelpButton from './components/nav/HelpButton';
import OnboardingOverlay from './components/overlays/OnboardingOverlay';
import MenuPanel from './pages/MenuPanel';
import AboutPanel from './pages/AboutPanel';
import ContactPanel from './pages/ContactPanel';
import ExportPanel from './pages/ExportPanel';
import SceneLoadingOverlay from './scene/ui/SceneLoadingOverlay';
import SceneErrorOverlay from './scene/ui/SceneErrorOverlay';
import SceneDegradedOverlay from './scene/ui/SceneDegradedOverlay';
import SceneErrorBoundary from './scene/SceneErrorBoundary';
import { useUIOverlayStore } from './state/uiOverlayStore';
import { useFirstVisitFlag } from './hooks/useFirstVisitFlag';
import { checkWebGLSupport } from './scene/utils/webglSupport';
import { logSceneFailure, type DiagnosticInfo } from './scene/utils/sceneDiagnostics';
import { useSceneStartupWatchdog } from './scene/hooks/useSceneStartupWatchdog';

const SCENE_STARTUP_TIMEOUT = 10000; // 10 seconds

export default function App() {
  const { activePanel, setActivePanel } = useUIOverlayStore();
  const { dismissOnboarding, showOnboarding } = useFirstVisitFlag();
  const [showOnboardingOverlay, setShowOnboardingOverlay] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneError, setSceneError] = useState<string | null>(null);
  const [sceneDegraded, setSceneDegraded] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo | null>(null);

  // Check WebGL support on mount
  const webglSupport = checkWebGLSupport();
  
  const handleDismissOnboarding = () => {
    setShowOnboardingOverlay(false);
    dismissOnboarding();
  };

  const handleShowHelp = () => {
    setShowOnboardingOverlay(true);
    showOnboarding();
  };

  const handleFullEnvironmentMounted = useCallback(() => {
    cancelWatchdog();
    setSceneReady(true);
    setSceneError(null);
    setSceneDegraded(false);
    setDiagnostics(null);
  }, []);

  const handleSceneError = useCallback((error: Error) => {
    const errorMessage = error.message || 'Unknown error occurred';
    const diagnostic = logSceneFailure('scene-render', errorMessage, error);
    setSceneError(errorMessage);
    setSceneReady(false);
    setSceneDegraded(false);
    setDiagnostics(diagnostic);
  }, []);

  const handleEnvironmentError = useCallback((stage: string, message: string) => {
    // Log environment errors but don't block the scene since we have fallback
    const diagnostic = logSceneFailure(stage as any, message);
    setDiagnostics(diagnostic);
  }, []);

  const handleStartupTimeout = useCallback(() => {
    const diagnostic = logSceneFailure(
      'full-environment-timeout',
      'Full café environment did not mount within the expected time'
    );
    setSceneDegraded(true);
    setSceneReady(false);
    setDiagnostics(diagnostic);
  }, []);

  const handleRetry = () => {
    setSceneError(null);
    setSceneReady(false);
    setSceneDegraded(false);
    setDiagnostics(null);
    setSceneKey(prev => prev + 1);
  };

  // Startup watchdog - triggers timeout if full environment doesn't mount
  const { cancel: cancelWatchdog } = useSceneStartupWatchdog({
    timeout: SCENE_STARTUP_TIMEOUT,
    onTimeout: handleStartupTimeout,
    sceneKey,
  });

  const isOverlayOpen = activePanel !== null || showOnboardingOverlay;

  // Show error if WebGL is not supported
  if (!webglSupport.supported) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="relative h-screen w-screen overflow-hidden bg-background">
          <TopNav onOpenPanel={setActivePanel} />
          <SceneErrorOverlay
            message={webglSupport.reason || 'WebGL is not supported in your browser'}
            onRetry={handleRetry}
            diagnostics={{
              stage: 'webgl-init',
              message: webglSupport.reason || 'WebGL not supported',
              timestamp: new Date().toISOString(),
            }}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative h-screen w-screen overflow-hidden bg-background">
        {/* 3D Canvas - optimized with capped DPR and conservative settings */}
        <Canvas
          key={sceneKey}
          camera={{ position: [0, 1.6, 5], fov: 60 }}
          className="absolute inset-0"
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            alpha: false,
            stencil: false,
            depth: true,
          }}
        >
          <SceneErrorBoundary onError={handleSceneError} onReset={handleRetry}>
            <CafeScene 
              navigationEnabled={!isOverlayOpen} 
              onFullEnvironmentMounted={handleFullEnvironmentMounted}
              onEnvironmentError={handleEnvironmentError}
            />
          </SceneErrorBoundary>
        </Canvas>

        {/* Loading overlay - shown until full environment is ready */}
        {!sceneReady && !sceneError && !sceneDegraded && (
          <SceneLoadingOverlay />
        )}

        {/* Degraded mode overlay - shown when only fallback room loads */}
        {sceneDegraded && !sceneError && (
          <SceneDegradedOverlay onRetry={handleRetry} />
        )}

        {/* Error overlay - shown if scene fails to load */}
        {sceneError && (
          <SceneErrorOverlay
            message={sceneError}
            onRetry={handleRetry}
            diagnostics={diagnostics}
          />
        )}

        {/* UI Layer */}
        <TopNav onOpenPanel={setActivePanel} />
        <HelpButton onClick={handleShowHelp} />

        {/* Overlays */}
        <OnboardingOverlay
          open={showOnboardingOverlay}
          onClose={handleDismissOnboarding}
        />
        <MenuPanel
          open={activePanel === 'menu'}
          onClose={() => setActivePanel(null)}
        />
        <AboutPanel
          open={activePanel === 'about'}
          onClose={() => setActivePanel(null)}
        />
        <ContactPanel
          open={activePanel === 'contact'}
          onClose={() => setActivePanel(null)}
        />
        <ExportPanel
          open={activePanel === 'export'}
          onClose={() => setActivePanel(null)}
        />

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
