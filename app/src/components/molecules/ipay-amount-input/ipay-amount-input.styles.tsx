import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_20, FONT_SIZE_34, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { Platform } from 'react-native';
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
      ...Platform.select({
        android: {
          marginHorizontal: 0,
        },
        ios: {
          marginHorizontal: 6,
        },
      }),
      fontSize: FONT_SIZE_20,
      color: colors.natural.natural1000,
      lineHeight: moderateScale(20),
      alignSelf: 'flex-end',
    },
    textAmount: {
      color: colors.natural.natural1000,
      fontSize: FONT_SIZE_34,
      fontWeight: FONT_WEIGHT_BOLD,
      lineHeight: moderateScale(38),
    },
    darkStyle: {
      color: colors.natural.natural300,
    },
    editIconStyle: {
      bottom: moderateScale(2),
    },
  });
export default amountInputStyles;
