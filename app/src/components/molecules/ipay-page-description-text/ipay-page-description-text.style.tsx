import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { typography } from '../../atoms/ipay-text/utilities/typography-helper.util';

const pageDescriptionTextStyles = (theme: any) =>
  createStyleSheet({
    container: {},
    heading: {
      color: theme.primary.primary900,
      fontSize: typography.FONT_VARIANTS.TITLE2.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.TITLE2.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.TITLE2.LETTER_SPACING,
      textAlign: 'center',
      fontWeight: FONT_WEIGHT_BOLD,
    },
    subHeading: {
      marginTop: spacing.SCALE_4,
      color: theme.primary.primary800,
      fontSize: typography.FONT_VARIANTS.CAPTION1.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.CAPTION1.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.CAPTION1.LETTER_SPACING,
      textAlign: 'center',
    },
    alignTextLeftStyle: {
      textAlign: 'left',
    },
  });

export default pageDescriptionTextStyles;
