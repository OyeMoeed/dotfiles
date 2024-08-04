import colors from '@app/styles/colors.const';

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const trafficPaymentStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(18, 0.3),
      marginTop: moderateScale(12, 0.3),
    },
    contentContainer: {
      marginTop: verticalScale(18),
      gap: moderateScale(16),
    },
    searchInputStyle: {
      backgroundColor: '#fff',
      margin: moderateScale(16, 0.3),
      width: moderateScale(345, 0.3),
      height: verticalScale(40),
      borderRadius: moderateScale(12),
    },
    sheetHeader: {
      borderTopRightRadius: moderateScale(28),
      borderTopLeftRadius: moderateScale(28),
      width: '100%',
    },
    sheetBackground: {
      backgroundColor: themeColors.primary.primary10,
      borderRadius: moderateScale(28),
    },
    noRecordContainer: {
      flex: 0.85,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconView: {
      marginBottom: moderateScale(12, 0.3),
    },
    bottomSheetView: {
      paddingBottom: moderateScale(24, 0.3),
    },
  });

export default trafficPaymentStyles;
