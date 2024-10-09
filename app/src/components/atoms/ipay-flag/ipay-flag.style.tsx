import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
    borderRadius: scale(12),
    overflow: 'hidden',
  },
});

export default styles;
