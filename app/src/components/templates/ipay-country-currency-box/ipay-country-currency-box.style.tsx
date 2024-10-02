import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const countryCurrencyStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    conversionContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: moderateScale(28),
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(24),
      alignItems: 'center',
    },
    pointsAmountConversion: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      gap: moderateScale(24),
    },
    switchConversion: {
      flexDirection: 'row-reverse',
    },
    amountInputLabel: {
      marginBottom: moderateScale(3),
    },
    amountInput: {
      flexDirection: 'row',
      width: scaleSize(60),
      justifyContent: 'center',
      alignItems: 'center',
      height: verticalScale(37),
    },
    inputTextAmount: {
      color: themeColors.natural.natural300,
      fontSize: moderateScale(20),
      fontWeight: FONT_WEIGHT_BOLD,
      minWidth: scaleSize(20),
    },
    currencyText: {
      color: themeColors.natural.natural300,
    },
    gradientDivider: {
      height: verticalScale(1),
      flex: 0,
      marginTop: moderateScale(20),
      width: scaleSize(270),
      marginBottom: moderateScale(20),
    },
    gradientLine: {
      height: verticalScale(1),
      transform: [{ rotate: '90deg' }],
      flex: 0,
      width: scaleSize(60),
    },
    gradientBox: {
      flex: 0,
      marginTop: moderateScale(12),
      padding: 1,
      borderRadius: moderateScale(28),
    },
    revertCycleIcon: {
      alignItems: 'center',
      position: 'absolute',
      bottom: moderateScale(-13),
      left: scaleSize(17),
      backgroundColor: themeColors.natural.natural0,
      padding: moderateScale(5),
    },
    textPoint: {
      marginRight: moderateScale(2),
    },
    chipStyle: {
      backgroundColor: themeColors.natural.natural100,
      borderRadius: moderateScale(4),
    },
    rightBalanceWrapper: {
      flexDirection: 'row',
      gap: moderateScale(2),
    },
    checkIconBalanceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(12),
    },
    balance: {
      marginTop: moderateScale(4),
    },
    bankImg: {
      width: scaleSize(24),
      height: verticalScale(24),
      resizeMode: 'contain',
    },
    bankNameWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    converterMainWrapper: {
      gap: moderateScale(10),
    },
    converterBalanceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: moderateScale(12),
    },
    chipWrapper: {
      flexDirection: 'row',
      gap: moderateScale(2),
      alignItems: 'center',
    },
    darkStyle: {
      color: themeColors.primary.primary900,
    },
    sendInputWrapper: {
      width: '36%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    width50: {
      width: '50%',
    },
    receiveInputWrapper: {
      width: '40%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    switchIconWrapper: {
      position: 'absolute',
      top: '50%',
      left: '36%',
      zIndex: 1,
    },
  });

export default countryCurrencyStyles;
