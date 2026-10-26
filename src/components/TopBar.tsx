import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onFinish: () => void;
};

export default function TopBar({ canUndo, canRedo, onUndo, onRedo, onFinish }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onUndo}
        disabled={!canUndo}
        hitSlop={8}
        style={[styles.button, !canUndo && styles.disabled]}
      >
        <MaterialCommunityIcons name="undo" size={24} color="#3f3f46" />
      </Pressable>
      <Pressable
        onPress={onRedo}
        disabled={!canRedo}
        hitSlop={8}
        style={[styles.button, !canRedo && styles.disabled]}
      >
        <MaterialCommunityIcons name="redo" size={24} color="#3f3f46" />
      </Pressable>
      <Pressable
              onPress={onFinish}
              hitSlop={8}
              style={[styles.button]}
            >
        <MaterialCommunityIcons name="arrow-right" size={24} color="#3f3f46" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f4f4f5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d4d4d8',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.3 },
});