import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const IPayAppleWalletButtonStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    imageStyles: { height: moderateScale(35), width: moderateScale(110) },
  });
export default IPayAppleWalletButtonStyles;
