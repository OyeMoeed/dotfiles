import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { scaleSize } from '@app/styles/mixins';
import themeColors from '@app/styles/theming/theme-colors';

const changePinSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    childContainer: {
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginTop: verticalScale(16),
      paddingHorizontal: moderateScale(20),
      paddingVertical: verticalScale(54),
    },
    bottomButtonContainer: {
      marginBottom: verticalScale(24),
      marginTop: verticalScale(32),
    },
    cardStyle: {
      marginTop: verticalScale(20),
    },
    flexZero: {
      flex: 0,
    },
  });

export default changePinSuccessStyles;
