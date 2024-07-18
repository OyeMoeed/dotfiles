import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { scaleSize } from '@app/styles/mixins';
import themeColors from '@app/styles/theming/theme-colors';

const changePinSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginTop: verticalScale(16),
      paddingHorizontal: moderateScale(20),
    },
    bottomButtonContainer: {
      marginBottom: verticalScale(24),
    },
  });

export default changePinSuccessStyles;
