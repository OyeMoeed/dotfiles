import createStyleSheet from '@app/styles/scaled-sheet.styles';

const carouselStyles = (colors: any) =>
  createStyleSheet({
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
