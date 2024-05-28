import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { typography } from '../utilities/typography-helper.util';

// Then use these styles within your component
const styles = createStyleSheet({
  textStyle: {
    fontSize: typography.FONT_VARIANTS.TITLE1.FONT_SIZE,
    lineHeight: typography.FONT_VARIANTS.TITLE1.LINE_HEIGHT,
    letterSpacing: typography.FONT_VARIANTS.TITLE1.LETTER_SPACING,
  },
});

export default styles;
