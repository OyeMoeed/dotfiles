import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayRemainingAccountBalanceStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    cardContainer: {
      padding: moderateScale(32, 0.4),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(28),
      alignItems: 'center',
    },
    chipContainer: {
      alignSelf: 'center',
    },
    topUpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: scaleSize(8),
    },
    amountValues: {
      flexDirection: 'row',
    },
    textAmount: {
      color: colors.natural.natural300,
    },
    naturalStyles: {
      color: colors.natural.natural700,
    },
    progressStyles: {
      marginTop: verticalScale(16),
    },
    buttonBg: {
      minWidth: scaleSize(80),
      backgroundColor: colors.secondary.secondary100,
      paddingVertical: scaleSize(8),
      borderRadius: scaleSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: moderateScale(8),
      marginTop: moderateScale(24, 0.3),
    },
    scanBtn: {
      width: '100%',
      marginTop: verticalScale(24),
    },
  });
export default ipayRemainingAccountBalanceStyles;
