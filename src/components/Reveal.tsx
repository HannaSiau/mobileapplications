import { View, Button } from 'react-native';
import { Canvas, Image } from '@shopify/react-native-skia';
import { useState } from 'react';
import { PHASES } from '../store/DrawingStore';

export default function Reveal({ images, onPlayAgain }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{ flex: 1 }}
        onLayout={(e) => setSize(e.nativeEvent.layout)}
      >
        {size.height > 0 &&
          PHASES.map((p) => (
            <Canvas key={p} style={{ width: size.width, height: size.height / 3 }}>
              {images[p] && (
                <Image
                  image={images[p]!}
                  x={0}
                  y={0}
                  width={size.width}
                  height={size.height / 3}
                  fit="contain"
                />
              )}
            </Canvas>
          ))}
      </View>
      <Button title="Play again" onPress={onPlayAgain} />
    </View>
  );
}