import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';

const ipayBalanceProgressStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    topUpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: scaleSize(8),
    },
    amountValues: {
      flexDirection: 'row',
    },
    textAmount: {
      color: colors.natural.natural300,
    },
    naturalStyles: {
      color: colors.natural.natural700,
    },
    progressStyles: {
      marginTop: verticalScale(16),
      backgroundColor: colors.primary.primary100,
    },
  });
export default ipayBalanceProgressStyles;
