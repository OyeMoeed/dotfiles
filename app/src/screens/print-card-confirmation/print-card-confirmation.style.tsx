import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const printCardConfirmationStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    iconStyle: {
      marginLeft: moderateScale(2),
    },
    header: {
      marginBottom: moderateScale(8),
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
      paddingVertical: verticalScale(16),
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
      marginBottom: verticalScale(8),
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
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
      marginTop: moderateScale(20),
      marginBottom: moderateScale(8),
    },
    addressStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(4),
    },
    toastContainerStyle: {
      bottom: verticalScale(30),
    },
    confirmButton: {
      justifyContent: 'center',
    },
  });

export default printCardConfirmationStyles;
