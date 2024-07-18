import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const replaceCardStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    childContainer: {
      marginHorizontal: moderateScale(24, 0.3),
      flex: 1,
      marginTop: verticalScale(24),
      marginBottom: verticalScale(32),
      gap: verticalScale(24),
    },
    contentContainer: {
      backgroundColor: colors.natural.natural50,
      flex: 1,
      borderRadius: 28,
      padding: moderateScale(16),
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
      marginBottom: moderateScale(16),
    },
    bottomContainer: {
      gap: moderateScale(12),
      marginTop: moderateScale(52),
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
      marginTop: moderateScale(16),
    },
  });

export default replaceCardStyles;
