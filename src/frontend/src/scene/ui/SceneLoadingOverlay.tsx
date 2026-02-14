import { Loader2 } from 'lucide-react';

export default function SceneLoadingOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium">Loading café scene...</p>
        <p className="text-sm text-muted-foreground">Preparing furniture and decorations</p>
      </div>
    </div>
  );
}
