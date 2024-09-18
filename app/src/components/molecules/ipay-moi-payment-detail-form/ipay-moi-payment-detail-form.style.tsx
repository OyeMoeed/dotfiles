import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moiPaymentDetialStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    dynamicFieldContainer: {
      flex: 1,
    },
    inputWrapper: {
      gap: scaleFont(16),
      backgroundColor: themeColors.natural.natural0,
      padding: scaleFont(24),
      borderRadius: scaleFont(28),
      flex: 1,
    },
    inputContainerStyle: {
      paddingLeft: scaleFont(20),
      paddingRight: scaleFont(40),
      backgroundColor: themeColors.natural.natural0,
      borderColor: themeColors.primary.primary100,
    },
    inputStyle: {
      marginTop: 0,
      height: moderateScale(40, 0.3),
    },
    greyInputStyle: {
      backgroundColor: themeColors.natural.natural200,
      borderWidth: 0,
    },
    checkBoxView: {
      alignItems: 'center',
      marginTop: moderateScale(16, 0.3),
      marginBottom: moderateScale(8, 0.3),
    },
    errorStyle: {
      borderColor: themeColors.error.error500,
    },
  });

export default moiPaymentDetialStyles;
