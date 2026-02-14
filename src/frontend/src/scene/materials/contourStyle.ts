import { MeshStandardMaterial } from 'three';

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
