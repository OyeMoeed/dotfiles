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
  rejectThisRequestBtn: {
    height: moderateScale(48, 0.3),
    alignItems: 'center',
    paddingVertical: moderateScale(0),
    justifyContent: 'center',
  },
  rejectThisRequestCancelBtn: {
    height: moderateScale(56, 0.3),
  },
});

export default requestListStyles;
