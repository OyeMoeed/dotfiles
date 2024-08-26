import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isAndroidOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationlTransferConfirmationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: verticalScale(16),
    },
    gradientView: {
      flex: 1,
      borderRadius: moderateScale(48),
      paddingHorizontal: moderateScale(16, 0.3),
      paddingVertical: verticalScale(24),
    },
    transferMsgView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    transferMsgText: {
      width: '86%',
      marginStart: moderateScale(16, 0.3),
      color: colors.natural.natural900,
    },
    receiverInfoContainer: {
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(16),
      marginTop: verticalScale(20),
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
    },
    receiverInfoView: {
      marginStart: moderateScale(16, 0.3),
    },
    countryFlagImg: {
      width: verticalScale(24),
      height: verticalScale(24),
    },
    receiverInfoText: {
      marginTop: verticalScale(2),
      color: colors.natural.natural500,
    },
    reasonView: {
      height: verticalScale(42),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(16),
      marginTop: verticalScale(6),
      marginBottom: moderateScale(24, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
    },
    listedContent: {
      height: verticalScale(42),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
    },
    itemSeparatorStyle: {
      height: verticalScale(6),
    },

    footerView: {
      width: '100%',
      height: verticalScale(230),
      marginTop: verticalScale(10),
      marginBottom: moderateScale(16, 0.3),
    },
    footerGradientView: {
      padding: moderateScale(16, 0.3),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
    },
    termsAndConditionsParentView: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(10),
      marginBottom: moderateScale(16, 0.3),
    },
    termsAndConditionsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    termAndConditionsText: {
      flex: 1,
      marginStart: moderateScale(16),
      marginEnd: moderateScale(10),
      color: colors.natural.natural900,
    },
    detailsText: {
      color: colors.primary.primary800,
    },

    totalAmountView: {
      height: verticalScale(44),
      padding: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      marginVertical: verticalScale(6),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
    },
    amountView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    strikethroughText: {
      textDecorationLine: 'line-through', // Apply strikethrough style
      color: colors.natural.natural500,
      marginEnd: moderateScale(8, 0.3),
    },

    imageBackground: {
      width: isAndroidOS ? '99%' : '100%',
      height: isAndroidOS ? verticalScale(44.5) : verticalScale(42.53),
      alignItems: 'center',
      alignSelf: 'center',
    },
    promoMatchSuccess: {
      borderColor: colors.success.success500,
      opacity: 0.5,
    },
    promocodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
      paddingVertical: moderateScale(17, 0.3),
    },
    promocodeContainerContitional: {
      paddingVertical: moderateScale(9, 0.3),
    },
    enterPromocodeBtn: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    enterPromocodeBtnContitional: {
      marginTop: verticalScale(4),
    },
    enterPromoText: {
      marginEnd: moderateScale(8, 0.3),
    },

    bottomsheetView: {
      paddingHorizontal: moderateScale(40, 0.3),
      paddingVertical: verticalScale(14),
    },
    inputContainerStyle: {
      width: '100%',
      paddingEnd: moderateScale(44, 0.3),
    },
    inputStyle: {
      width: '90%',
    },
    saveBtnStyle: {
      marginTop: verticalScale(20),
    },
    errorMessageView: {
      width: '100%',
    },
    errorMessage: {
      width: '100%',
    },
  });

export default internationlTransferConfirmationStyles;
