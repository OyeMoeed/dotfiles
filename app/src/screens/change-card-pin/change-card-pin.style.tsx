import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const changeCardPinStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(8),
    },
    lockIconView: {
      marginTop: moderateScale(20),
      marginBottom: moderateScale(12),
      alignSelf: 'center',
    },
    headingView: {
      marginBottom: moderateScale(47),
    },
    toast: {
      bottom: isIosOS ? verticalScale(80) : verticalScale(24),
    },
    pincodeViewContainer: {
      flex: 1,
    },
    headingContainerStyle: {
      gap: verticalScale(4),
    },
  });

export default changeCardPinStyles;
