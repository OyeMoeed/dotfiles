import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { typography } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const topUpBoxStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      paddingVertical: moderateScale(10),
    },
    accountBalanceView: {
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(16),
      backgroundColor: themeColors.natural.natural5,
      borderColor: themeColors.natural.natural0,
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(18),
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
      marginLeft: moderateScale(3),
      alignSelf: 'flex-end',
    },
    btnStyle: {
      minHeight: verticalScale(34),
      width: scale(99),
      height: 'auto',
      justifyContent: 'center',
    },
    gap: {
      marginTop: moderateScale(14),
    },
    lineBorderStyle: {
      borderWidth: 1,
      borderColor: themeColors.secondary.secondary100,
      width: '100%',
      marginVertical: verticalScale(16),
    },
    balanceTextStyle: {
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
    },
    remainingBalanceView: {
      flexDirection: 'row',
    },
    nearestAtmView: {
      marginTop: moderateScale(24),
    },
    topUpButtonStyle: {
      borderWidth: 1,
      borderRadius: moderateScale(12),
      paddingVertical: moderateScale(7),
      paddingHorizontal: moderateScale(12),
    },
  });
export default topUpBoxStyles;
