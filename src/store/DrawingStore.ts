import { create } from 'zustand';
import type { SkImage } from '@shopify/react-native-skia';

export const PHASES = ['head', 'body', 'legs'] as const;
export type Phase = (typeof PHASES)[number];

type DrawingStore = {
    images: Partial<Record<Phase, SkImage>>;
    setImage: (phase: Phase, image: SkImage) => void;
    reset: () => void;
    };

export const useDrawingStore = create<DrawingStore>((set) => ({
    images: {},
    setImage: (phase, image) => {
      set((s) => ({ images: { ...s.images, [phase]: image } }));
    },
    reset: () => set({ phases: {} })
    }));