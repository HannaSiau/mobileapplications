import { Text } from 'react-native';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import type { Phase } from './Game';
import type { SkImage } from '@shopify/react-native-skia';

type Props = { phase: Phase; onFinish: (image: SkImage) => void };

export default function DrawingCanvasLoader(props: Props) {
  return (
    <WithSkiaWeb
      getComponent={() => import('./DrawingCanvas')}
      componentProps={props}
      opts={{ locateFile: (file: string) => `/mobileapplications/public/${file}` }}
      fallback={<Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>}
    />
  );
}