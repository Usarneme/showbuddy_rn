import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function GroupsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My groups</ThemedText>
      </ThemedView>
      <ThemedText>TODO: a button to switch views from named group circles to list view</ThemedText>
      <ThemedText>TODO: an omnibox search bar for named groups and people filtering</ThemedText>
      <ThemedText>TODO: a Clear Filters button</ThemedText>
      <ThemedText>TODO: a list of groups by group name</ThemedText>
      <ThemedText>TODO: a graphic view of group circles</ThemedText>
      <ThemedText>TODO: each circle or list view item is a button to take you to details page for that group where you can add/remove members and update filters for that group (ie: adult/nsfw and no, cartoon, no-cartoon, documentaries, no lebron james movies, whatever)</ThemedText>
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
