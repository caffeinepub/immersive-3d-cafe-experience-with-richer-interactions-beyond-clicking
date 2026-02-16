import { useEffect } from 'react';
import { Texture, RepeatWrapping, LinearFilter, LinearMipmapLinearFilter } from 'three';
import { useNonBlockingTexture } from './useNonBlockingTexture';

/**
 * Dedicated hook to load the green world-map wall texture with appropriate
 * repeat/wrap settings, anisotropy, and crisp filtering for clean wall rendering.
 * Returns undefined on load failure to enable safe fallback to non-textured materials.
 */
export function useWallMapTexture(): Texture | undefined {
  const texture = useNonBlockingTexture('/assets/generated/wall-map-texture-green.dim_1024x1024.png');

  useEffect(() => {
    if (texture) {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(2, 2); // Wall-appropriate repeat scale for clear pattern visibility
      texture.minFilter = LinearMipmapLinearFilter;
      texture.magFilter = LinearFilter;
      texture.anisotropy = 16; // Maximum anisotropy for crisp rendering at viewing angles
      texture.needsUpdate = true;
    }
  }, [texture]);

  return texture;
}
