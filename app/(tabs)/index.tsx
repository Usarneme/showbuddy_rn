import { Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import MoviesCarousel from '@/components/MoviesCarousel';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useMovies } from '@/hooks/MoviesContext';

// const testMoviesAsArray = [
//   {
//     "imdbID":"tt0093870",
//     "Poster":"https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     "Title":"RoboCop",
//     "Type":"movie",
//     "Year":"1987"
//   },
//   {
//     "imdbID":"tt0111257",
//     "Poster":"https://m.media-amazon.com/images/M/MV5BYjc0MjYyN2EtZGRhMy00NzJiLWI2Y2QtYzhiYTU3NzAxNzg4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     "Title":"Speed",
//     "Type":"movie",
//     "Year":"1994"
//   },
//   {
//     "imdbID":"tt4993964",
//     "Poster":"https://m.media-amazon.com/images/M/MV5BMTgwNzU3ZWYtMmQ4Ny00NWNmLTk3ODgtNjJjYzI1NTE4YTUyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjgwMzE5OTI@._V1_SX300.jpg",
//     "Title":"Full Speed",
//     "Type":"movie",
//     "Year":"2016"
//   }
// ];

export default function HomeScreen() {
  const { movies } = useMovies();
  const moviesArray = Object.keys(movies).map(id => movies[id]);

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
          <MoviesCarousel movies={moviesArray} />
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
