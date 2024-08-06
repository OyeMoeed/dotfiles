import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  mainContainer: {
    flex: 1,
  },
  footer: {
    paddingVertical: moderateScale(20, 0.3),
  },
  errorMessage: {
    padding: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
