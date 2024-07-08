import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';
const cardDetailStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      gap: verticalScale(6),
    },
  });

export default cardDetailStyles;
