import { useState } from 'react';
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
import { useUIOverlayStore } from './state/uiOverlayStore';
import { useFirstVisitFlag } from './hooks/useFirstVisitFlag';

export default function App() {
  const { activePanel, setActivePanel } = useUIOverlayStore();
  const { dismissOnboarding, showOnboarding } = useFirstVisitFlag();
  const [showOnboardingOverlay, setShowOnboardingOverlay] = useState(false);

  const handleDismissOnboarding = () => {
    setShowOnboardingOverlay(false);
    dismissOnboarding();
  };

  const handleShowHelp = () => {
    setShowOnboardingOverlay(true);
    showOnboarding();
  };

  const isOverlayOpen = activePanel !== null || showOnboardingOverlay;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative h-screen w-screen overflow-hidden bg-background">
        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 1.6, 5], fov: 60 }}
          className="absolute inset-0"
        >
          <CafeScene navigationEnabled={!isOverlayOpen} />
        </Canvas>

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
