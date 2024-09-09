import { scaleFont, scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const innerWidth = SCREEN_WIDTH - moderateScale(48);

const merchantStyles = (theme: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    searchInputStyle: {
      height: verticalScale(36),
      marginTop: scaleFont(10),
      borderRadius: scaleFont(12),
      backgroundColor: theme.natural.natural0,
    },
    contentContainer: {
      marginHorizontal: moderateScale(24),
    },
    merchantList: {
      marginBottom: scaleSize(12),
      marginTop: scaleSize(12),
      flex: 0,
    },
    containerWrapper: {
      gap: scaleSize(12),
    },

    columnWrapper: {
      gap: innerWidth * 0.035,
    },

    cardContainer: {
      width: innerWidth * 0.31,
    },
  });

export default merchantStyles;
