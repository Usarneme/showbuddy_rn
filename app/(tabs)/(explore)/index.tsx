import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, TextInput } from 'react-native';

import { IMovie, IMoviesCollection } from '@/constants/Types';
import { apiService, QueryResult } from '@/services/apiService';

import { Movie } from '@/components/Movie';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExploreScreen() {
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [key, _] = useState(process.env.EXPO_PUBLIC_OMDB_API_KEY);

  const [page, setPage] =  useState(1);
  const [results, setResults] = useState<IMovie[]>([]);
  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState<number | string>(0);

  const fetchAndSet = async () => {
    const api = apiService(key);
    const json = await api.getResults(searchText, page) as QueryResult;

    // TODO: fix this monstrosity, make a real error handler toast
    if (json instanceof Error) return alert('No data found. Please try again');

    setResults(json.Search);
    setTotalResults(json.totalResults);
    if (Number(json.totalResults) > 10) setHasMoreResults(true);
  };

  const submitSearch = async () => {
    // TODO: notify user they haven't typed a search term yet
    if (!searchText) return;
    return await fetchAndSet();
  };

  const getNextPageOfResults = async () => {
    setPage(page + 1);
    await fetchAndSet();
  };

  const reset = () => {
    setSearchText('');
    setResults([]);
    setPage(1);
    setTotalResults(0);
    setHasMoreResults(false);
  };

  // reset fields when the user navigates away from this tab
  useFocusEffect(
    useCallback(() => reset(), [])
  );

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
          onPress={submitSearch}
        >
          <ThemedText>Search</ThemedText>
        </ThemedPressable>
        <ThemedPressable onPress={reset}>
          <ThemedText>Reset Search</ThemedText>
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
        {hasMoreResults &&
          <ThemedView>
            <ThemedText>Found {totalResults} matching your search...</ThemedText>
            <ThemedPressable onPress={getNextPageOfResults}><ThemedText>Get more...</ThemedText></ThemedPressable>
          </ThemedView>
        }
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
