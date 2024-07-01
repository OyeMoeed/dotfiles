import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    height: verticalScale(5),
    borderRadius: moderateScale(5),
    backgroundColor: colors.tertiary.tertiary50,
    overflow: 'hidden',
    width: '100%'
  },
  progress: {
    height: '100%',
    borderRadius: moderateScale(5)
  },
  reverseStyle: {
    alignSelf: 'flex-end'
  },
  containerExpired: {
    backgroundColor: colors.error.error25
  }
});

export default styles;
