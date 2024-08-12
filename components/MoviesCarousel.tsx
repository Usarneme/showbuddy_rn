// MoviesCarousel.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { IMovie } from '@/constants/Types';

interface MoviesCarouselProps {
  movies: IMovie[];
}

const MoviesCarousel = ({ movies }: MoviesCarouselProps) => {
  const windowWidth = Dimensions.get('window').width;

  const renderItem = ({ item }: { item: IMovie }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <Text style={styles.title}>{item.Title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.imdbID.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={windowWidth * 0.7} // Adjust item width as needed
        decelerationRate="fast"
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
  slide: {
    width: '70%', // Adjust width based on your design
    alignItems: 'center',
    marginHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default MoviesCarousel;


// import { IMoviesCollection, IMovie } from '@/constants/Types';
// import { type ViewComponent } from 'react-native';
// // import { ThemedView } from '@/components/ThemedView';
// // import { ThemedText } from '@/components/ThemedText';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useKeenSliderNative } from 'keen-slider/react-native';

// // interface Slide {
// //   id: string; // Unique identifier for the slide
// //   title: string; // Title of the slide
// //   imageUrl: string; // URL of the image for the slide
// // }
const testMovies = [
  {
    "imdbID":"tt0093870",
    "Poster":"https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "Title":"RoboCop",
    "Type":"movie",
    "Year":"1987"
  },
  {
    "imdbID":"tt0111257",
    "Poster":"https://m.media-amazon.com/images/M/MV5BYjc0MjYyN2EtZGRhMy00NzJiLWI2Y2QtYzhiYTU3NzAxNzg4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "Title":"Speed",
    "Type":"movie",
    "Year":"1994"
  },
  {
    "imdbID":"tt4993964",
    "Poster":"https://m.media-amazon.com/images/M/MV5BMTgwNzU3ZWYtMmQ4Ny00NWNmLTk3ODgtNjJjYzI1NTE4YTUyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjgwMzE5OTI@._V1_SX300.jpg",
    "Title":"Full Speed",
    "Type":"movie",
    "Year":"2016"
  }
];

// interface MoviesCarouselProps {
//   numberOfMovies: number; // Number of slides
//   movies: IMovie[]; // Array of Slide objects
// }

// export const MoviesCarousel = () => {
// // export const MoviesCarousel = ({ numberOfMovies = testMovies.length, movies = testMovies }: MoviesCarouselProps) => {
//   const [sliderRef] = useKeenSliderNative({
//       loop: true, // Example option
//       initial: 0, // Start at the first slide
//       slides: {
//         perView: 3,
//         spacing: 15,
//       }
//   });

//   return (
//       <View style={styles.container}>
//           <View ref={sliderRef}>
//               {testMovies.map((slide, idx) => (
//                   <View key={slide.imdbID}>
//                       <Text>{slide.Title}</Text>
//                       {/* <Image source={{ uri: slide.imageUrl }} style={styles.image} /> */}
//                   </View>
//               ))}
//           </View>
//       </View>
//   );
// };

// // Define styles for the component
// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//   },
//   image: {
//       width: 200, // Adjust width as needed
//       height: 300, // Adjust height as needed
//       borderRadius: 10,
//   },
// });

// export default MoviesCarousel;
