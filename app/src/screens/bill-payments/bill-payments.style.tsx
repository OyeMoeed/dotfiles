import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const billPaymentsStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(16, 0.3),
      marginBottom: moderateScale(26),
    },
    headerStyles: {
      marginVertical: moderateScale(8, 0.3),
    },
    listView: {
      flex: 1,
    },
    itemSeparatorStyle: {
      height: moderateScale(8),
    },
    addNewBillBtn: {
      width: '100%',
      height: 'auto',
      paddingVertical: moderateScale(7, 0.3),
      paddingHorizontal: moderateScale(14),
      marginTop: moderateScale(8, 0.3),
      borderRadius: moderateScale(12),
      borderWidth: 1.1,
    },
    contentContainer: {
      flex: 1,
    },
  });

export default billPaymentsStyles;
