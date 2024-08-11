// MoviesContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { IMovie, IMoviesCollection } from '@/constants/Types';
import { getMovies, saveMovies, removeMovie as removeMovieFromStorage } from '@/hooks/useAsyncStorage';

interface MoviesContextType {
  movies: IMoviesCollection;
  addMovie: (movie: IMovie) => Promise<void>;
  removeMovie: (imdbID: string) => Promise<void>;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<IMoviesCollection>({});

  useEffect(() => {
    const fetchMovies = async () => {
      const storedMovies = await getMovies();
      setMovies(storedMovies);
    };
    fetchMovies();
  }, []);

  const addMovie = async (movie: IMovie) => {
    const updatedMovies = {...movies, [movie.imdbID]: movie };
    await saveMovies(updatedMovies);
    setMovies(updatedMovies);
  };

  const removeMovie = async (imdbID: string) => {
    await removeMovieFromStorage(imdbID);
    const updatedMovies = await getMovies();
    setMovies(updatedMovies);
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovie, removeMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};
