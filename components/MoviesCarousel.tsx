// MoviesCarousel.tsx
import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { IMovie } from '@/constants/Types';

interface MoviesCarouselProps {
  movies: IMovie[];
}

export const MoviesCarousel = ({ movies }: MoviesCarouselProps) => {
  const windowWidth = Dimensions.get('window').width;

  const renderItem = ({ item }: { item: IMovie }) => (
    <Link href={`details/${item.imdbID}`}>
      <View style={styles.slide}>
        <Image source={{ uri: item.Poster }} style={styles.poster} />
        <Text style={styles.title}>{item.Title}</Text>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.imdbID.toString()}
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={true} // Hide the horizontal scroll indicator
        snapToAlignment="start" // Align the items to the center when snapping
        snapToInterval={windowWidth * 0.7 + 20} // Adjust item width and margin for snapping
        decelerationRate="fast" // Fast deceleration for smoother scrolling
        bounces={true} // Disable bouncing effect
        contentContainerStyle={styles.contentContainer} // Optional: Add padding to the content
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10, // Optional: Add padding to the left and right
  },
  slide: {
    width: '70%', // Adjust width based on your design
    alignItems: 'center',
    marginHorizontal: 10, // Margin between items
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    maxWidth: 150,
    textAlign: 'center',
  },
  poster: {
    minWidth: 150,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
