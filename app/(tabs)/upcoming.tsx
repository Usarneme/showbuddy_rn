import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function UpcomingScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My upcoming shows</ThemedText>
      </ThemedView>
      <ThemedText>TODO: a button to switch views from calendar to list</ThemedText>
      <ThemedText>TODO: a calendar view with upcoming shows in boxes</ThemedText>
      <ThemedText>TODO: a list view with upcoming shows in date order</ThemedText>
      <ThemedText>TODO: each list item has a button to take you to details page where you can set which episodes you have/have not seen and set up notifications for this show</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
