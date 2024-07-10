import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const issueCardPinCreationStyles = (theme: any) =>
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
      marginBottom: verticalScale(40),
    },
    pincodeViewContainer: {
      flex: 1,
    },
  });

export default issueCardPinCreationStyles;
