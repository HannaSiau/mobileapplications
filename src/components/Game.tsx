import { useState } from 'react';
import type { SkImage } from '@shopify/react-native-skia';
import DrawingCanvas from './DrawingCanvas';
import Reveal from './Reveal';
import { useDrawingStore, PHASES } from '../store/DrawingStore';

export default function Game() {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const setImage = useDrawingStore((state) => state.setImage);
    const images = useDrawingStore((state) => state.images);
    const reset = useDrawingStore((state) => state.reset);

    const handleFinish = (image: SkImage) => {
        setImage(PHASES[phaseIndex], image);
        setPhaseIndex((prev) => prev + 1);
    };

    const handleReset = () => {
        reset();
        setPhaseIndex(0);
    };

    if (phaseIndex >= PHASES.length) {
        return <Reveal images={images} onPlayAgain={handleReset} />;
    }



    return (
        <DrawingCanvas
            key={PHASES[phaseIndex]}
            onFinish={handleFinish}/>
    );

};