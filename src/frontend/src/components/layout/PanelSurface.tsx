import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ContourFrame from './ContourFrame';

interface PanelSurfaceProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function PanelSurface({ title, children, onClose }: PanelSurfaceProps) {
  return (
    <div 
      className="h-full w-full max-w-2xl"
      style={{ maxHeight: 'var(--app-height, 85vh)' }}
    >
      <ContourFrame className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border/50 p-4 sm:p-6 shrink-0 safe-top">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{title}</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 sm:p-6 safe-bottom">{children}</div>
        </ScrollArea>
      </ContourFrame>
    </div>
  );
}
