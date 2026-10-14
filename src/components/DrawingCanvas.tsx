import React, { useRef, useState } from 'react';
import { Canvas, Path, Skia, SkPath } from '@shopify/react-native-skia';
import {GestureDetector, GestureHandlerRootView, usePanGesture} from 'react-native-gesture-handler';

export default function DrawingCanvas(){
    const [paths, setPaths] = useState<SkPath[]>([]);
    const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
    const currentRef = useRef<SkPath | null>(null);

    const panGesture = usePanGesture({
        runOnJS: true,
        minDistance: 0,
        onActivate: (e) => {
        const newPath = Skia.Path.Make();
        newPath.moveTo(e.x, e.y);
        currentRef.current = newPath;
        setCurrentPath(newPath.copy());
        },
        onUpdate: (e) => {
        if (currentRef.current) {
            currentRef.current.lineTo(e.x, e.y);
            setCurrentPath(currentRef.current.copy());
        }
        },
        onDeactivate: () => {
        if (currentRef.current) {
            const finished = currentRef.current;
            setPaths((prev) => [...prev, finished]);
            currentRef.current = null;
            setCurrentPath(null);
        }
        },
    });
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={panGesture}>
            <Canvas style={{ flex: 1 }}>
            {paths.map((p, i) => (
                <Path key={i} path={p} color="black" style="stroke" strokeWidth={4} />
            ))}
            {currentPath && (
                <Path path={currentPath} color="black" style="stroke" strokeWidth={4} />
            )}
            </Canvas>
        </GestureDetector>
        </GestureHandlerRootView>
    );
}