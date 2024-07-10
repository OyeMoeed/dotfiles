import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardSegmentStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      paddingHorizontal: moderateScale(24),
      backgroundColor: colors.natural.natural100,
    },
    flatlist: {
      flex: 0,
      backgroundColor: colors.natural.natural100,
    },
    textColor: { color: colors.primary.primary900 },
    detailTextColor: { color: colors.primary.primary800 },
    segmentStyles: {
      marginVertical: verticalScale(8),
    },
  });

export default cardSegmentStyles;
