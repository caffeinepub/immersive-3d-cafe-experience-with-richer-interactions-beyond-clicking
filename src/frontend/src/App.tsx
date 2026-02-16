import { ThemeProvider } from 'next-themes';
import TopNav from './components/nav/TopNav';
import MenuPanel from './pages/MenuPanel';
import { useUIOverlayStore } from './state/uiOverlayStore';
import HomeCafeCanvas from './scene/HomeCafeCanvas';
import { useAppViewport } from './hooks/useAppViewport';

export default function App() {
  const { activePanel, setActivePanel } = useUIOverlayStore();
  
  // Track viewport height for mobile stability
  useAppViewport();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="app-viewport relative overflow-hidden bg-background">
        {/* 3D Scene Background Layer */}
        <HomeCafeCanvas />

        {/* UI Layer - positioned above the 3D scene */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="pointer-events-auto">
            <TopNav onOpenPanel={setActivePanel} />
          </div>
        </div>

        {/* Menu Panel */}
        <MenuPanel
          open={activePanel === 'menu'}
          onClose={() => setActivePanel(null)}
        />
      </div>
    </ThemeProvider>
  );
}
