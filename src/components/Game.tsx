import { useState } from 'react';
import type { SkImage } from '@shopify/react-native-skia';
import DrawingCanvas from './DrawingCanvasLoader';
import Reveal from './Reveal';
import { useDrawingStore } from '../store/DrawingStore';
import { Stack } from 'expo-router';

export const PHASES_BY_PLAYERS = {
  1: ['full'],
  2: ['upper', 'lower'],
  3: ['head', 'body', 'legs'],
} as const;

export type PlayerAmt = keyof typeof PHASES_BY_PLAYERS;
export type Phase = (typeof PHASES_BY_PLAYERS)[PlayerAmt][number]

type Props = { playerAmt: PlayerAmt };

export default function Game({ playerAmt }: Props) {
    const phases = PHASES_BY_PLAYERS[playerAmt];
    const [phaseIndex, setPhaseIndex] = useState(0);
    const addImage = useDrawingStore((state) => state.addImage);
    const images = useDrawingStore((state) => state.images);
    const reset = useDrawingStore((state) => state.reset);

    const handleFinish = (image: SkImage) => {
        addImage(image);
        setPhaseIndex((prev) => prev + 1);
    };

    const handleReset = () => {
        reset();
        setPhaseIndex(0);
    };

    if (phaseIndex >= phases.length) {
        return <Reveal images={images} onPlayAgain={handleReset} />;
    }



    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <DrawingCanvas
                key={`${playerAmt}-${phases[phaseIndex]}`}
                phase={phases[phaseIndex]}
                onFinish={handleFinish}
                />
        </>
    );

};