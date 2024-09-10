import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    width: scaleSize(24),
    height: verticalScale(24),
    resizeMode: 'contain',
  },
});

export default styles;
