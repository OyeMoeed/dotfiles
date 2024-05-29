import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_2, SCALE_4 } from '@app/styles/spacing.const';

export const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: SCALE_2,
    color: '#000',
    fontSize: SCALE_4,
  },
});
