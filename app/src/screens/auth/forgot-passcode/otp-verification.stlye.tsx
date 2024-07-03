import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isAndroidOS } from '@app/utilities/constants';
import { moderateScale, scale } from 'react-native-size-matters';

const otpStyles = (colors: any) =>
  createStyleSheet({
    otpStylesContainer: {
      flex: 1,
      marginHorizontal: moderateScale(40, 0.3),
      paddingVertical: moderateScale(12),
    },
    verifyViewRow: {
      flexDirection: 'row',
      gap: moderateScale(10),
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
      paddingHorizontal: moderateScale(40, 0.3),
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
      marginTop: moderateScale(22),
    },
    toast: {
      width: '100%',
      left: 0,
      right: 0,
      marignLeft: 0,
      marginRight: 0,
      bottom: isAndroidOS ? scaleSize(20) : scaleSize(110),
      zIndex: 1000,
      alignSelf: 'center',
    },
  });

export default otpStyles;
