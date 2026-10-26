import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type BrushSettings = {
  color: string;
  size: number;
  opacity: number;
};

const COLORS = [
  '#000000', '#ffffff', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#3b82f6', '#a855f7',
];

type Props = {
  settings: BrushSettings;
  onChange: (next: BrushSettings) => void;
};

export default function Toolbar({ settings, onChange }: Props) {
    const initial = useRef({
        size: settings.size,
        opacity: settings.opacity,
      }).current;

  const update = (patch: Partial<BrushSettings>) =>
    onChange({ ...settings, ...patch });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {COLORS.map((c) => (
          <Pressable
            key={c}
            onPress={() => update({ color: c })}
            style={[
              styles.swatch,
              { backgroundColor: c },
              settings.color === c && styles.swatchActive,
            ]}
          />
        ))}
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <MaterialCommunityIcons name="circle-expand" size={20} color="#3f3f46" />
          <Text style={styles.value}>{Math.round(settings.size)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={initial.size}
          onValueChange={(v) => update({ size: v })}
        />
        <View style={styles.previewBox}>
          <View
            style={{
              width: settings.size,
              height: settings.size,
              borderRadius: settings.size / 2,
              backgroundColor: settings.color,
              opacity: settings.opacity,
            }}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.label}>
          <MaterialCommunityIcons name="opacity" size={20} color="#3f3f46" />
          <Text style={styles.value}>{Math.round(settings.opacity * 100)}%</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0.05}
          maximumValue={1}
          value={initial.opacity}
          onValueChange={(v) => update({ opacity: v })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 8,
    backgroundColor: '#f4f4f5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d4d4d8',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: {
    width: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: { fontSize: 12, color: '#3f3f46' },
  slider: { flex: 1, height: 32 },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d4d4d8',
  },
  swatchActive: { borderWidth: 3, borderColor: '#2563eb' },
  previewBox: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});