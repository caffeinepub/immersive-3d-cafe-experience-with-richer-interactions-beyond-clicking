import { Loader2 } from 'lucide-react';

export default function WebGLCheckingOverlay() {
  return (
    <>
      {/* Static background with contour texture - no Canvas/WebGL */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/40 to-secondary/30">
        {/* Use the same contour texture as ContourFrame for consistency */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/generated/contour-texture-warm.dim_2048x2048.png)',
            backgroundSize: '600px 600px',
            backgroundBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Centered checking message */}
      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground">
            Checking 3D support...
          </p>
        </div>
      </div>
    </>
  );
}
