import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const ipayAccountBalanceStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural4,
      borderRadius: scaleSize(16),
      borderWidth: 1,
      borderColor: colors.natural.natural0,
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScale(16),
    },
    textContainer: {
      gap: moderateScale(2),
    },
    textColor: {
      color: colors.natural.natural900,
    },
    balanceContainer: {
      flexDirection: 'row',
      gap: moderateScale(4),
    },
    buttonStyle: {
      minHeight: moderateScale(34),
      width: moderateScale(99),
      height: 'auto',
      borderWidth: 1,
      borderColor: colors.primary.primary500,
      borderRadius: moderateScale(12),
      justifyContent: 'center',
    },
  });

export default ipayAccountBalanceStyles;
