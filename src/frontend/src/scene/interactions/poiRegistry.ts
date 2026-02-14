export interface POI {
  id: string;
  label: string;
  position: [number, number, number];
  action: string;
  highlightColor?: string;
}

export const poiRegistry: POI[] = [
  {
    id: 'menu-poi',
    label: 'View Menu',
    position: [-2, 1.5, -4.5],
    action: 'menu',
    highlightColor: '#ff8844',
  },
  {
    id: 'about-poi',
    label: 'About Us',
    position: [2, 1.5, -4.5],
    action: 'about',
    highlightColor: '#88ccff',
  },
  {
    id: 'contact-poi',
    label: 'Contact',
    position: [0, 1.2, -4.8],
    action: 'contact',
    highlightColor: '#88ff88',
  },
];
