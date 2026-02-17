import { ReactNode } from 'react';

interface ContourFrameProps {
  children: ReactNode;
  className?: string;
}

export default function ContourFrame({ children, className = '' }: ContourFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border/50 bg-background/95 shadow-2xl backdrop-blur-md ${className}`}
    >
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/contour-texture-warm.dim_2048x2048.png)',
          backgroundSize: '400px 400px',
          backgroundBlendMode: 'overlay',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
