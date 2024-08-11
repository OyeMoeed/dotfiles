import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const contentNotFoundStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    sheetContentWrapper: {
      gap: moderateScale(16),
      alignItems: 'center',
      paddingHorizontal: moderateScale(24),
      marginTop: moderateScale(12),
    },
    textWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    darkColor: {
      color: themeColors.primary.primary900,
    },
    messageText: {
      color: themeColors.primary.primary800,
      textAlign: 'center',
    },
    btnStyle: {
      minWidth: '100%',
      marginTop: moderateScale(16),
      height: verticalScale(50),
      justifyContent: 'center',
    },
  });

export default contentNotFoundStyles;
