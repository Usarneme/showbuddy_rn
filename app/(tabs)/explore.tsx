import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string | number;
  imdbID: string;
}

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('robocop');
  const [results, setResults] = useState([]);
  const [key, setKey] = useState(process.env.EXPO_PUBLIC_OMDB_API_KEY);

  const submitSearch = async (searchTerm: string) => {
    console.log("making request with key: process.env.EXPO_PUBLIC_OMDB_API_KEY", process.env.EXPO_PUBLIC_OMDB_API_KEY, key)
    // TODO: move this into a service
    const url = `https://omdbapi.com/?apiKey=${key}&s=${searchTerm}`;
    console.log("making fetch. got url:", url)
    try {
      // TODO: default limit is first 10 results, pagination?
      const response = await fetch(url);
      const json = await response.json();
      console.log("got results:", json)
      if (json.Response === "True") {
        setResults(json.Search);
      }
      // Poster: "https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
      // Title: "RoboCop"
      // Type: "movie"
      // Year: "1987"
      // imdbID: "tt0093870"

    } catch (error) {
      console.error(error);
      // TODO: handle this with a toast or something
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={{padding: 10}}>
      <TextInput
          style={{height: 40, color: '#FFFFFF', borderColor: '#FFFFFF'}}
          placeholder="Type here to translate!"
          onChangeText={newText => setSearchText(newText)}
          defaultValue={searchText}
        />
      <Button onPress={() => submitSearch(searchText)} title='Search' />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore new shows</ThemedText>
      </ThemedView>
      {results.length && results.map((r: movie) => <ThemedText key={r.Title+r.Year}>{r.Title} {r.Year}</ThemedText>)}
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
