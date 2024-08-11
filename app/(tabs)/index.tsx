import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import useAsyncStorage from '@/hooks/useAsyncStorage';
// import { getItem, setItem, removeItem, clearStorage } from '@/hooks/useAsyncStorage';
import { useMovies } from '@/hooks/MoviesContext';

export default function HomeScreen() {
  // const [storage, setStorage] = useAsyncStorage<string>('showbuddy');
  // const [movies, setMovies] = useState({ movies: {} });
  const { movies } = useMovies();
  console.log("🚀 ~ HomeScreen ~ movies:", movies)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Show Buddy!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Link href="#">
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">All my shows</ThemedText>
          <ThemedText>a carousel of shows goes here...</ThemedText>
          { Object.keys(movies).length && Object.keys(movies).map(imdbID => <ThemedText key={imdbID}>{movies[imdbID].Title}</ThemedText>) }
        </ThemedView>
      </Link>
      <Link href="upcoming">
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">My upcoming shows</ThemedText>
          <ThemedText>a weekly calendar with shows listed in each date is here...</ThemedText>
        </ThemedView>
      </Link>
      <Link href="explore">
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Find New Shows</ThemedText>
          <ThemedText>a button to take you to the explore new shows page...</ThemedText>
        </ThemedView>
      </Link>
      <Link href="groups">
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">My groups</ThemedText>
          <ThemedText>a button to take you to your groups settings is here..</ThemedText>
        </ThemedView>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
