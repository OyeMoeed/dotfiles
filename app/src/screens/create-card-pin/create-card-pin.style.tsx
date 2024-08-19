import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const createCardPinStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(12),
    },
    headingView: {
      marginBottom: moderateScale(30),
    },
    toast: {
      bottom: isIosOS ? verticalScale(80) : verticalScale(24),
    },
    pincodeViewContainer: {
      flex: 1,
    },
    lockIconView: {
      marginBottom: moderateScale(8),
      alignSelf: 'center',
      width: moderateScale(40),
      height: moderateScale(40),
    },
  });

export default createCardPinStyles;
