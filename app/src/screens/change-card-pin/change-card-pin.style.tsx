import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const changeCardPinStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(12),
    },
    lockIconView: {
      marginTop: moderateScale(20),
      marginBottom: moderateScale(8),
      alignSelf: 'center',
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
  });

export default changeCardPinStyles;
