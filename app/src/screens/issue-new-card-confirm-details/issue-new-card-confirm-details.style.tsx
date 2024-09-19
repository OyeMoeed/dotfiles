import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const issueNewCardConfirmDetailsStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    childContainer: {
      marginHorizontal: moderateScale(24, 0.3),
      flex: 1,
      marginTop: verticalScale(24),
      marginBottom: verticalScale(32),
      gap: verticalScale(4),
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
      marginBottom: verticalScale(-6),
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
      color: colors.natural.natural900,
    },
    footNoteTextStyle: {
      marginTop: moderateScale(16),
    },
    addressStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(4),
    },
    button: {
      borderRadius: moderateScale(8),
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(20),
      justifyContent: 'center',
      backgroundColor: colors.primary.primary500,
    },
  });

export default issueNewCardConfirmDetailsStyles;
