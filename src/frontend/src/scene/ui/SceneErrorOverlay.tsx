import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatDiagnosticStage } from '../utils/sceneDiagnostics';
import type { DiagnosticInfo } from '../utils/sceneDiagnostics';

interface SceneErrorOverlayProps {
  message: string;
  onRetry: () => void;
  diagnostics?: DiagnosticInfo | null;
}

export default function SceneErrorOverlay({ message, onRetry, diagnostics }: SceneErrorOverlayProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="pointer-events-auto flex max-w-md flex-col items-center gap-6 rounded-lg border border-destructive/50 bg-card p-8 text-center shadow-lg">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            3D Scene Failed to Load
          </h2>
          <p className="text-sm text-muted-foreground">
            We encountered an issue while loading the café environment.
          </p>
          {message && (
            <p className="mt-2 rounded bg-muted p-2 text-xs font-mono text-muted-foreground/80">
              {message}
            </p>
          )}
        </div>

        {/* Diagnostic details section */}
        {diagnostics && (
          <div className="w-full space-y-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex w-full items-center justify-between rounded border border-border bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <span className="font-medium">Technical Details</span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {showDetails && (
              <div className="space-y-2 rounded border border-border bg-muted/30 p-3 text-left text-xs">
                <div>
                  <span className="font-semibold text-foreground">Stage:</span>{' '}
                  <span className="text-muted-foreground">
                    {formatDiagnosticStage(diagnostics.stage)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Message:</span>{' '}
                  <span className="text-muted-foreground">{diagnostics.message}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Time:</span>{' '}
                  <span className="text-muted-foreground">
                    {new Date(diagnostics.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <Button onClick={onRetry} variant="default" size="lg" className="w-full">
          Retry Loading Scene
        </Button>

        <p className="text-xs text-muted-foreground">
          If the problem persists, try refreshing the page or using a different browser.
        </p>
      </div>
    </div>
  );
}
