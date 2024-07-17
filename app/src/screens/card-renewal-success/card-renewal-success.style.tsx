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
      marginBottom: verticalScale(30),
    },
  });

export default cardRenewalSuccessStyles;
