import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.styles';

const toggleButtonStyles = (colors: any) =>
  createStyleSheet({
    container: {
      width: spacing.CUSTOME_SCALE(40),
      height: spacing.CUSTOME_SCALE(20),
      borderRadius: spacing.SCALE_24,
      justifyContent: 'center',
      // borderWidth: spacing.SCALE_1,
      paddingHorizontal: spacing.SCALE_1,
    },
    childContainer: {
      width: spacing.SCALE_16,
      height: spacing.SCALE_16,
      borderRadius: spacing.SCALE_128,
    },
    isOnParent: {
      height: spacing.CUSTOME_SCALE(31),
      width: spacing.CUSTOME_SCALE(62),
      padding: spacing.SCALE_4,
      backgroundColor: colors.tertiary.tertiary500,
      alignItems: 'flex-end',
      // borderColor: colors.tertiary.tertiary500
    },
    isOffParent: {
      width: spacing.CUSTOME_SCALE(62),
      height: spacing.CUSTOME_SCALE(31),
      padding: spacing.SCALE_4,
      backgroundColor: colors.natural.natural200,
      alignItems: 'flex-start',
      // borderColor: colors.natural.natural200
    },
    isOnChild: {
      height: spacing.CUSTOME_SCALE(27),
      width: spacing.CUSTOME_SCALE(27),
      backgroundColor: colors.natural.natural0,
      alignItems: 'flex-end',
      shadowColor: colors.natural.natural1000,
      shadowOffset: { width: 0, height: spacing.SCALE_4 },
      shadowOpacity: 0.25,
      shadowRadius: spacing.SCALE_1,
      elevation: spacing.SCALE_1,
    },
    isOffChild: {
      height: spacing.CUSTOME_SCALE(27),
      width: spacing.CUSTOME_SCALE(27),
      backgroundColor: colors.natural.natural0,
      alignItems: 'flex-start',
      shadowColor: colors.natural.natural1000,
      shadowOffset: { width: 0, height: spacing.SCALE_4 },
      shadowOpacity: 0.25,
      shadowRadius: spacing.SCALE_1,
      elevation: spacing.SCALE_1,
    },
  });

export default toggleButtonStyles;
