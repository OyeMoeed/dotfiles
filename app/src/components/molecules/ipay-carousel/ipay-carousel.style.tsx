import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const carouselStyles = (colors: any) =>
  createStyleSheet({
    defaultCarousel: {
      height: '90%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paginationContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paginationDot: {
      width: scale(10),
      height: verticalScale(10),
      borderRadius: moderateScale(100),
      marginEnd: moderateScale(10, 0.3),
    },
  });

export default carouselStyles;
