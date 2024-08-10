import { PropsWithChildren, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import useAsyncStorage from '@/hooks/useAsyncStorage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@/hooks/useAsyncStorage';

export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface IMoviesCollection {
  movies: {
    [key: string]: IMovie;
  }
}

interface MovieProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  showControls?: boolean; // Make showControls optional
}

export function Movie({ Poster, Title, Type, Year, imdbID, showControls = false }: PropsWithChildren<MovieProps>) {
  // const [storage, setStorage] = useAsyncStorage<IMoviesCollection>('showbuddy');
  const [moviesCollection, setMoviesCollection] = useState<IMoviesCollection>({ movies: {} });

  const handleAddToMyMovies = async () => {
    if (!imdbID || !Poster || !Title || !Type || !Year) {
      console.log("Problem with handleAddToMyMovies");
      return; // TODO: error handling
    }

    const newMovie: IMovie = {
      imdbID,
      Poster,
      Title,
      Type,
      Year,
    }

    console.log("🚀 ~ handleAddToMyMovies ~ new movie key:", newMovie.imdbID)
    const previousMovieCollectionKeys = Object.keys(moviesCollection.movies);
    console.log("previous movie number and keys:", previousMovieCollectionKeys.length, previousMovieCollectionKeys)

    if (previousMovieCollectionKeys.includes(newMovie.imdbID)) {
      console.log("duplicate movie selected, not saving...")
    } else {
      console.log("new movie detected. saving...")
      const updatedMovies = { ...moviesCollection.movies, [imdbID]: newMovie };
      console.log("🚀 ~ handleAddToMyMovies ~ updatedMovies:", Object.keys(updatedMovies).length, updatedMovies)

      try {
        await AsyncStorage.setItem('showbuddy', JSON.stringify({ movies: updatedMovies }));
        console.log("finished saving. calling re-fetch...")
        await fetchMovies();
      } catch (error) {
        console.error('Error saving movie', error);
      }
    }

  }

  const fetchMovies = async (): Promise<void> => {
    try {
      const storedValue = await AsyncStorage.getItem('showbuddy');

      if (storedValue) {
        console.log("fetchMovies. storage value found. setting movies collection...")
        setMoviesCollection(JSON.parse(storedValue) as IMoviesCollection);
        console.log("finished setting collection. exiting fetchMovies")
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <ThemedView
      key={Type+imdbID}
      style={styles.container}
    >
      {Poster.toLowerCase() == "n/a" ?
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          // TODO: replace source image with a not found/no image provided png or something
          />
      :
        <Image
          resizeMode='cover'
          style={styles.posterImage}
          source={{uri: Poster}}
        />
      }
      <ThemedView
        style={styles.content}
      >
        <ThemedText type="title">{Title}</ThemedText>
        <ThemedText type="subtitle">{Year}</ThemedText>
        {showControls &&
          <ThemedView style={styles.controls}>
            <ThemedPressable
              onPress={handleAddToMyMovies}
              type='round'
            >
              <ThemedText type="link">Add to my shows</ThemedText>
            </ThemedPressable>
          </ThemedView>
        }
      </ThemedView>
    </ThemedView>
  );
}

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
  }
});
