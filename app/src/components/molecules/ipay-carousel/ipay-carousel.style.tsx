import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const carouselStyles = (colors: any) =>
  createStyleSheet({
    defaultCarousel: {
      height: verticalScale(160),
    },
    paginationContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    paginationDot: {
      width: scaleSize(10),
      height: verticalScale(10),
      borderRadius: scaleFont(100),
      marginEnd: scaleFont(5),
    },
  });

export default carouselStyles;
