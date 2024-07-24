import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const countryCurrencyStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    conversionContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(28),
      paddingVertical: scaleFont(12),
      paddingHorizontal: scaleFont(24),
      alignItems: 'center',
      marginTop: scaleFont(12),
    },
    pointsAmountConversion: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scaleFont(15),
      justifyContent: 'center',
    },
    amountInputLabel: {
      marginBottom: scaleSize(5),
    },
    amountInput: {
      flexDirection: 'row',
      width: scaleSize(60),
    },
    inputTextAmount: {
      color: themeColors.natural.natural300,
      fontSize: scaleFont(20),
      fontWeight: FONT_WEIGHT_BOLD,
    },
    currencyText: {
      color: themeColors.natural.natural300,
      marginTop: scaleFont(12),
    },
    gradientDivider: {
      height: verticalScale(2),
      flex: 0,
      marginTop: scaleFont(20),
      width: scaleSize(270),
      marginBottom: scaleFont(20),
    },
    gradientLine: {
      height: verticalScale(2),
      transform: [{ rotate: '90deg' }],
      flex: 0,
      width: scaleSize(70),
    },
    revertCycleIcon: {
      alignItems: 'center',
      position: 'absolute',
      bottom: scaleSize(-12),
      left: scaleSize(22),
      backgroundColor: themeColors.natural.natural0,
      padding: scaleSize(5),
    },
    textPoint: {
      marginRight: scaleSize(2),
    },
    chipStyle: {
      backgroundColor: themeColors.natural.natural100,
      borderRadius: scaleFont(4),
    },
    rightBalanceWrapper: {
      flexDirection: 'row',
      gap: scaleFont(2),
    },
    checkIconBalanceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleFont(12),
    },
    balance: {
      marginTop: scaleFont(4),
    },
    bankImg: {
      width: scaleSize(24),
      height: verticalScale(24),
      resizeMode: 'contain',
    },
    bankNameWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleFont(8),
    },
    converterMainWrapper: {
      gap: scaleFont(10),
    },
    converterBalanceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: scaleFont(12),
    },
    chipWrapper: {
      flexDirection: 'row',
      gap: scaleFont(2),
      alignItems: 'center',
    },
    darkStyle: {
      color: themeColors.primary.primary900,
    },
  });

export default countryCurrencyStyles;
