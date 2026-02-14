import { Menu, Info, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PanelType } from '../../state/uiOverlayStore';

interface TopNavProps {
  onOpenPanel: (panel: PanelType) => void;
}

export default function TopNav({ onOpenPanel }: TopNavProps) {
  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 p-4">
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-lg bg-background/80 px-6 py-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/cafe-logo-contour.dim_512x512.png"
            alt="Cafe Logo"
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold text-foreground">Contour Cafe</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('menu')}
            className="gap-2"
          >
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">Menu</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('about')}
            className="gap-2"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">About</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('contact')}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('export')}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
