import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const beneficiaryTransferStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24),
      marginBottom: verticalScale(12),
      gap: moderateScale(4),
    },
    cancelBtn: {
      borderWidth: 0,
    },

    chipHeading: { marginHorizontal: moderateScale(4), width: '90%' },
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
    heading: {
      textAlign: 'center',
      color: theme.primary.primary900,
    },
    caption: {
      textAlign: 'center',
      color: theme.primary.primary800,
    },
    logoStyles: {
      width: moderateScale(40),
      height: verticalScale(40),
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: verticalScale(24),
    },
    innerContainer: {
      paddingVertical: verticalScale(8),
      gap: moderateScale(8),
    },
    disabledInput: {
      borderWidth: 0,
    },
  });

export default beneficiaryTransferStyles;
