import { create } from 'zustand';

export type PanelType = 'menu' | 'about' | 'contact' | 'export' | null;

interface UIOverlayState {
  activePanel: PanelType;
  setActivePanel: (panel: PanelType) => void;
}

export const useUIOverlayStore = create<UIOverlayState>((set) => ({
  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel }),
}));
