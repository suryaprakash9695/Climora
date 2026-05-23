import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { GradientBackground } from '@/components/GradientBackground';
import { APP_NAME, APP_TAGLINE } from '@/constants';

export default function SplashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    // Navigate to main after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center">
      <GradientBackground />
      <Animated.View entering={FadeIn.duration(800)} className="items-center">
        <Text className="text-5xl font-bold text-white">{APP_NAME}</Text>
        <Text className="mt-2 text-violet-300">{APP_TAGLINE}</Text>
        <ActivityIndicator color="#8b5cf6" className="mt-8" size="large" />
      </Animated.View>
    </View>
  );
}
