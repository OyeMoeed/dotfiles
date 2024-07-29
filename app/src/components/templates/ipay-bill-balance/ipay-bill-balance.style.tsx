import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const billBalanceStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      justifyContent: 'space-between',
      height: '100%',
      paddingBottom: scaleFont(70),
    },
    accountBalance: {
      backgroundColor: themeColors.natural.natural3,
    },
    darkBlueText: {
      color: themeColors.primary.primary900,
    },
    progressBarBg: {
      backgroundColor: themeColors.success.success25,
    },
    greyText: {
      color: themeColors.natural.natural700,
    },
    darkText: {
      color: themeColors.natural.natural900,
    },
  });

export default billBalanceStyles;
