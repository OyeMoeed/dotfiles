import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moiPaymentRefundStyls = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(16, 0.3),
    },
    footerView: {
      marginHorizontal: moderateScale(24, 0.3),
      marginBottom: moderateScale(35, 0.3),
    },
    sadadFooterGradient: {
      backgroundColor: 'transparent',
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
  });

export default moiPaymentRefundStyls;
