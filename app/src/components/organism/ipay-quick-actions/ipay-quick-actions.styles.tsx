import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const iPayQuickActionsStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    textAmount: {
      color: colors.natural.natural300,
    },
    naturalStyles: {
      color: colors.natural.natural700,
    },
    buttonBg: {
      minWidth: scaleSize(80),
      backgroundColor: colors.secondary.secondary100,
      paddingVertical: scaleSize(8),
      borderRadius: scaleSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: moderateScale(8),
      marginTop: scaleSize(24),
    },
  });
export default iPayQuickActionsStyles;
