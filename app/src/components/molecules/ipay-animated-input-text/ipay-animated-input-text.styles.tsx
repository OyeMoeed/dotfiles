import { fonts, typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';

const inputFieldStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    input: {
      height: verticalScale(40),
      fontSize: typography.FONT_VARIANTS.SUB_HEADLINE.FONT_SIZE,
      letterSpacing: typography.FONT_VARIANTS.SUB_HEADLINE.LETTER_SPACING,
      fontFamily: fonts.REGULAR,
      color: colors.natural.natural900,
      top: scaleFont(10),
    },
    errorTextView: {
      width:'70%'
    },
    inputLineHeight: {
      lineHeight: typography.FONT_VARIANTS.SUB_HEADLINE.LINE_HEIGHT,
    },
    container: {
      height: verticalScale(50),
      borderRadius: scaleFont(16),
      borderWidth: scaleFont(1),
      borderColor: colors.primary.primary100,
      paddingHorizontal: scaleFont(20, 0.3),
      paddingVertical: scaleFont(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: colors.natural.natural0,
    },
    label: {
      color: colors.primary.primary600,
    },
    iconAndInputStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleFont(8),
    },
    textInputStyle: {
      color: colors.natural.natural900,
    },
    outerView: {
      flex: 1,
    },
    errorContainer: {
      borderColor: colors.error.error500,
    },
    focusedContainer: {
      borderColor: colors.primary.primary500,
    },
    disabledContainer: {
      backgroundColor: colors.natural.natural200,
      borderColor: colors.natural.natural200,
    },
    outerWrapper: {
      gap: scaleFont(8),
    },
    disableLabel: {
      color: colors.natural.natural500,
    },
    errorAssistiveTextText: {
      color: colors.error.error500,
      marginTop: scaleFont(6),
      // width: scaleSize(140),
    },
    assistiveText: {
      color: colors.natural.natural500,
    },

    closeIcon: {
      backgroundColor: 'transparent',
      paddingVertical: scaleFont(10),
      paddingLeft: scaleFont(10),
    },
  });

export default inputFieldStyles;
