import { MeshStandardMaterial, MeshBasicMaterial, Texture } from 'three';

export function createContourMaterial(baseColor: string, emissiveColor: string, intensity: number = 0.5) {
  return new MeshStandardMaterial({
    color: baseColor,
    emissive: emissiveColor,
    emissiveIntensity: intensity,
    roughness: 0.7,
    metalness: 0.2,
  });
}

export function createWoodMaterial(baseColor: string = '#4a3f32') {
  return new MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.1,
  });
}

export function createMetalMaterial(baseColor: string = '#5a5a5a') {
  return new MeshStandardMaterial({
    color: baseColor,
    roughness: 0.3,
    metalness: 0.7,
  });
}

/**
 * Creates an unlit overlay material for contour lines that is independent of scene lighting.
 * Uses MeshBasicMaterial with transparency and proper depth settings to prevent z-fighting.
 */
export function createContourOverlayMaterial(contourTexture: Texture, opacity: number = 1.0) {
  return new MeshBasicMaterial({
    map: contourTexture,
    transparent: true,
    opacity: opacity,
    depthWrite: false, // Prevent z-fighting by not writing to depth buffer
    polygonOffset: true,
    polygonOffsetFactor: -1, // Pull overlay slightly forward
    polygonOffsetUnits: -1,
  });
}

export const contourColors = {
  highlight: '#ff8844',
  hover: '#ffaa66',
  active: '#cc6633',
  neutral: '#8b7355',
  wood: '#4a3f32',
  darkWood: '#3d3228',
  metal: '#5a5a5a',
  ceramic: '#e8d5c4',
};
