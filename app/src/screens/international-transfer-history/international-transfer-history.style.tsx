import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationalTrHistoryStyles = (themeColors: typeof colors) =>
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
      paddingVertical: verticalScale(7),
      paddingEnd: moderateScale(18, 0.3),
    },
    actionSheetView: {
      marginBottom: verticalScale(22),
    },
    actionSheetBtn: {
      height: moderateScale(48, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      marginTop: moderateScale(16, 0.3),
      borderRadius: moderateScale(12),
    },
  });

export default internationalTrHistoryStyles;
