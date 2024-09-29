import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const trafficDetailStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    inputWrapper: {
      gap: moderateScale(16),
      backgroundColor: themeColors.natural.natural0,
      padding: moderateScale(24),
      borderRadius: moderateScale(28),
    },
    inputContainerStyle: {
      paddingLeft: moderateScale(20),
      paddingRight: moderateScale(40),
      backgroundColor: themeColors.natural.natural0,
      borderColor: themeColors.primary.primary100,
    },
    inputStyle: {
      paddingLeft: moderateScale(0),
    },
    segmentStyles: {
      borderWidth: 1,
      borderColor: themeColors.primary.primary100,
    },
    greyInputStyle: {
      backgroundColor: themeColors.natural.natural200,
    },
    checkBoxView: {
      alignItems: 'center',
      marginTop: moderateScale(16, 0.3),
      marginBottom: moderateScale(8, 0.3),
    },
    errorStyle: {
      borderColor: themeColors.error.error500,
    },
    checkBoxStyle: {
      marginRight: moderateScale(-2, 0.3),
    },
    tabWrapper: {
      gap: moderateScale(8),
    },
  });

export default trafficDetailStyles;
