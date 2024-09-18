import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const moiPaymentStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    dynamicFieldContainer: {
      flex: 1,
    },
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(6, 0.3),
    },
    contentContainer: {
      marginTop: scaleFont(16),
      gap: scaleFont(16),
      flex: 1,
    },
    searchInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
    },
    searchInputStyle: {
      backgroundColor: '#fff',
      marginVertical: moderateScale(16, 0.3),
      minWidth: '100%',
      height: verticalScale(36),
      borderRadius: moderateScale(12),
    },
    inputStyle: {
      height: verticalScale(36),
      minWidth: '100%',
    },
    sheetHeader: {
      borderTopRightRadius: scaleFont(28),
      borderTopLeftRadius: scaleFont(28),
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
    listStyles: {
      marginHorizontal: moderateScale(24, 0.3),
    },
    inquiryBtn: {
      marginTop: 17,
    },
  });

export default moiPaymentStyles;
