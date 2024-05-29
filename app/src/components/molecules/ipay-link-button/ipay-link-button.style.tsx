import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';

const genratedStyles = (colors: any) =>
  createStyleSheet({
    btnLarge: {
      paddingHorizontal: spacing.SCALE_24,
      paddingVertical: spacing.SCALE_12,
      height: spacing.SCALE_50,
    },
    btnMedium: {
      paddingHorizontal: spacing.SCALE_14,
      paddingVertical: spacing.CUSTOME_SCALE(7),
      height: spacing.CUSTOME_SCALE(34),
    },
    btnSmall: {
      paddingHorizontal: spacing.SCALE_6,
      paddingVertical: spacing.SCALE_4,
      height: spacing.SCALE_28,
    },
    childContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnTextView: {
      marginHorizontal: spacing.SCALE_6,
    },
  });

export default genratedStyles;
