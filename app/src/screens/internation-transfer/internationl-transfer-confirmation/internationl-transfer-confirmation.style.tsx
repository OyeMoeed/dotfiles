import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isAndroidOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationlTransferConfirmationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(16, 0.3),
    },
    gradientView: {
      flex: 1,
      borderRadius: moderateScale(48),
      paddingHorizontal: moderateScale(16, 0.3),
      paddingVertical: moderateScale(24, 0.3),
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
      paddingVertical: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      marginTop: moderateScale(24, 0.3),
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
      marginTop: moderateScale(4, 0.3),
      color: colors.natural.natural500,
    },
    reasonView: {
      height: moderateScale(48, 0.3),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      marginTop: moderateScale(8, 0.3),
      marginBottom: moderateScale(24, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
    },
    listedContent: {
      height: moderateScale(48, 0.3),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
    },
    itemSeparatorStyle: {
      height: moderateScale(8, 0.3),
    },

    footerView: {
      width: '100%',
      height: moderateScale(278, 0.3),
      marginTop: moderateScale(10, 0.3),
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
      paddingVertical: moderateScale(12, 0.3),
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
      height: moderateScale(54, 0.3),
      padding: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      marginVertical: moderateScale(8, 0.3),
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
      height: isAndroidOS ? verticalScale(44.5) : moderateScale(51.5, 0.305),
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
      marginTop: moderateScale(4, 0.3),
    },
    enterPromoText: {
      marginTop: -moderateScale(1.5, 0.3),
      marginEnd: moderateScale(8, 0.3),
    },

    bottomsheetView: {
      paddingHorizontal: moderateScale(40, 0.3),
      paddingVertical: moderateScale(16, 0.3),
    },
    inputContainerStyle: {
      width: '100%',
      paddingEnd: moderateScale(44, 0.3),
    },
    inputStyle: {
      width: '90%',
    },
    saveBtnStyle: {
      marginTop: moderateScale(24, 0.3),
    },
    errorMessageView: {
      width: '100%',
    },
    errorMessage: {
      width: '100%',
    },
  });

export default internationlTransferConfirmationStyles;
