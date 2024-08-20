import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const beneficiaryTransferStyles = () =>
  createStyleSheet({
    container: {
      marginHorizontal: moderateScale(24),
    },
    btnStyles: {
      marginTop: verticalScale(10),
    },
    textStyle: {
      marginTop: verticalScale(10),
    },
  });

export default beneficiaryTransferStyles;
