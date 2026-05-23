import { View, type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

interface Props extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '', style, ...props }: Props) {
  return (
    <View
      className={`overflow-hidden rounded-2xl border border-white/10 ${className}`}
      style={style}
      {...props}
    >
      <BlurView intensity={40} tint="dark" className="p-5">
        {children}
      </BlurView>
    </View>
  );
}
