import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { typography } from '../ipay-text/utilities/typography-helper.util';

const headingTextStyles = (colors: any) =>
  createStyleSheet({
    container: {},
    heading: {
      color: colors.primary.primary900,
      fontSize: typography.FONT_VARIANTS.TITLE2.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.TITLE2.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.TITLE2.LETTER_SPACING,
      textAlign: 'center',
    },
    subHeading: {
      marginTop: spacing.SCALE_4,
      color: colors.primary.primary800,
      fontSize: typography.FONT_VARIANTS.CAPTION1.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.CAPTION1.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.CAPTION1.LETTER_SPACING,
      textAlign: 'center',
    },
  });

export default headingTextStyles;
