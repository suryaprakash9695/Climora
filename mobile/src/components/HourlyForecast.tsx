import { View, Text, ScrollView, Image } from 'react-native';
import { GlassCard } from './GlassCard';

interface ForecastHour {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
}

interface Props {
  hours: ForecastHour[];
  temperatureUnit: 'celsius' | 'fahrenheit';
}

export function HourlyForecast({ hours, temperatureUnit }: Props) {
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <GlassCard className="mb-4">
      <Text className="mb-3 text-lg font-semibold text-white">Hourly Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hours.slice(0, 24).map((hour, index) => {
          const temp = temperatureUnit === 'fahrenheit' ? hour.temp_f : hour.temp_c;
          return (
            <View key={index} className="mr-3 items-center rounded-xl bg-white/5 p-3" style={{ width: 80 }}>
              <Text className="text-xs text-white/60">{formatTime(hour.time)}</Text>
              <Image
                source={{ uri: `https:${hour.condition.icon}` }}
                style={{ width: 40, height: 40, marginVertical: 8 }}
              />
              <Text className="text-lg font-semibold text-white">
                {Math.round(temp)}°
              </Text>
              <Text className="text-xs text-cyan-400">{hour.chance_of_rain}%</Text>
            </View>
          );
        })}
      </ScrollView>
    </GlassCard>
  );
}
