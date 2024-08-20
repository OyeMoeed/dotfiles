import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_20, FONT_SIZE_34, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
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
      marginHorizontal: moderateScale(isIosOS ? 6 : 0),
      fontSize: FONT_SIZE_20,
      color: colors.natural.natural1000,
      lineHeight: moderateScale(20),
      alignSelf: 'flex-end',
      marginBottom: moderateScale(!isIosOS ? 0 : 2),
    },
    textAmount: {
      color: colors.natural.natural1000,
      fontSize: FONT_SIZE_34,
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
