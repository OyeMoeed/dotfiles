import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isArabic } from '@app/utilities/constants';
import { moderateScale } from 'react-native-size-matters';

const ipayPasscodeStyles = (theme: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgetPasscodeText: {
      marginBottom: moderateScale(40),
    },

    passcodeTab: {
      height: moderateScale(80),
      width: moderateScale(99),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.natural.natural0,
      borderRadius: moderateScale(16),
      marginHorizontal: moderateScale(10),
    },
    passcodeIconTab: {
      height: moderateScale(80),
      width: moderateScale(99),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateScale(16),
      marginHorizontal: moderateScale(10),
    },
    transparentView: {
      height: moderateScale(80),
      width: moderateScale(99),
      marginHorizontal: moderateScale(10),
      baclgroundColor: theme.transparent,
    },
    itemSeparator: {
      width: moderateScale(18),
      height: moderateScale(18),
    },
    pinContainer: {
      flexDirection: isArabic ? 'row-reverse' : 'row',
      marginBottom: moderateScale(40),
    },
    pinBox: {
      width: moderateScale(16),
      height: moderateScale(16),
      borderRadius: moderateScale(4),
      borderWidth: moderateScale(1),
      borderColor: theme.primary.primary500,
      marginHorizontal: moderateScale(6),
    },
    pinBoxFilled: {
      backgroundColor: theme.primary.primary500,
    },
    dialerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ipayPasscodeStyles;
