import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// import { useMovies } from '@/hooks/MoviesContext';

interface MovieDetails {
  Poster?: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  Actors?: string;
  BoxOffice?: string | number;
  Country?: string;
  Director?: string;
  Genre?: string;
  Plot?: string;
  Rated?: string;
  Released?: string | Date;
  Runtime?: string;
  Writer?: string;
  imdbRating?: string | number;
}

export default function DetailsScreen({ route }: { route: { params: { id: number } } }) {
  // const router = useRouter();
  const params = useLocalSearchParams();

  const { id } = params;
  // const movies = useMovies();
  const [ movie, setMovie ] = useState<Partial<MovieDetails>>({});
  const [key, _] = useState(process.env.EXPO_PUBLIC_OMDB_API_KEY);

  // http://www.omdbapi.com/?i=tt6521876
  const getDetails = async () => {
    // TODO: something went very wrong... redirect?
    if (!id) return;

    // TODO: move this into a service
    const url = `https://omdbapi.com/?apiKey=${key}&i=${id}`;
    console.log("making fetch. got url:", url)
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("got results:", json)
      setMovie(json);
    } catch (error) {
      console.error(error);
      // TODO: handle this with a toast or something
    }
  }

  useEffect(() => {
    // TODO: cache results
    // console.log("use effect in movie show details, id, movies:", id, movies);
    // const thisMovie = Object.values(movies.movies).filter(m => m.imdbID === id)[0];
    // console.log("🚀 ~ useEffect ~ thisMovie:", thisMovie)
    // setMovie(thisMovie);
    getDetails();
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
        <ThemedText style={styles.text}>Genre: {movie.Genre}</ThemedText>
        <ThemedText style={styles.text}>Rated: {movie.Rated}</ThemedText>
        <ThemedText style={styles.text}>Actors: {movie.Actors}</ThemedText>
        <ThemedText style={styles.text}>Plot summary: {movie.Plot}</ThemedText>
        <ThemedText style={styles.text}>Length: {movie.Runtime}</ThemedText>
        <ThemedText style={styles.text}>Written by: {movie.Writer}</ThemedText>
        <ThemedText style={styles.text}>Aggregate Rating: {movie.imdbRating}</ThemedText>
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
