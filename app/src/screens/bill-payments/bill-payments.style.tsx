import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const billPaymentsStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(16, 0.3),
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
      height: verticalScale(34),
      paddingVertical: moderateScale(7, 0.3),
      marginTop: moderateScale(8, 0.3),
    },
    contentContainer: {
      flex: 1,
    },
  });

export default billPaymentsStyles;
