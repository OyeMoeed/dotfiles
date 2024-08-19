import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const addAppleWalletStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    addedAppleWalletWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scaleFont(8),
      height: verticalScale(35),
    },

    appleWalletTextWrapper: {
      gap: scaleFont(2),
    },

    addedText: {
      alignSelf: 'flex-end',
    },

    applePay: {
      alignItems: 'center',
      borderColor: themeColors.natural.natural900,
      borderRadius: 4,
      borderWidth: 2,
      flexDirection: 'row',
      height: verticalScale(24),
      justifyContent: 'center',
      padding: scaleFont(6),
    },

    appleWalletImg: {
      height: verticalScale(35),
      resizeMode: 'contain',
      width: scaleSize(110),
    },
  });

export default addAppleWalletStyles;
