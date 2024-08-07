import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const newPasscode = () =>
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
      marginBottom: moderateScale(30),
      alginSelf: 'cneter',
    },
    toast: {
      bottom: isIosOS ? verticalScale(80) : verticalScale(24),
    },
    fill: {
      flex: 1,
    },
  });

export default newPasscode;
