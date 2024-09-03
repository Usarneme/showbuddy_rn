import { Stack } from 'expo-router';

export default function UpcomingLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
