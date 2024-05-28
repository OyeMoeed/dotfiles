import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.styles';

const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childContainer: {
    marginStart: spacing.SCALE_12,
  },
  heading: {},
  text: {},
});

export default styles;
