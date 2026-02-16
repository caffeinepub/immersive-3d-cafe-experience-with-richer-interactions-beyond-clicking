import { useEffect } from 'react';
import { Texture, RepeatWrapping, LinearFilter, LinearMipmapLinearFilter } from 'three';
import { useNonBlockingTexture } from './useNonBlockingTexture';

interface ContourTextureConfig {
  texture: Texture | undefined;
  floorVariant: Texture | undefined;
  wallVariant: Texture | undefined;
  furnitureVariant: Texture | undefined;
}

/**
 * Shared hook that loads the high-contrast contour texture and returns pre-configured
 * variants for different surface types (floor, walls, furniture) with
 * consistent repeat/wrap settings and enhanced filtering for sharper rendering at grazing angles.
 */
export function useContourTexture(): ContourTextureConfig {
  const texture = useNonBlockingTexture('/assets/generated/contour-texture-black-hi-contrast.dim_1024x1024.png');

  // Configure base texture with RepeatWrapping and enhanced filtering
  useEffect(() => {
    if (texture) {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.minFilter = LinearMipmapLinearFilter;
      texture.magFilter = LinearFilter;
      texture.anisotropy = 16; // Maximum anisotropy for sharper rendering at grazing angles
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Create configured variants for different surface types
  // Increased floor repeat from 4 to 8 for more visible, frequent contour lines
  const floorVariant = texture ? configureTexture(texture.clone(), 8, 8) : undefined;
  const wallVariant = texture ? configureTexture(texture.clone(), 3, 3) : undefined;
  const furnitureVariant = texture ? configureTexture(texture.clone(), 2, 2) : undefined;

  return {
    texture,
    floorVariant,
    wallVariant,
    furnitureVariant,
  };
}

function configureTexture(texture: Texture, repeatX: number, repeatY: number): Texture {
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}
