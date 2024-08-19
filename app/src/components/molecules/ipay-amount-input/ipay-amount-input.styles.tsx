import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_20, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const amountInputStyles = (colors) =>
  createStyleSheet({
    amountContainer: {
      alignSelf: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginVertical: moderateScale(12),
      alignItems: 'center',
    },
    currencyText: {
      marginHorizontal: moderateScale(5),
      fontSize: FONT_SIZE_20,
      color: colors.natural.natural1000,
    },
    textAmount: {
      color: colors.natural.natural1000,
      fontSize: moderateScale(34),
      fontWeight: FONT_WEIGHT_BOLD,
      lineHeight: moderateScale(36),
    },
    darkStyle: {
      color: colors.natural.natural300,
    },
    editIconStyle: {
      bottom: moderateScale(2),
    },
  });
export default amountInputStyles;
