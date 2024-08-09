import { PropsWithChildren } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function Movie({ Poster, Title, Type, Year, imdbID, showControls = false }: PropsWithChildren & { Poster: string, Title: string, Type: string, Year: string, imdbID: string, showControls: boolean}) {
  return (
    <ThemedView
      key={Type+imdbID}
      style={styles.container}
    >
      <Image
        resizeMode='cover'
        style={styles.posterImage}
        source={{uri: Poster}}
      />
      <ThemedView
        style={styles.content}
      >
        <ThemedText type="title">{Title}</ThemedText>
        <ThemedText type="subtitle">{Year}</ThemedText>
        {showControls &&
          <ThemedView style={styles.controls}>
            <TouchableOpacity
              onPress={() => "TODO:"}
            >
              <ThemedText type="link">Add to my shows</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        }
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderColor: 'green',
    borderWidth: 2,
    flexDirection: 'row',
  },
  content: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexShrink: 2,
    gap: 6,
    marginLeft: 24,
    marginTop: 6,
  },
  controls: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  posterImage: {
    borderColor: 'red',
    borderWidth: 2,
    height: 350,
    minWidth: '50%',
  }
});
