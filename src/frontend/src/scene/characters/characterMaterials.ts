import { useMemo } from 'react';
import { MeshStandardMaterial, Color } from 'three';

/**
 * Shared material helpers for character primitives to minimize allocations and keep draw calls low.
 * Provides a small palette of reusable materials for humans and dogs.
 */

// Skin tone palette
export const SKIN_TONES = {
  light: '#f4d4b8',
  medium: '#d4a882',
  tan: '#c49968',
  dark: '#8a6a4a',
};

// Clothing color palette
export const CLOTHING_COLORS = {
  blue: '#4a6fa5',
  red: '#a54a4a',
  green: '#5a8a5a',
  gray: '#6a6a6a',
  brown: '#7a5a4a',
  black: '#2a2420',
};

// Dog fur colors
export const FUR_COLORS = {
  brown: '#8a6a4a',
  black: '#2a2420',
  white: '#e8dcc8',
  golden: '#d4a862',
  spotted: '#c4a882',
};

/**
 * Hook to create a shared material with the given color
 */
export function useCharacterMaterial(color: string, roughness = 0.7) {
  return useMemo(() => {
    const material = new MeshStandardMaterial({
      color: new Color(color),
      roughness,
      metalness: 0.1,
    });
    return material;
  }, [color, roughness]);
}

/**
 * Hook to create multiple shared materials at once
 */
export function useCharacterMaterials(colors: Record<string, string>, roughness = 0.7) {
  return useMemo(() => {
    const materials: Record<string, MeshStandardMaterial> = {};
    Object.entries(colors).forEach(([key, color]) => {
      materials[key] = new MeshStandardMaterial({
        color: new Color(color),
        roughness,
        metalness: 0.1,
      });
    });
    return materials;
  }, [colors, roughness]);
}
