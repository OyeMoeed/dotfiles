import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const appleWalletButtonStyles = () =>
  createStyleSheet({
    imageStyles: { height: moderateScale(35), width: moderateScale(110) },
  });
export default appleWalletButtonStyles;
