import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const requestListStyles = createStyleSheet({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: moderateScale(24),
  },
  sectionContainer: {
    marginBottom: moderateScale(12),
  },
  sectionHeader: {
    marginBottom: verticalScale(12),
  },
});

export default requestListStyles;
