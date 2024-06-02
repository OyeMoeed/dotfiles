import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_10 } from '@app/styles/spacing.const';
import { variants } from '@app/utilities/enums.util';

// Function to determine background color based on the variant
const getBackgroundColor = (variant: variants) =>
  variant === variants.NATURAL ? colors.natural.natural200 : 'transparent';

const styles = (variant: variants) =>
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
