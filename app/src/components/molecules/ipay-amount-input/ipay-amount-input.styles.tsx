import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_20, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const amountInputStyles = (colors) =>
  createStyleSheet({
    amountContainer: {
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: verticalScale(12),
    },
    currencyText: {
      marginHorizontal: scaleSize(5),
      marginTop: verticalScale(12),
      fontSize: FONT_SIZE_20,
      color: colors.natural.natural1000

    },
    textAmount: {
      color: colors.natural.natural1000,
      marginTop: verticalScale(12),
      fontSize: scaleSize(34),
      fontWeight: FONT_WEIGHT_BOLD,
      lineHeight: scaleSize(36),
    },
    darkStyle: {
      color: colors.natural.natural300,
    }
  });
export default amountInputStyles;
