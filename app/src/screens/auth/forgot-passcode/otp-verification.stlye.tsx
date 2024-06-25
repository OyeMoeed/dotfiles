import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale } from 'react-native-size-matters';

const otpStyles = () =>
  createStyleSheet({
    otpStylesContainer: {
      flex: 1,
      marginHorizontal: moderateScale(40, 0.3),
      paddingVertical: moderateScale(12),
    },
    verifyViewRow: {
      flexDirection: 'row',
      gap:moderateScale(10),
    },
    verifyView: {
      marginTop: moderateScale(40),
      paddingHorizontal: moderateScale(16, 0.3),
      paddingVertical: moderateScale(12),
      borderRadius: moderateScale(16),
      backgroundColor: '#ffff',
    },
    verifyText: {
      marginBottom: moderateScale(16),
    },

    container: {
      flex: 1,
      aligItems: 'center',
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(30),
    },
    headingView: {
      paddingHorizontal: moderateScale(48, 0.3),
      marginBottom: moderateScale(32),
    },
    messageIconView: {
      marginTop: moderateScale(10),
      marginBottom: moderateScale(16),
      alignSelf: 'center',
    },
    timerText: {
      alignSelf: 'center',
      marginTop: moderateScale(40),
      marginBottom: moderateScale(8),
    },
    sendCodeBtnStyle: {
      marginBottom: moderateScale(32),
    },
    otpView: {
      marginTop: moderateScale(32),
    },
    needHelpBtn: {
      marginTop: moderateScale(20),
    },
  });

export default otpStyles;
