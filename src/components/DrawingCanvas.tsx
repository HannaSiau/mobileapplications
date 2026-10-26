import React, { useRef, useState, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Canvas, Path, Skia, SkPath, useCanvasRef } from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Toolbar, { BrushSettings } from './Toolbar';
import TopBar from './TopBar';

type Stroke = BrushSettings & { path: SkPath };
type Current = { builder: ReturnType<typeof Skia.PathBuilder.Make>; stroke: Stroke };
enum Tools { brush, eraser }

const renderStroke = (s: Stroke, key?: number) => (
  <Path
    key={key}
    path={s.path}
    color={s.color}
    opacity={s.opacity}
    style="stroke"
    strokeWidth={s.size}
    strokeCap="round"
    strokeJoin="round"
  />
);

type Props = { onFinish: (image: SkImage) => void };

export default function DrawingCanvas({ onFinish }: Props) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [brush, setBrush] = useState<BrushSettings>({
      color: '#000000',
      size: 5,
      opacity: 1,
      });
  const currentRef = useRef<Current | null>(null);
  const brushRef = useRef<BrushSettings>(brush);
  brushRef.current = brush;
  const canvasRef = useCanvasRef();

  const finish = () => {
    const snapshot = canvasRef.current?.makeImageSnapshot();
    const image = snapshot?.makeNonTextureImage();
    if (image) onFinish(image);
  };

  const undo = () => {
      if (strokes.length === 0) return;
      const last = strokes[strokes.length - 1];
      setStrokes(strokes.slice(0, -1));
      setRedoStack((prev) => [...prev, last]);
    };

    const redo = () => {
      if (redoStack.length === 0) return;
      const last = redoStack[redoStack.length - 1];
      setRedoStack(redoStack.slice(0, -1));
      setStrokes((prev) => [...prev, last]);
    };

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .minDistance(0)
    .onStart((e) => {
        setRedoStack([]);
        const builder = Skia.PathBuilder.Make();
        builder.moveTo(e.x, e.y);
        const stroke: Stroke = { path: builder.build(), ...brushRef.current };
        currentRef.current = { builder, stroke };
        setCurrentStroke(stroke);
    })
    .onUpdate((e) => {
        const cur = currentRef.current;
        if (!cur) return;
        cur.builder.lineTo(e.x, e.y);
        cur.stroke = { ...cur.stroke, path: cur.builder.build() };
        setCurrentStroke(cur.stroke);
    })
    .onEnd(() => {
        const cur = currentRef.current;
        if (!cur) return;
        setStrokes((prev) => [...prev, cur.stroke]);
        currentRef.current = null;
        setCurrentStroke(null);
    });

    const committedPaths = useMemo(
        () => strokes.map((s, i) => renderStroke(s, i)),
        [strokes]
      );

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#f4f4f5' }}>
          <TopBar
            canUndo={strokes.length > 0}
            canRedo={redoStack.length > 0}
            onUndo={undo}
            onRedo={redo}
            onFinish={finish}
          />
          <View style={{ flex: 1 }}>
            <GestureDetector gesture={panGesture}>
              <Canvas ref={canvasRef} style={{ flex: 1, backgroundColor: 'white' }}>
                {committedPaths}
                {currentStroke && renderStroke(currentStroke)}
              </Canvas>
            </GestureDetector>
            <Toolbar settings={brush} onChange={setBrush} />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
}