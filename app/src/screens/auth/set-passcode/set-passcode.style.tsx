import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { moderateScale } from 'react-native-size-matters';

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
      paddingHorizontal: moderateScale(60, 0.3),
      marginBottom: moderateScale(50),
      alignSelf: 'center',
    },
  });

export default passcodeStyles;
