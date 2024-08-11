export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface IMoviesCollection {
  [key: string]: IMovie;
}
