import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SceneLoadingOverlayProps {
  roomFirstMode?: boolean;
  onRetry?: () => void;
}

export default function SceneLoadingOverlay({ 
  roomFirstMode = false,
  onRetry 
}: SceneLoadingOverlayProps) {
  const [showDegraded, setShowDegraded] = useState(false);

  // Show degraded message after 8 seconds of loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDegraded(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (showDegraded && onRetry) {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm">
        <div className="pointer-events-auto flex max-w-md flex-col items-center gap-6 rounded-lg border border-warning/50 bg-card p-8 text-center shadow-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
            <AlertCircle className="h-8 w-8 text-warning" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Room Taking Longer Than Expected
            </h2>
            <p className="text-sm text-muted-foreground">
              {roomFirstMode 
                ? 'The basic room is taking longer than usual to load.'
                : 'The café scene is taking longer than usual to load.'}
            </p>
          </div>

          <Button onClick={onRetry} variant="default" size="lg" className="w-full">
            Retry Loading
          </Button>

          <p className="text-xs text-muted-foreground">
            Or wait a bit longer for the current attempt to complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium">
          {roomFirstMode ? 'Loading room...' : 'Loading café scene...'}
        </p>
      </div>
    </div>
  );
}
