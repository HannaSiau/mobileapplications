import { View, Button } from 'react-native';
import { Canvas, Image, type SkImage } from '@shopify/react-native-skia';
import { useState } from 'react';

type Props = { images: SkImage[]; onPlayAgain: () => void };

export default function Reveal({ images, onPlayAgain }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const sliceHeight = size.height / images.length;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }} onLayout={(e) => setSize(e.nativeEvent.layout)}>
        {size.height > 0 &&
          images.map((image, i) => (
            <Canvas key={i} style={{ width: size.width, height: sliceHeight }}>
              <Image image={image} x={0} y={0} width={size.width} height={sliceHeight} fit="contain" />
            </Canvas>
          ))}
      </View>
      <Button title="Play again" onPress={onPlayAgain} />
    </View>
  );
}