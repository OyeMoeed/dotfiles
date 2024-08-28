import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moiPaymentConfirmationStyls = () =>
  createStyleSheet({
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(16, 0.3),
    },
    footerView: {
      marginHorizontal: moderateScale(24, 0.3),
      marginBottom: moderateScale(24, 0.3),
    },
    moiPaymentDetailesTab: {
      minWidth: '100%',
      minHeight: moderateScale(48),
      height: 'auto',
      borderRadius: moderateScale(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      marginTop: moderateScale(1),
    },
    sadadFooterGradient: {
      backgroundColor: 'transparent',
    },
    sadadBtn: {
      height: moderateScale(50, 0.3), 
      paddingVertical: moderateScale(14, 0.3),
    },
  });

export default moiPaymentConfirmationStyls;
