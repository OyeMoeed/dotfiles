import { fonts, typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const genratedStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    parentContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    childContainer: {
      width: '100%',
      borderRadius: scaleSize(48),
      backgroundColor: colors.natural.natural50,
      marginTop: verticalScale(16),
      paddingHorizontal: moderateScale(20),
    },
    successContainer: {
      flex: 0,
      marginTop: verticalScale(40),
    },
    successIcon: {
      height: verticalScale(120),
      width: scaleSize(120),
    },
    descriptionStyle: {
      marginTop: verticalScale(12),
    },
    buttonContainer: {
      marginBottom: verticalScale(60),
      marginTop: verticalScale(24),
    },
  });
