import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContourFrame from '@/components/layout/ContourFrame';

interface SceneDegradedOverlayProps {
  onRetry: () => void;
}

export default function SceneDegradedOverlay({ onRetry }: SceneDegradedOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <ContourFrame className="pointer-events-auto w-full max-w-md">
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
            <AlertTriangle className="h-8 w-8 text-warning" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Café Details Not Loaded
            </h2>
            <p className="text-sm text-muted-foreground">
              Only the basic room could be loaded. The full café environment with furniture and decorations did not appear.
            </p>
          </div>

          <Button onClick={onRetry} variant="default" size="lg" className="w-full">
            Retry Loading Full Café
          </Button>

          <p className="text-xs text-muted-foreground">
            This may be due to slow network or browser limitations. You can retry or refresh the page.
          </p>
        </div>
      </ContourFrame>
    </div>
  );
}
