import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { isAndroidOS } from '@app/utilities/constants';
import { moderateScale, scale } from 'react-native-size-matters';

const passcodeStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(12),
    },
    lockIconView: {
      marginTop: moderateScale(20),
      marginBottom: moderateScale(8),
      alignSelf: 'center',
    },
    headingView: {
      width: spacing.CUSTOME_SCALE(297),
      paddingHorizontal: moderateScale(60, 0.3),
      marginBottom: moderateScale(60),
      alignSelf: 'center',
    },
    forgetPasscodeheadingView: {
      width: spacing.CUSTOME_SCALE(297),
      marginBottom: moderateScale(50),
      alignSelf: 'center',
    },
    createPasscodeHeadingView: {
      width: spacing.CUSTOME_SCALE(297),
      paddingHorizontal: moderateScale(60, 0.3),
      marginBottom: moderateScale(40),
    },
    toastStyle: {
      width: '90%',
      left: scale(16),
      bottom: scale(20),
      zIndex: 1000,
      alignSelf: 'center',
    },
    confirmPasscodeToastStyle: {
      width: moderateScale(340),
      marignLeft: 0,
      marginRight: 0,
      bottom: isAndroidOS ? scale(20) : scale(120),
      zIndex: 1000,
    },
  });

export default passcodeStyles;
