import { Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

interface Props {
  weather: WeatherData;
  onPress: () => void;
}

export async function shareWeather(weather: WeatherData) {
  const shareText = `🌤️ Weather in ${weather.location.name}, ${weather.location.country}
🌡️ ${Math.round(weather.current.temp_c)}°C (${Math.round(weather.current.temp_f)}°F)
☁️ ${weather.current.condition.text}
💧 Humidity: ${weather.current.humidity}%
💨 Wind: ${Math.round(weather.current.wind_kph)} km/h

Check weather with Climora!`;

  try {
    await Share.share({
      message: shareText,
      title: `Weather in ${weather.location.name}`,
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
}

export async function copyWeather(weather: WeatherData) {
  const shareText = `🌤️ Weather in ${weather.location.name}, ${weather.location.country}
🌡️ ${Math.round(weather.current.temp_c)}°C (${Math.round(weather.current.temp_f)}°F)
☁️ ${weather.current.condition.text}
💧 Humidity: ${weather.current.humidity}%
💨 Wind: ${Math.round(weather.current.wind_kph)} km/h`;

  try {
    await Clipboard.setStringAsync(shareText);
    Alert.alert('Copied!', 'Weather info copied to clipboard');
  } catch (error) {
    console.error('Error copying:', error);
  }
}
