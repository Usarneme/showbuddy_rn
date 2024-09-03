import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { IMovie, IMoviesCollection } from '@/constants/Types';
import { Movie } from '@/components/Movie';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [key, _] = useState(process.env.EXPO_PUBLIC_OMDB_API_KEY);

  const submitSearch = async (searchTerm: string) => {
    // TODO: notify user they haven't typed a search term yet
    if (!searchTerm) return;

    // TODO: move this into a service
    const url = `https://omdbapi.com/?apiKey=${key}&s=${searchTerm}`;
    // console.log("making fetch. got url:", url)
    try {
      // TODO: default limit is first 10 results, pagination?
      const response = await fetch(url);
      const json = await response.json();
      // console.log("got results:", json)
      if (json.Response === "True") {
        setResults(json.Search);
      }
    } catch (error) {
      console.error(error);
      // TODO: handle this with a toast or something
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Find new movies and shows</ThemedText>
      </ThemedView>
      <ThemedView style={{padding: 10}}>
        <TextInput
            style={{height: 40, color: '#FFFFFF', borderColor: '#FFFFFF'}}
            placeholder="Enter a show or movie name"
            onChangeText={newText => setSearchText(newText)}
            defaultValue={searchText}
          />
        <ThemedPressable
          onPress={() => submitSearch(searchText)}
        >
          <ThemedText>Search</ThemedText>
        </ThemedPressable>
      </ThemedView>
      <ThemedView>
      {results.length > 0 && results.map((r: IMovie) =>(
          <Movie
            key={r.imdbID}
            Poster={r.Poster}
            Title={r.Title}
            Type={r.Type}
            Year={r.Year}
            imdbID={r.imdbID}
            showControls={true}
          />
        ))}
      </ThemedView>
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
