import { useMemo } from 'react';
import { CanvasTexture, LinearFilter } from 'three';

interface NeonCanvasLabelProps {
  text: string;
  fontSize?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  textColor?: string;
  glowColor?: string;
  glowBlur?: number;
}

/**
 * Reusable 3D label component that draws text to a high-resolution canvas texture
 * with bold white glyphs and a green neon glow/shadow effect.
 */
export default function NeonCanvasLabel({
  text,
  fontSize = 70,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 2,
  height = 0.5,
  textColor = '#ffffff',
  glowColor = '#00ff00',
  glowBlur = 20,
}: NeonCanvasLabelProps) {
  const texture = useMemo(() => {
    // High-resolution canvas for crisp text
    const canvas = document.createElement('canvas');
    const scaleFactor = 4; // Higher resolution for better quality
    canvas.width = 1024 * scaleFactor;
    canvas.height = 256 * scaleFactor;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configure text rendering
    ctx.font = `bold ${fontSize * scaleFactor}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw neon glow effect (multiple passes for stronger glow)
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = glowBlur * scaleFactor;
    ctx.fillStyle = glowColor;
    
    // Multiple glow passes for intensity
    for (let i = 0; i < 3; i++) {
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    // Draw main text (white, bold)
    ctx.shadowBlur = 0;
    ctx.fillStyle = textColor;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const canvasTexture = new CanvasTexture(canvas);
    canvasTexture.minFilter = LinearFilter;
    canvasTexture.magFilter = LinearFilter;
    canvasTexture.needsUpdate = true;

    return canvasTexture;
  }, [text, fontSize, textColor, glowColor, glowBlur]);

  if (!texture) return null;

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent opacity={1} />
    </mesh>
  );
}
