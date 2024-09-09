import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const genratedStyles = (colors: any) =>
  createStyleSheet({
    otpMainView: {
      width: '96%',
      height: moderateScale(66),
      alignSelf: 'center',
    },
    underlineStyleBase: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(20),
      borderWidth: moderateScale(1),
      borderColor: colors.primary.primary100,
      width: moderateScale(65.25),
      height: moderateScale(64),
      padding: moderateVerticalScale(11, 0.3),
      alignItems: 'center',
      justifyContent: 'center',
    },
    underlineStyleHighLighted: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(20),
      borderWidth: moderateScale(1),
      borderColor: colors.primary.primary500,
      width: moderateScale(65.25),
      height: moderateScale(64),
      padding: moderateScale(11, 0.3),
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorMsgStyle: {
      color: colors.error.error500,
      width: '90%',
      textAlign: 'left',
    },
  });

export default genratedStyles;
