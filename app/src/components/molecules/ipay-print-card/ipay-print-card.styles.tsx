import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const IPayPrintCardStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    imageStyles: { height: moderateScale(35), width: moderateScale(110) },
    container: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(28),
      padding: moderateScale(28),
      gap: moderateScale(12),
    },
  });
export default IPayPrintCardStyles;
