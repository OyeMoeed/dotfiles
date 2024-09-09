import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
const styles = (colors: any) =>
  createStyleSheet({
    cancelButtonText: {
      color: colors.primary.primary500,
    },
    container: {
      paddingHorizontal: scaleSize(0),
      justifyContent: 'center',
      gap: scaleSize(30),
      width: '85%',
    },
    topAlign: { alignItems: 'center', justifyContent: 'center', gap: scaleSize(8) },
    bottomAlign: {
      gap: scaleSize(8),
    },
    weights: { fontWeight: '700' },
  });

export default styles;
