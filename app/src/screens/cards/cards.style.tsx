import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    flex: 1,
    paddingTop: scaleFont(16),
  },
  cardsContainer: {
    alignItems: 'center',
  },
  topDetails: {
    paddingHorizontal: scaleFont(24),
    marginBottom: verticalScale(12),
  },
});

export default styles;
