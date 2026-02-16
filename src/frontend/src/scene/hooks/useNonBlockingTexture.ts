import { useEffect, useState } from 'react';
import { Texture, TextureLoader } from 'three';
import { logSceneFailure, logSceneSuccess } from '../utils/sceneDiagnostics';

interface UseNonBlockingTextureOptions {
  onError?: (stage: string, message: string) => void;
}

export function useNonBlockingTexture(
  url: string, 
  options?: UseNonBlockingTextureOptions
): Texture | undefined {
  const [texture, setTexture] = useState<Texture | undefined>(undefined);

  useEffect(() => {
    if (!url) return;
    
    const loader = new TextureLoader();
    
    loader.load(
      url,
      (loadedTexture) => {
        logSceneSuccess('texture-load', `Successfully loaded texture: ${url}`);
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        const errorMessage = `Failed to load texture: ${url}`;
        logSceneFailure('texture-load', errorMessage, error as Error);
        
        // Report to app shell if callback provided
        if (options?.onError) {
          options.onError('texture-load', errorMessage);
        }
        
        // Texture remains undefined, component should handle fallback
      }
    );
  }, [url, options?.onError]);

  return texture;
}
