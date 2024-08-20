import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_11, FONT_SIZE_15, typography } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const atmWithdrawalsStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(18),
    },
    accountBalanceView: {
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(16),
      borderColor: colors.natural.natural0,
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(18),
      marginBottom: verticalScale(12),
    },
    cancelButtonStyle: {
      marginLeft: moderateScale(-6),
    },
    textStyle: {
      marginRight: moderateScale(8),
      color: colors.natural.natural700,
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textBold: {
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
    },
    balanceContainer: {
      flexDirection: 'row',
      gap: moderateScale(5),
    },
    accountBalanceTitle: {
      fontWeight: typography.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_11,
    },
    currencyStyle: {
      alignSelf: 'center',
      fontWeight: typography.FONT_WEIGHT_NORMAL,
      color: colors.primary.primary900,
      fontSize: FONT_SIZE_15,
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
      borderColor: colors.secondary.secondary100,
      width: '100%',
      marginVertical: verticalScale(16),
    },
    balanceTextStyle: {
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
      color: colors.primary.primary900,
      fontSize: FONT_SIZE_15,
    },
    remainingBalanceView: {
      flexDirection: 'row',
    },
    nearestAtmView: {
      marginTop: verticalScale(10),
      marginBottom: verticalScale(40),
    },
    titleStyle: { textTransform: 'none' },
    topUpBtn: {
      borderRadius: moderateScale(12),
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateScale(7),
    },
  });

export default atmWithdrawalsStyles;
