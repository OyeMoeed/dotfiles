import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const flipCardStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {},
    flipCard: {
      backfaceVisibility: 'hidden',
    },
    flipCardBack: {
      position: 'absolute',
      top: 0,
    },
    flipText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    expireOverlay: {
      backgroundColor: themeColors.error.error25,
      width: '100%',
      height: verticalScale(353),
      position: 'absolute',
      zIndex: 99999,
      opacity: 0.5,
      pointerEvents: 'none',
      borderRadius: moderateScale(12),
    },
  });

export default flipCardStyles;
