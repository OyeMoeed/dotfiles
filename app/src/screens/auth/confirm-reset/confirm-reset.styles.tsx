import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { isAndroidOS, isIosOS } from '@app/utilities/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const resetPasscodeStyles = () =>
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
    },
    dialerView: {
      marginTop: verticalScale(40),
      flex: 1,
    },
    toastStyle: {
      width: moderateScale(340),
      left: scale(8),
      marignLeft: 0,
      marginRight: 0,
      bottom: isAndroidOS ? scale(100) : scale(140),
      zIndex: 1000,
    },
    toast: {
      bottom: isIosOS ? verticalScale(80) : verticalScale(24),
    },
  });

export default resetPasscodeStyles;
