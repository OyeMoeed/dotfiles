import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const beneficiaryTransferStyles = (theme: typeof colors) =>
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
    inputContainerStyle: {
      width: '100%',
      paddingLeft: moderateScale(20),
      paddingRight: moderateScale(40),
      backgroundColor: theme.natural.natural0,
      borderColor: theme.primary.primary100,
    },
  });

export default beneficiaryTransferStyles;
