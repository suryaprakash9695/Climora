import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from '@/screens/SplashScreen';
import HomeScreen from '@/screens/HomeScreen';
import SearchScreen from '@/screens/SearchScreen';
import ForecastScreen from '@/screens/ForecastScreen';
import SettingsScreen from '@/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const climoraTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'transparent',
    card: 'transparent',
    border: 'rgba(255,255,255,0.1)',
    primary: '#8b5cf6',
    text: '#f8fafc',
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(2,6,23,0.95)',
          borderTopColor: 'rgba(255,255,255,0.1)',
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: '#a78bfa',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'partly-sunny',
            Search: 'search',
            Settings: 'settings',
          };
          return <Ionicons name={icons[route.name] ?? 'ellipse'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={climoraTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Forecast" component={ForecastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
