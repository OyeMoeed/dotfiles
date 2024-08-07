import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayAccountBalanceStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(16),
      borderColor: themeColors.natural.natural0,
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(18),
      marginBottom: verticalScale(12),
    },
    accountBalanceView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textStyle: {
      marginRight: moderateScale(8),
      color: themeColors.natural.natural700,
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    balanceContainer: {
      flexDirection: 'row',
    },
    currencyStyle: {
      alignSelf: 'flex-end',
    },
    btnStyle: {
      minHeight: moderateScale(34),
      width: moderateScale(99),
      height: 'auto',
      justifyContent: 'center',
    },
    gap: {
      marginTop: moderateScale(12),
    },
    lineBorderStyle: {
      borderWidth: 1,
      borderColor: themeColors.secondary.secondary100,
      width: '100%',
      marginVertical: verticalScale(16),
    },
    balanceTextStyle: {
      fontWeight: '900',
    },
    remainingBalanceView: {
      flexDirection: 'row',
    },
  });

export default ipayAccountBalanceStyles;
