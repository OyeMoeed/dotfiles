import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  mainContainer: {
    flex: 1,
  },
  footer: {
    paddingVertical: verticalScale(18),
  },
  errorMessage: {
    padding: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
