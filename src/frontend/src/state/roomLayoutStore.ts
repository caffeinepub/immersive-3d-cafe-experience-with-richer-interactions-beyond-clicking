import { create } from 'zustand';

export type RoomLayoutVariant = 'standard' | 'no-seating';

interface RoomLayoutState {
  variant: RoomLayoutVariant;
  setVariant: (variant: RoomLayoutVariant) => void;
  toggleVariant: () => void;
}

export const useRoomLayoutStore = create<RoomLayoutState>((set) => ({
  variant: 'standard',
  setVariant: (variant) => set({ variant }),
  toggleVariant: () =>
    set((state) => ({
      variant: state.variant === 'standard' ? 'no-seating' : 'standard',
    })),
}));
