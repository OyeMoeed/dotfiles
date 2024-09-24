import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const billPaymentStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingBottom: moderateScale(24),
    },
    innerContainer: { margin: moderateScale(24), flex: 1 },
    margins: {
      margin: moderateScale(24),
      marginVertical: moderateScale(0),
    },
    consditioanlFooterStyle: {
      height: verticalScale(162),
    },
    darkBlueText: {
      color: themeColors.primary.primary900,
    },
    accountBalance: {
      backgroundColor: themeColors.natural.natural3,
    },
    greyText: {
      color: themeColors.natural.natural700,
    },
    sheetHeader: {
      borderRadius: moderateScale(28),
    },
    sheetBackground: {
      backgroundColor: themeColors.primary.primary10,
      borderRadius: moderateScale(28),
    },
    darkText: {
      color: themeColors.natural.natural900,
    },
    contentContainerStyle: {
      gap: verticalScale(20),
    },
  });
export default billPaymentStyles;
