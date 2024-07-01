import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';

const IPayExpBottomSheetStyles = (colors) =>
  createStyleSheet({
    headerText: {
      fontWeight: FONT_WEIGHT_BOLD,
      marginBottom: scaleSize(12),
      color: colors.primary.primary900,
    },
    subTitleText: {
      color: colors.natural.natural900,
    },
    sheetContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(24),
      justifyContent: 'space-between',
    },
  });
export default IPayExpBottomSheetStyles;
