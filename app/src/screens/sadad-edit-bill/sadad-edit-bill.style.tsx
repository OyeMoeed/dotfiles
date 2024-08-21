import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sadadEditBillsStyles = (themeColors: typeof colors) =>
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
      minWidth: '100%',
      backgroundColor: themeColors.natural.natural0,
    },
    clearInput: {
      minWidth: scaleSize(250),
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
    greyInputStyle: {
      backgroundColor: themeColors.natural.natural200,
      paddingStart: moderateScale(30, 0.3),
      paddingEnd: moderateScale(24, 0.3),
      justifyContent: 'center',
    },
    accountNumberGreyInputStyle: {
      backgroundColor: themeColors.natural.natural200,
    },
    formView: {
      borderRadius: moderateScale(28),
      margin: moderateScale(24, 0.3),
      backgroundColor: themeColors.natural.natural0,
    },
    saveBtn: {
      marginHorizontal: moderateScale(24, 0.3),
    },
    diabledInput: {
      width: '90%',
      color: themeColors.natural.natural500,
    },
    diabledCardView: {
      paddingHorizontal: moderateScale(20, 0.3),
      paddingVertical: moderateScale(11, 0.3),
      borderRadius: moderateScale(16),
      backgroundColor: themeColors.natural.natural200,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    vendorIcon: {
      width: moderateScale(20, 0.3),
      height: moderateScale(20, 0.3),
      marginEnd: moderateScale(8, 0.3),
    },
    inputValueText: {
      marginTop: moderateScale(2, 0.3),
      color: colors.natural.natural500,
    },
  });

export default sadadEditBillsStyles;
