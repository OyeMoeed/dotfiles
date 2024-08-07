import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationalTrHistoryStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      paddingTop: moderateScale(8, 0.3),
    },
    listContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: moderateScale(8, 0.3),
      paddingBottom: moderateScale(30),
    },
    transactionTab: {
      height: moderateScale(78, 0.3),
    },
    filterWrapper: {
      height: verticalScale(21),
      marginTop: moderateScale(16, 0.3),
    },
    filterItemSeparator: {
      width: moderateScale(8, 0.35),
    },
  });

export default internationalTrHistoryStyles;
