import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale } from 'react-native-size-matters';

const otpStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      aligItems: 'center',
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(30)
      // backgroundColor: 'red'
    },
    headingView: {
      width: scale(297),
      paddingHorizontal: moderateScale(48, 0.3)
    },
    messageIconView: {
      marginTop: moderateScale(24),
      marginBottom: moderateScale(16),
      alignSelf: 'center'
    },
    timerText: {
      alignSelf: 'center',
      marginTop: moderateScale(40),
      marginBottom: moderateScale(8)
    },
    sendCodeBtnStyle: {
      marginBottom: moderateScale(32)
    },
    otpView: {
      marginTop: moderateScale(32)
    }
  });

export default otpStyles;
