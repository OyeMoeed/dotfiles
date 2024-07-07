import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_17, FONT_SIZE_20, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { verticalScale } from 'react-native-size-matters';

const pointRedemption = (color: typeof themeColors, amountLength: number) =>
  createStyleSheet({
    container: { flex: 1 },
    pointsRedemptionContainer: { flex: 1, paddingHorizontal: scaleSize(24) },
    totalAmount: {
      fontWeight: FONT_WEIGHT_BOLD,
    },
    pointsConversionDetail: {
      marginTop: scaleSize(42),
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: scaleSize(24),
    },
    pointsAmountConversion: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scaleSize(32),
    },
    amountInputLabel: {
      marginBottom: scaleSize(8),
    },
    amountInput: { flexDirection: 'row', alignItems: 'center', width: scaleSize(60) },
    gradientLine: { height: 2, transform: [{ rotate: '90deg' }], flex: 0, width: scaleSize(70) },
    revertCycleIcon: {
      alignItems: 'center',
      position: 'absolute',
      bottom: scaleSize(-15),
      left: scaleSize(20),
      backgroundColor: color.natural.natural0,
      padding: scaleSize(5),
    },
    checkmarkPoints: {
      backgroundColor: color.backgrounds.greyOverlay,
      flexDirection: 'row',
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(8),
      alignItems: 'center',
      gap: scaleSize(16),
      width: '100%',
      marginBottom: scaleSize(16),
    },
    topUpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: scaleSize(8),
    },
    progressBar: {
      width: '80%',
      marginVertical: scaleSize(16),
    },
    conversionContainer: {
      backgroundColor: color.natural.natural0,
      borderRadius: scaleSize(28),
      padding: scaleSize(24),
      alignItems: 'center',
    },
    gradientBarStyle: {
      width: scaleSize(16),
      maxHeight: verticalScale(2),
      marginVertical: verticalScale(2),
    },
    currencyText: {
      fontSize: FONT_SIZE_17,
      color: color.natural.natural300,
    },
    textAmount: {
      color: color.natural.natural300,
      fontSize: FONT_SIZE_20,
      fontWeight: FONT_WEIGHT_BOLD,
      marginRight: isIosOS || amountLength ? scaleSize(2) : scaleSize(-10),
    },
    textPoint: {
      marginRight: isIosOS || amountLength ? scaleSize(2) : scaleSize(-6),
    },
    chipContainer: {
      width: '100%',
      marginBottom: scaleSize(8),
    },
    redeemPointText: { color: color.primary.primary900 },
    redeemButton: {
      backgroundColor: amountLength ? color.primary.primary500 : color.natural.natural200,
      marginVertical: verticalScale(24),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(14),
      borderRadius: scaleSize(16),
    },
    notEnrolled: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: scaleSize(32),
      gap: scaleSize(12),
    },
    notEnrolledText: {
      marginVertical: scaleSize(8),
      color: color.primary.primary900,
      fontWeight: FONT_WEIGHT_BOLD,
      textAlign: 'center',
    },
    notEnrolledSubtitle: {
      alignItems: 'center',
      textAlign: 'center',
      color: color.primary.primary800,
    },
  });

export default pointRedemption;
