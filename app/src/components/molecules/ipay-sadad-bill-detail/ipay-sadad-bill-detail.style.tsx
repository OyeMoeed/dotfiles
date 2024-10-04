import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const sadadBillDetailStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    inputWrapper: {
      gap: scaleFont(16),
      backgroundColor: themeColors.natural.natural0,
      padding: scaleFont(24),
      borderRadius: scaleFont(28),
    },
    inputContainerStyle: {
      paddingLeft: scaleFont(20),
      paddingRight: scaleFont(40),
      backgroundColor: themeColors.natural.natural0,
    },
    greyInputStyle: {
      backgroundColor: themeColors.natural.natural200,
    },
    labelStyle: { width: '100%' },
  });

export default sadadBillDetailStyles;
