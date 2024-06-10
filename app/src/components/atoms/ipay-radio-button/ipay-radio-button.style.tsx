import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';

const radioButtonStyles = (colors: any) =>
  createStyleSheet({
    image: {
      width: spacing.SCALE_24,
      height: spacing.SCALE_24,
    },
  });

export default radioButtonStyles;