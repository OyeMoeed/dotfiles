import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';

import { moderateScale } from 'react-native-size-matters';

const IPayCardChipStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateScale(16),
      gap: moderateScale(8),
    },
    frame: {
      padding: moderateScale(12),
      borderRadius: moderateScale(12),
      flex: 1,
      gap: moderateScale(8),
    },
    textColor: { color: colors.natural.natural900 },
  });
export default IPayCardChipStyles;
