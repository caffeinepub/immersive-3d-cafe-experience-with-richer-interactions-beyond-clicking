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
    <ContourFrame className="flex h-full max-h-[85vh] w-full max-w-2xl flex-col">
      <div className="flex items-center justify-between border-b border-border/50 p-6">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6">{children}</div>
      </ScrollArea>
    </ContourFrame>
  );
}
