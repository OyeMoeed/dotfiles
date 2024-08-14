import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const sadadSaveBillStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    saveBillContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(16),
      paddingVertical: scaleFont(12),
      paddingHorizontal: scaleFont(18),
      gap: scaleFont(12),
    },
    saveBillStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputContainerStyle: {
      paddingLeft: scaleFont(20),
      paddingRight: scaleFont(40),
      backgroundColor: themeColors.natural.natural0,
    },
  });

export default sadadSaveBillStyles;
