import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const addSadadBillStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    contentContainer: {
      paddingHorizontal: scaleFont(24),
      marginTop: scaleFont(24),
      gap: scaleFont(16),
      paddingBottom: scaleFont(20),
    },
    sheetContainer: {
      paddingHorizontal: scaleFont(20),
      maxHeight: verticalScale(80),
    },
    searchInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInputStyle: {
      height: verticalScale(36),
      borderRadius: scaleFont(12),
      backgroundColor: themeColors.natural.natural0,
    },
    clearInput: {
      width: moderateScale(267, 0.3),
    },
    inputStyle: {
      height: verticalScale(36),
    },
    listImg: {
      height: verticalScale(24),
      width: scaleSize(24),
      resizeMode: 'contain',
    },
    headerText: {
      textTransform: 'none',
    },
    invoiceSheetContentWrapper: {
      gap: scaleFont(16),
      alignItems: 'center',
      paddingHorizontal: scaleFont(24),
      marginTop: scaleFont(12),
    },
    textWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: scaleFont(8),
    },
    darkColor: {
      color: themeColors.primary.primary900,
    },
    messageText: {
      color: themeColors.primary.primary800,
      textAlign: 'center',
    },
    tryAgainBtn: {
      minWidth: '100%',
      marginTop: scaleFont(16),
      height: verticalScale(50),
      justifyContent: 'center',
    },
    noRecordContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: scaleFont(100),
    },
    noRecordWrapper: {
      gap: scaleFont(12),
      width: scaleSize(150),
    },
    sheetHeader: {
      borderRadius: scaleFont(28),
    },
    sheetBackground: {
      backgroundColor: themeColors.primary.primary10,
      borderRadius: scaleFont(28),
    },
    bottomSheetContainer: {
      paddingBottom: verticalScale(80),
    },
    categoryTabView: {
      height: verticalScale(24),
      paddingHorizontal: moderateScale(12, 0.3),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateScale(8),
      backgroundColor: themeColors.natural.natural0,
      marginTop: verticalScale(8),
    },
    categoryTabCViewConditional: {
      backgroundColor: themeColors.primary.primary500,
    },
    categoryItemSeparatorStyle: {
      width: moderateScale(8, 0.3),
    },
  });

export default addSadadBillStyles;
