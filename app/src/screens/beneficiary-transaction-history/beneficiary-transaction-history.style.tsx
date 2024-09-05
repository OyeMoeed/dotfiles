import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const transactionHistoryStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      height: '100%',
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: scale(4),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    contentContainer: {
      paddingHorizontal: scale(24),
      paddingVertical: verticalScale(16),
      paddingBottom: verticalScale(50),
      height: '100%',
    },
    flatlist: {
      flex: 0,
      marginTop: verticalScale(6),
    },
    filterWrapper: {
      height: verticalScale(27),
      marginTop: moderateScale(8),
    },
    chipContainer: {
      marginLeft: moderateScale(10),
      backgroundColor: themeColors.secondary.secondary100,
    },
    chipHeading: {
      gap: moderateScale(10),
      color: themeColors.secondary.secondary500,
    },
    filterScroll: {
      flexDirection: 'row',
    },
  });

export default transactionHistoryStyles;
