import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { get } from './../hooks/useAsyncStorage';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [storage, setStorage] = useState({});
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const retrieveData = async () => {
    const key = process.env.EXPO_PUBLIC_ASYNC_STORAGE_KEY;
    console.log("got key:", key)
    if (key) {
      const data = await get(key);
      setStorage({ key: data });
    } else {
      setStorage({ key: {} })
    }
  }

  useEffect( () => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log("Loaded:", process.env, process.env.EXPO_PUBLIC_ASYNC_STORAGE_KEY);
      retrieveData();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
