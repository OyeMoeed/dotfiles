// common.styles.ts
import { typography } from '@app/components/atoms/text/utilities/typography-helper.util';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const commonStyles = createStyleSheet({
  subHeadlineText: {
    fontSize: typography.FONT_VARIANTS.SUB_HEADLINE.FONT_SIZE,
    lineHeight: typography.FONT_VARIANTS.SUB_HEADLINE.LINE_HEIGHT,
    letterSpacing: typography.FONT_VARIANTS.SUB_HEADLINE.LETTER_SPACING,
  },
});

export default commonStyles;
