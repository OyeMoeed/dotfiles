import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_10 } from '@app/styles/spacing.const';
import { States } from '@app/utilities/enums.util';

// Function to determine background color based on the variant
const getBackgroundColor = (variant: States) =>
  variant === States.NATURAL ? colors.natural.natural200 : 'transparent';

const styles = (variant: States) =>
  createStyleSheet({
    container: {
      backgroundColor: getBackgroundColor(variant), // Dynamic background color
    },
    font: {
      color: colors.secondary.secondary500,
      padding: SCALE_10,
    },
  });

export default styles;
