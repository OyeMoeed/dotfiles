import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { Platform } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardSegmentStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      paddingHorizontal: moderateScale(24),
      backgroundColor: colors.natural.natural100,
    },
    flatlist: {
      flex: 0,
      backgroundColor: colors.transparent,
    },
    textColor: { color: colors.primary.primary900 },
    detailTextColor: { color: colors.primary.primary800 },
    segmentStyles: {
      marginVertical: verticalScale(8),
      borderWidth: 1,
      borderColor: colors.primary.primary100,
    },
    zeroPadding: {
      paddingLeft: 0,
    },
    cardContainer: {
      marginBottom: moderateScale(2, 0.3),
      paddingVertical: 0,
    },
    flatListContainer: {
      marginTop: moderateScale(3),
      flex: 0,
      ...Platform.select({
        android: {
          height: '45.5%',
        },
        ios: {
          height: '43.5%',
        },
      }),
    },
  });

export default cardSegmentStyles;
