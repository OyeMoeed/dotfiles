import createStyleSheet from '@app/styles/scaled-sheet.styles';

import { typography } from '../utilities/typography-helper.util';

// Then use these styles within your component
const styles = createStyleSheet({
  textStyle: {
    fontSize: typography.FONT_VARIANTS.SUB_HEADLINE.FONT_SIZE,
    lineHeight: typography.FONT_VARIANTS.SUB_HEADLINE.LINE_HEIGHT,
    letterSpacing: typography.FONT_VARIANTS.SUB_HEADLINE.LETTER_SPACING
  }
});

export default styles;
