import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const replaceCardSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginTop: verticalScale(16),
      paddingHorizontal: moderateScale(20),
      marginBottom: scaleSize(20),
    },
    bottomButtonContainer: {
      gap: verticalScale(12),
      marginBottom: verticalScale(24),
    },
    descriptionBoxContainer: {
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(20),
      marginBottom: verticalScale(30),
      gap: moderateScale(12),
      paddingVertical: verticalScale(22),
      paddingHorizontal: scaleSize(16),
      alignItems: 'center',
    },
    captionTextContainer: {
      flex: 1,
    },
  });

export default replaceCardSuccessStyles;
