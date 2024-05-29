import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { typography } from '../ipay-text/utilities/typography-helper.util';

const titleAssistiveStyles = (colors: any) =>
  createStyleSheet({
    container: {
      marginStart: spacing.SCALE_12,
    },
    heading: {
      color: colors.primary.primary900,
      fontSize: typography.FONT_VARIANTS.FOOTNOTE.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.FOOTNOTE.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.FOOTNOTE.LETTER_SPACING,
      fontFamily: typography.FONT_FAMILY.REGULAR,
    },
    subHeading: {
      color: colors.natural.natural900,
      fontSize: typography.FONT_VARIANTS.CAPTION1.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.CAPTION1.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.CAPTION1.LETTER_SPACING,
      fontFamily: typography.FONT_FAMILY.REGULAR,
    },
  });

export default titleAssistiveStyles;
