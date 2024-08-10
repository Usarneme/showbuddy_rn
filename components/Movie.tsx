import { PropsWithChildren } from 'react';
import { Image, StyleSheet } from 'react-native';

import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function Movie({ Poster, Title, Type, Year, imdbID, showControls = false }: PropsWithChildren & { Poster: string, Title: string, Type: string, Year: string, imdbID: string, showControls: boolean}) {
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
              onPress={() => console.log("TODO: handle Add to my shows button click", Poster, Title, Type, Year, imdbID)}
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
