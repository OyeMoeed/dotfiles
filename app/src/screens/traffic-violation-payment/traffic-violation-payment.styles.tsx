import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const billPaymentStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingBottom: moderateScale(24),
    },
    innerContainer: { margin: moderateScale(24), flex: 1 },
    margins: {
      margin: moderateScale(24),
      marginVertical: moderateScale(0),
      flex: 1,
    },
  });
export default billPaymentStyles;
