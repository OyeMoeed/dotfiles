import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const stepIndicatorStyles = (colors: any) =>
  createStyleSheet({
    // Step indicator styles
    filled: {
      backgroundColor: colors.natural.natural900,
      width: scaleSize(20),
    },
    filled1: {
      backgroundColor: colors.natural.natural900,
      width: scaleSize(8),
      opacity: 0.5,
    },
    filledParent: {
      flexDirection: 'row',
      gap: 4,
    },
    filledLayout: {
      height: scaleSize(3),
      borderRadius: scaleSize(999),
    },
    absoulteStyle: { position: 'absolute' },
    lowOpacity: { opacity: 0.2 },
  });

export default stepIndicatorStyles;
