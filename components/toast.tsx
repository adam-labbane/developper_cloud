import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  visible: boolean;
};

export function Toast({ message, type = 'success', visible }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2000),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, message]);

  return (
    <Animated.View style={[styles.container, type === 'error' ? styles.error : styles.success, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 999,
  },
  success: { backgroundColor: '#34C759' },
  error:   { backgroundColor: '#FF3B30' },
  text:    { color: '#fff', fontWeight: '600', fontSize: 14 },
});
