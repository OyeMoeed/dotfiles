import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const replaceCardStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    addressStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(4),
    },

    darkStyle: {
      color: themeColors.primary.primary900,
    },
    remainingText: {
      color: themeColors.natural.natural700,
    },
    currencyTextStyle: {
      color: themeColors.natural.natural1000,
    },
    btn: {
      justifyContent: 'center',
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(20),
      backgroundColor: colors.primary.primary500,
      borderRadius: moderateScale(16),
    },
    header: { marginBottom: moderateScale(8) },
    childContainer: {
      marginHorizontal: moderateScale(24, 0.3),
      flex: 1,
      marginTop: verticalScale(24),
      marginBottom: verticalScale(32),
    },
    contentContainer: {
      backgroundColor: colors.natural.natural50,
      flex: 1,
      borderRadius: 28,
      paddingHorizontal: moderateScale(16),
      overflow: 'hidden',
    },
    contentTopMargin: {
      marginTop: verticalScale(16),
    },
    zeroMargin: {
      marginTop: 0,
    },
    termsContainer: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(12),
    },
    bottomContainer: {
      gap: moderateScale(12),
      marginBottom: verticalScale(16),
    },
    termsChildContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    termText: {
      flex: 1,
      marginStart: moderateScale(16),
      marginEnd: moderateScale(10),
      color: colors.natural.natural900,
    },
    footNoteTextStyle: {
      marginBottom: moderateScale(8),
      marginTop: moderateScale(16),
    },
  });

export default replaceCardStyles;
