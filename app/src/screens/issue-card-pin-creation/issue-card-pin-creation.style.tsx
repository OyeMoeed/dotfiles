import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale } from 'react-native-size-matters';

const issueCardPinCreationStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(12),
    },
    lockIconView: {
      marginTop: moderateScale(20),
      marginBottom: moderateScale(16),
      alignSelf: 'center',
      width: moderateScale(40),
      height: moderateScale(40),
    },
    headingView: {
      marginBottom: moderateScale(48),
    },
    toast: {
      bottom: isIosOS ? scaleSize(80) : scaleSize(24),
      borderRadius: scaleSize(12),
    },
    pincodeViewContainer: {
      flex: 1,
    },
  });

export default issueCardPinCreationStyles;
