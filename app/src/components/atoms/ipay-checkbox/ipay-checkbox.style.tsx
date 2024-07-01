import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    width: moderateScale(24),
    height: moderateScale(24),
    padding: moderateScale(6, 0.3),
    borderRadius: moderateScale(100),
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(12),
    height: verticalScale(12),
  },
});

export default styles;
