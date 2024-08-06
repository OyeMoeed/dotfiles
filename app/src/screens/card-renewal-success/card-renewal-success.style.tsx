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
      marginBottom: verticalScale(50),
    },
    ipaySuccessContainer: {
      flex: 0,
    },
    printCardComponent: {
      paddingHorizontal: scaleSize(20),
      paddingVertical: verticalScale(16),
    },
  });

export default cardRenewalSuccessStyles;
