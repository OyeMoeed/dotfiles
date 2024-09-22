import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const billPaymentStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingBottom: moderateScale(36),
    },
    listBottomView: {
      marginVertical: moderateScale(12),
    },
    innerContainer: { marginHorizontal: moderateScale(24), marginTop: moderateScale(12), flex: 1 },
    margins: {
      margin: moderateScale(24),
      marginVertical: moderateScale(0),
    },
    payBtn: {
      height: moderateScale(50, 0.3),
      paddingVertical: moderateScale(14, 0.3),
    },
    topUpButton: {
      height: moderateScale(34, 0.3),
      borderRadius: moderateScale(12, 0.3),
    },
    toastContainerStyle: {
      margin: 0,
      bottom: moderateScale(45),
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
    footerContainer: {
      paddingTop: moderateScale(12, 0.3),
      marginBottom: moderateScale(6, 0.3),
    },
  });
export default billPaymentStyles;
