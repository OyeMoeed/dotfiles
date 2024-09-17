import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardSegmentStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      paddingHorizontal: moderateScale(24),
      backgroundColor: colors.transparent,
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
      maxHeight: moderateScale(48, 0.3),
      marginBottom: moderateScale(3, 0.3),
    },
    flatListContainer: {
      height: '61.5%',
    },
  });

export default cardSegmentStyles;
