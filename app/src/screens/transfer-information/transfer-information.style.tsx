import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const transferInformationStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(24, 0.3),
    },
    bankDetailsView: {
      flex: 1,
    },
    nextBtn: {
      marginBottom: moderateScale(18),
    },
    transferContainer: { marginTop: moderateScale(4) },
    topUpBtnStyle: {
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateScale(7),
      height: 'auto',
      borderRadius: moderateScale(12),
    },
    inputFieldStyle: {
      borderRadius: moderateScale(16),
    },
  });

export default transferInformationStyles;
