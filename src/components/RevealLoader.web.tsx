import { Text } from 'react-native';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import type { SkImage } from '@shopify/react-native-skia';

type Props = { images: SkImage[]; onPlayAgain: () => void };

export default function RevealLoader(props: Props) {
  return (
    <WithSkiaWeb
      getComponent={() => import('./Reveal')}
      componentProps={props}
      opts={{ locateFile: (file: string) => `/mobileapplications/${file}` }}
      fallback={<Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>}
    />
  );
}