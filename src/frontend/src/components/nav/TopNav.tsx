import { Menu, Info, Mail, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PanelType } from '../../state/uiOverlayStore';
import { useRoomLayoutStore } from '../../state/roomLayoutStore';

interface TopNavProps {
  onOpenPanel: (panel: PanelType) => void;
}

export default function TopNav({ onOpenPanel }: TopNavProps) {
  const { variant, toggleVariant } = useRoomLayoutStore();

  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 p-2 sm:p-4 safe-top">
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-lg bg-coffee px-3 py-2 shadow-lg sm:px-6 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/assets/generated/cafe-logo-contour.dim_512x512.png"
            alt="Cafe Logo"
            className="h-7 w-7 sm:h-8 sm:w-8"
          />
          <span className="text-base font-semibold text-white sm:text-lg">Contour Cafe</span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleVariant}
            className="gap-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 text-white hover:text-white hover:bg-white/10"
            title={variant === 'standard' ? 'Hide Seating' : 'Show Seating'}
          >
            <LayoutGrid className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">
              {variant === 'standard' ? 'Hide Seating' : 'Show Seating'}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('about')}
            className="gap-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 text-white hover:text-white hover:bg-white/10"
            title="About"
          >
            <Info className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">About</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('contact')}
            className="gap-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 text-white hover:text-white hover:bg-white/10"
            title="Contact"
          >
            <Mail className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Contact</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenPanel('menu')}
            className="gap-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 text-white hover:text-white hover:bg-white/10"
            title="Menu"
          >
            <Menu className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
