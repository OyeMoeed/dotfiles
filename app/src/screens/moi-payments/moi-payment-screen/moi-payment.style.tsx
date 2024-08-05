import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const moiPaymentStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(6, 0.3),
    },
    contentContainer: {
      marginTop: scaleFont(24),
      gap: scaleFont(16),
    },
    searchInputStyle: {
      backgroundColor: '#fff',
      margin: moderateScale(16, 0.3),
      width: moderateScale(345, 0.3),
      height: verticalScale(40),
      borderRadius: moderateScale(12),
    },
    sheetHeader: {
      borderTopRightRadius: scaleFont(28),
      borderTopLeftRadius: scaleFont(28),
      width: '100%',
    },
    sheetBackground: {
      backgroundColor: themeColors.primary.primary10,
      borderRadius: scaleFont(28),
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

export default moiPaymentStyles;
