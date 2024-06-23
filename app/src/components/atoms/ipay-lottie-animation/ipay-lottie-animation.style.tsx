import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';

const lottieStyles = () =>
  createStyleSheet({
    imgStyle: {
      width: spacing.CUSTOME_SCALE(140),
      height: spacing.CUSTOME_SCALE(140),
    },
  });

export default lottieStyles;
