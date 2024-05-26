import { StyleSheet } from 'react-native';

const carouselStyles = (colors: any) =>
  StyleSheet.create({
    defaultCarousel: {
      height: '90%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    paginationContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 100,
      marginEnd: 10
    }
  });

export default carouselStyles;
