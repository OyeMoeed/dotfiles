import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale } from 'react-native-size-matters';

const billPaymentStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingBottom: moderateScale(12),
    },
    listBottomView: {
      marginVertical: moderateScale(12),
    },
    innerContainer: { marginHorizontal: moderateScale(24), marginTop: moderateScale(12), flex: 1 },
    margins: {
      margin: moderateScale(24),
      marginVertical: moderateScale(0),
    },
    toastContainerStyle: {
      margin: 0,
      bottom: isIosOS ? moderateScale(120) : moderateScale(45),
    },
    headingContainerStyle: {
      width: 'auto',
      paddingHorizontal: 0,
    },
    otpContainerStyle: {
      width: '100%',
      paddingHorizontal: moderateScale(8),
    },
    otpInnerContainer: {
      paddingHorizontal: moderateScale(24),
    },
  });
export default billPaymentStyles;
