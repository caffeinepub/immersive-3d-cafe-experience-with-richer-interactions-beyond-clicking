import { useEffect, useRef, useMemo } from 'react';
import { Mesh, CanvasTexture, LinearFilter } from 'three';

interface WallFrameLabelProps {
  text: string;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  surfaceOffset?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  padding?: number;
}

/**
 * Reusable 3D text label component that renders text as a canvas-generated texture on a thin plane with improved resolution and sizing for large, crisp text rendering.
 * Designed to be placed on wall frames or surfaces with minimal z-fighting via surface offset and depth settings.
 */
export default function WallFrameLabel({
  text,
  width = 2.8,
  height = 0.4,
  fontSize = 80,
  color = '#2a2420',
  backgroundColor = 'transparent',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  surfaceOffset = 0.001,
  canvasWidth = 2048,
  canvasHeight = 512,
  padding = 40,
}: WallFrameLabelProps) {
  const meshRef = useRef<Mesh>(null);

  // Create canvas texture with the text
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Higher resolution for crisp large text
    const scale = 6;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;

    // Clear background
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw text with padding
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize * scale}px "Space Grotesk", "Inter", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add safe padding to prevent clipping
    const safePadding = padding * scale;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - safePadding * 2);

    const canvasTexture = new CanvasTexture(canvas);
    canvasTexture.minFilter = LinearFilter;
    canvasTexture.magFilter = LinearFilter;
    canvasTexture.anisotropy = 16;
    canvasTexture.needsUpdate = true;

    return canvasTexture;
  }, [text, fontSize, color, backgroundColor, canvasWidth, canvasHeight, padding]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!texture) return null;

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1], position[2] + surfaceOffset]}
      rotation={rotation}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent={backgroundColor === 'transparent'}
        depthWrite={false}
        depthTest={true}
      />
    </mesh>
  );
}
