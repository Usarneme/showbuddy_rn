import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useMovies } from '@/hooks/MoviesContext';

interface Movie {
  Poster?: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  // showControls?: boolean; // showControls is optional
}

export default function DetailsScreen({ route }: { route: { params: { id: number } } }) {
  // const router = useRouter();
  const params = useLocalSearchParams();

  const { id } = params;
  const movies = useMovies();
  const [ movie, setMovie ] = useState<Partial<Movie>>({});

  useEffect(() => {
    console.log("use effect in movie show details, id, movies:", id, movies);
    const thisMovie = Object.values(movies.movies).filter(m => m.imdbID === id)[0];
    console.log("🚀 ~ useEffect ~ thisMovie:", thisMovie)
    setMovie(thisMovie);
  }, []);

  return (
    <ThemedView
      key={movie.imdbID}
      style={styles.container}
    >
      {movie.Poster?.toLowerCase() == "n/a" ?
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          // TODO: replace source image with a not found/no image provided png or something
          />
      :
        <Image
          resizeMode='cover'
          style={styles.posterImage}
          source={{uri: movie.Poster}}
        />
      }
      <ThemedView
        style={styles.content}
      >
        <ThemedText style={styles.text} type="title">{movie.Title}</ThemedText>
        <ThemedText style={styles.text} type="subtitle">{movie.Year}</ThemedText>
        {/* {showControls &&
          <ThemedView style={styles.controls}>
            <ThemedPressable
              onPress={handleAddToMyMovies}
              type='round'
            >
              <ThemedText type="link">Add to my shows</ThemedText>
            </ThemedPressable>
          </ThemedView>
        } */}
      </ThemedView>
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    marginBottom: 12,
  },
  content: {
    alignItems: 'flex-start',
    backgroundColor: 'unset',
    flexDirection: 'column',
    flexShrink: 2,
    gap: 6,
    marginLeft: 24,
    marginTop: 6,
  },
  controls: {
    borderColor: 'gray',
    borderStyle: 'solid',
    borderRadius: 15,
    borderWidth: 2,
    padding: 4,
  },
  posterImage: {
    maxWidth: 400,
    minHeight: 315,
    minWidth: 200,
  },
  text: {
    color: 'black',
  }
});
