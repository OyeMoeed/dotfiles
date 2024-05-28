import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { typography } from '../utilities/typography-helper.util';

// Then use these styles within your component
const styles = createStyleSheet({
  textStyle: {
    fontSize: typography.FONT_VARIANTS.CAPTION2.FONT_SIZE,
    lineHeight: typography.FONT_VARIANTS.CAPTION2.LINE_HEIGHT,
    letterSpacing: typography.FONT_VARIANTS.CAPTION2.LETTER_SPACING,
  },
});

export default styles;
