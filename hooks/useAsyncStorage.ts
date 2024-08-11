import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMoviesCollection } from '@/constants/Types';

const STORAGE_KEY = 'movies';

export const saveMovies = async (movies: IMoviesCollection): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving movies to storage', error);
  }
};

export const getMovies = async (): Promise<IMoviesCollection> => {
  try {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    console.log("🚀 ~ getMovies ~ storedValue:", storedValue)
    return storedValue ? JSON.parse(storedValue) : {};
  } catch (error) {
    console.error('Error retrieving movies from storage', error);
    return {};
  }
};

export const removeMovie = async (imdbID: string): Promise<void> => {
  try {
    const movies = await getMovies();
    delete movies[imdbID];
    // const updatedMovies = movies.filter(movie => movie.imdbID !== imdbID);
    await saveMovies(movies);
  } catch (error) {
    console.error('Error removing movie from storage', error);
  }
};
