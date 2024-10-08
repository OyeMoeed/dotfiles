import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scale } from 'react-native-size-matters';

const styles = (space?: number) =>
  createStyleSheet({
    container: {
      flex: 1,
      flexDirection: 'row',
      gap: scale(10),
    },
    mainContainer: {
      gap: space || 0,
      height: '100%',
    },
  });

export default styles;
