import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const toggleButtonStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      width: moderateScale(51),
      height: moderateScale(31),
      borderRadius: spacing.SCALE_24,
      justifyContent: 'center',
      paddingHorizontal: spacing.SCALE_1,
    },
    childContainer: {
      height: moderateScale(24),
      width: moderateScale(24),
      borderRadius: spacing.SCALE_128,
      backgroundColor: colors.natural.natural0,
      shadowColor: colors.natural.natural1000,
      shadowOffset: {
        width: 0,
        height: spacing.SCALE_1,
      },
      shadowOpacity: 0.22,
      shadowRadius: scaleSize(2.22),
      elevation: 3,
    },
    isOnParent: {
      backgroundColor: colors.tertiary.tertiary500,
      alignItems: 'flex-end',
    },
    isOffParent: {
      backgroundColor: colors.natural.natural200,
      alignItems: 'flex-start',
    },
    isOnChild: {
      alignItems: 'flex-end',
      shadowColor: colors.natural.natural1000,
    },
    isOffChild: {
      alignItems: 'flex-start',
      shadowColor: colors.natural.natural1000,
    },
  });

export default toggleButtonStyles;
