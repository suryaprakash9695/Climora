import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function GradientBackground() {
  return (
    <LinearGradient
      colors={['#020617', '#1e1b4b', '#0f172a']}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
}
