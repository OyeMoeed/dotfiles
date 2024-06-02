import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { typography } from '../utilities/typography-helper.util';

// Then use these styles within your component
const styles = createStyleSheet({
  textStyle: {
    fontSize: typography.FONT_VARIANTS.FOOTNOTE.FONT_SIZE,
    lineHeight: typography.FONT_VARIANTS.FOOTNOTE.LINE_HEIGHT,
    letterSpacing: typography.FONT_VARIANTS.FOOTNOTE.LETTER_SPACING,
  },
});

export default styles;
