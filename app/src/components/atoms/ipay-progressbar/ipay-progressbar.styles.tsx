import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

export const styles = createStyleSheet({
  container: {
    height: 5,
    backgroundColor: colors.greenPalette.green25,
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
  progressBack: {
    backgroundColor: colors.greenPalette.green25,
  },
});
