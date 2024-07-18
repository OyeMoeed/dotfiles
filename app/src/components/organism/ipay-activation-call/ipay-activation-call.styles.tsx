import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';
const activationCallStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      gap: verticalScale(8),
    },
  });

export default activationCallStyles;
