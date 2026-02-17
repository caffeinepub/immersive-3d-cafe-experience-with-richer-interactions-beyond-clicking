import { useState } from 'react';
import { AlertCircle, Copy, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface DeploymentStartupErrorOverlayProps {
  error: unknown;
  step?: 'backend-deploy' | 'frontend-build' | 'runtime' | 'unknown';
  context?: Record<string, unknown>;
  onRetry: () => void;
}

export default function DeploymentStartupErrorOverlay({
  error,
  step = 'unknown',
  context,
  onRetry,
}: DeploymentStartupErrorOverlayProps) {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  // Extract error message
  const errorMessage = error instanceof Error ? error.message : String(error);

  // Generate user-friendly summary
  const summary = generateSummary(errorMessage, step);

  // Format step label
  const stepLabel = formatStepLabel(step);

  // Prepare copyable diagnostics
  const diagnosticsText = formatDiagnosticsForCopy(errorMessage, step, context);

  const handleCopyDiagnostics = () => {
    navigator.clipboard.writeText(diagnosticsText).then(() => {
      toast.success('Diagnostics copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy diagnostics');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl">
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">
            Startup Error
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-4">
            {/* Summary */}
            <div>
              <p className="text-sm font-medium">
                {summary}
              </p>
            </div>

            {/* Step label */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium">Step:</span>
              <span className="rounded bg-destructive/20 px-2 py-0.5 font-mono">
                {stepLabel}
              </span>
            </div>

            <Separator />

            {/* Expandable details */}
            <div>
              <button
                onClick={() => setDetailsExpanded(!detailsExpanded)}
                className="flex w-full items-center justify-between text-sm font-medium hover:underline"
              >
                <span>Technical Details</span>
                {detailsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {detailsExpanded && (
                <div className="mt-3 space-y-3">
                  <ScrollArea className="h-48 rounded border bg-muted/50 p-3">
                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <span className="font-semibold">Error:</span>
                        <pre className="mt-1 whitespace-pre-wrap break-words">
                          {errorMessage}
                        </pre>
                      </div>

                      {context && Object.keys(context).length > 0 && (
                        <div className="mt-3">
                          <span className="font-semibold">Context:</span>
                          <pre className="mt-1 whitespace-pre-wrap break-words">
                            {JSON.stringify(context, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyDiagnostics}
                    className="w-full"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Diagnostics
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={onRetry}
                className="flex-1"
                variant="default"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Reload Page
              </Button>
            </div>

            {/* Help text */}
            <p className="text-xs text-muted-foreground">
              Check the browser console for detailed diagnostics. If the problem persists,
              copy the technical details and refer to the deployment checklist.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

function generateSummary(errorMessage: string, step: string): string {
  const lowerMessage = errorMessage.toLowerCase();

  if (step === 'backend-deploy') {
    return 'The backend canister failed to deploy or initialize. This usually indicates a problem with the Motoko compilation or canister deployment.';
  }

  if (step === 'frontend-build') {
    return 'The frontend build process encountered an error. This may be due to missing type definitions or build artifacts.';
  }

  if (lowerMessage.includes('actor') || lowerMessage.includes('not initialized')) {
    return 'Failed to initialize connection to the backend canister. The canister may not be deployed or the type definitions may be out of sync.';
  }

  if (lowerMessage.includes('type') || lowerMessage.includes('not a function')) {
    return 'A type mismatch was detected. The frontend and backend interfaces may be out of sync. Try regenerating the type definitions.';
  }

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return 'Network connection to the canister failed. Ensure the canister is running and accessible.';
  }

  if (lowerMessage.includes('webgl') || lowerMessage.includes('canvas')) {
    return 'The 3D scene failed to initialize. This may be due to WebGL support issues or rendering errors.';
  }

  return 'The application failed to start. Check the technical details below for more information.';
}

function formatStepLabel(step: string): string {
  switch (step) {
    case 'backend-deploy':
      return 'Backend Deploy';
    case 'frontend-build':
      return 'Frontend Build';
    case 'runtime':
      return 'Runtime';
    default:
      return 'Unknown';
  }
}

function formatDiagnosticsForCopy(
  errorMessage: string,
  step: string,
  context?: Record<string, unknown>
): string {
  const lines = [
    '=== DEPLOYMENT DIAGNOSTICS ===',
    '',
    `Step: ${formatStepLabel(step)}`,
    `Timestamp: ${new Date().toISOString()}`,
    '',
    'Error:',
    errorMessage,
  ];

  if (context && Object.keys(context).length > 0) {
    lines.push('', 'Context:', JSON.stringify(context, null, 2));
  }

  lines.push('', '=== END DIAGNOSTICS ===');

  return lines.join('\n');
}
