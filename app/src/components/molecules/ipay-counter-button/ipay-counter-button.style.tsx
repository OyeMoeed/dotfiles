import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_12, SCALE_16, SCALE_20, spacing } from '@app/styles/spacing.const';

const styles = (themeColors: typeof colors) =>
  createStyleSheet({
    textStyle: {},
    counterContainerStyle: {
      flexDirection: 'row',
      backgroundColor: colors.primary.primary50,
      minWidth: spacing.CUSTOME_SCALE(96),
      minHeight: spacing.CUSTOME_SCALE(34),
      width: 'auto',
      height: 'auto',
      borderRadius: SCALE_12,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SCALE_16,
    },
    counterBorder: {
      borderWidth: SCALE_1,
      borderColor: themeColors.natural.natural0,
      height: SCALE_20,
    },
    counterTextStyle: {
      fontSize: spacing.CUSTOME_SCALE(32),
      color: themeColors.primary.primary600,
    },
    counterButtonContainer: {
      backgroundColor: 'transparent',
    },
  });

export default styles;
