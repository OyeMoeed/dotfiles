import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  mainContainer: {
    flex: 1,
  },
  itemSeparator: {},
  errorMessage: {
    padding: moderateScale(20, 0.3),
  },
});

export default styles;
