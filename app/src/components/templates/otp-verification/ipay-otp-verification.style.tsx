import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isAndroidOS } from '@app/utilities/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const otpVerificationStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(12),
    },
    headingView: {
      width: scale(300),
      paddingHorizontal: moderateScale(48, 0.3),
      marginBottom: moderateScale(32, 0.3),
    },
    messageIconView: {
      marginTop: moderateScale(24),
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
    toast: {
      width: scale(300),
      left: 0,
      right: 0,
      marginLeft: 0,
      marginRight: 0,
      bottom: isAndroidOS ? scale(20) : scale(110),
      zIndex: 1000,
      alignSelf: 'center',
    },
    refreshIconStyle: {
      height: verticalScale(14),
      width: moderateScale(14),
    },
    containerStyleIOS: {
      bottom: verticalScale(80),
    },
    containerStyleAndroid: {
      bottom: verticalScale(24),
    },
    needHelpBtn: {
      marginTop: verticalScale(14),
    },
  });

export default otpVerificationStyles;
