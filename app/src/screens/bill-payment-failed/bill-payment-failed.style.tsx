import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale } from 'react-native-size-matters';

const billFailedStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    alertContainer: {
      flex: 1,
      borderRadius: moderateScale(48),
      backgroundColor: themeColors.natural.natural50,
      marginVertical: moderateScale(16),
      paddingHorizontal: scale(15),
      paddingVertical: moderateScale(24),
    },
    alertWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleStyle: {
      color: themeColors.error.error500,
      marginVertical: moderateScale(16),
    },
    buttonWrapper: {
      gap: scale(16),
    },
    btnStyle: {
      justifyContent: 'center',
    },
  });

export default billFailedStyles;
