import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardRenewalSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginTop: verticalScale(16),
      paddingHorizontal: moderateScale(20),
      marginBottom: scaleSize(20),
      justifyContent: 'flex-end',
    },
    bottomButtonContainer: {
      gap: verticalScale(12),
      marginBottom: verticalScale(24),
      flexDirection: 'row',
    },
    flexStyle: {
      flex: 1,
    },
    printCardContainer: {
      marginBottom: verticalScale(30),
    },
    appleButtonContainer: {
      alignSelf: 'center',
      marginTop: verticalScale(2),
      marginBottom: verticalScale(48),
      height: verticalScale(40),
      justifyContent: 'center',
    },
    ipaySuccessContainer: {
      flex: 0,
    },
    printCardComponent: {
      paddingHorizontal: scaleSize(20),
      paddingVertical: verticalScale(16),
    },
    addedAppleWalletWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: moderateScale(8),
      height: verticalScale(35),
    },
    appleWalletTextWrapper: {
      gap: moderateScale(2),
    },
    addedText: {
      alignSelf: 'flex-end',
    },
    applePay: {
      alignItems: 'center',
      borderColor: themeColors.natural.natural900,
      borderRadius: scaleSize(4),
      borderWidth: 2,
      flexDirection: 'row',
      height: verticalScale(24),
      justifyContent: 'center',
      padding: scaleSize(6),
    },
  });

export default cardRenewalSuccessStyles;
