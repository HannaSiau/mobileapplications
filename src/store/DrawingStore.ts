import { create } from 'zustand';
import type { SkImage } from '@shopify/react-native-skia';

type DrawingStore = {
    images: SkImage[];
    addImage: (image: SkImage) => void;
    reset: () => void;
    };

export const useDrawingStore = create<DrawingStore>((set) => ({
    images: [],
    addImage: (image) => set((s) => ({ images: [...s.images, image] })),
    reset: () => set({ images: [] })
    }));