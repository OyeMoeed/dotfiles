import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const GiftTransferSuccessStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    contentContainer: {
      marginHorizontal: moderateScale(24, 0.3),
      alignItems: 'center',
      height: '100%',
      flex: 1,
    },
    gradientTextSvg: {
      height: '100%',
      width: '100%',
    },
    linearGradientText: {
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
      color: themeColors.primary.primary800,
    },
    headlineText: {
      marginVertical: moderateScale(24),
      color: themeColors.primary.primary800,
    },
    linearGradientTextView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnStyle: {
      justifyContent: 'center',
    },
    listContainer: {
      backgroundColor: themeColors.natural.natural0,
      width: '100%',
      borderRadius: scaleSize(16),
      marginBottom: moderateScale(8),
    },

    logoStyles: {
      alignSelf: 'center',
      width: verticalScale(84),
      height: verticalScale(28),
    },

    innerLinearGradientView: {
      borderRadius: scaleSize(48),
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(50),
      marginTop: moderateScale(20),
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
      paddingVertical: verticalScale(24),
    },
    listDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailsText: { color: themeColors.primary.primary800 },

    newTopup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: moderateScale(16),
    },
    newTopupText: {
      color: themeColors.primary.primary500,
      marginLeft: scaleSize(6),
    },
    appleIcon: {
      alignItems: 'center',
      marginRight: scaleSize(6),
    },
    copyIcon: {
      alignItems: 'center',
      marginLeft: scaleSize(6),
    },

    detailesFlex: {
      flex: 0,
    },
    topupContainer: {
      alignItems: 'center',
    },
    successIcon: {
      alignSelf: 'center',
      marginTop: moderateScale(12),
      width: scale(80),
      height: verticalScale(80),
    },
    iconLabel: {
      flexDirection: 'row',
      marginRight: scaleSize(2),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftIcon: {
      marginRight: moderateScale(12),
    },
    imageStyle: {
      height: verticalScale(24),
      width: scaleSize(24),
      resizeMode: 'contain',
    },
    chipContainer: {
      marginBottom: moderateScale(8),
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
    },
    bottomSheetContainer: { flex: 1, width: '100%', height: moderateScale(500), marginHorizontal: moderateScale(24) },

    previewContainer: {
      backgroundColor: colors.backgrounds.skyBlue,
      borderRadius: moderateScale(12),
      alignItems: 'center',
      marginHorizontal: moderateScale(36),
      height: moderateScale(400),
      paddingTop: moderateScale(24),
    },
    image: { width: moderateScale(120), height: moderateScale(120) },
    amount: { flexDirection: 'row', alignItems: 'center', gap: scaleSize(2) },
    messagePreview: {
      marginHorizontal: moderateScale(12),
    },
    messagePreviewText: {
      textAlign: 'center',
      marginVertical: verticalScale(20),
    },
    toastContainer: {
      borderColor: themeColors.success.success500,
      backgroundColor: themeColors.success.success500,
    },
    walletBackground: {
      backgroundColor: themeColors.natural.natural0,
      padding: moderateScale(12),
      borderRadius: moderateScale(22),
    },
    walletListBackground: {
      backgroundColor: themeColors.backgrounds.greyOverlay,
      borderRadius: moderateScale(22),
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    giftText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: moderateScale(16),
    },
    alinmaLogo: {
      height: moderateScale(24),
      width: moderateScale(24),
    },
  });

export default GiftTransferSuccessStyles;
