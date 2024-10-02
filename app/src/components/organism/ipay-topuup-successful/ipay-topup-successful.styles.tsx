import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { PayChannel } from '@app/utilities/enums.util';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const TopUpSuccessStyles = (themeColors: typeof colors, topupChannel: string) =>
  createStyleSheet({
    parent: {
      flex: 1,
    },
    btn: {
      borderRadius: moderateScale(16),
      backgroundColor: themeColors.primary.primary500,
      paddingVertical: moderateScale(14),
      justifyContent: 'center',
    },
    chipContainer: {
      marginBottom: moderateScale(10),
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
    },
    container: {
      flex: 1,
      height: '100%',
      marginHorizontal: moderateScale(24, 0.3),
      alignItems: 'center',
    },
    failedVariant: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    failedText: {
      marginVertical: moderateScale(8),
      color: themeColors.error.error500,
    },
    failedSubtitle: {
      alignItems: 'center',
      textAlign: 'center', // Center text horizontally
      color: themeColors.primary.primary800,
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
      marginTop: moderateScale(12),
      marginBottom: moderateScale(24),
      color: themeColors.primary.primary800,
    },
    linearGradientTextView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    failedButton: {
      alignItems: 'center',
      borderWidth: 0,
    },
    home: {
      marginBottom: moderateScale(24),
    },
    btnStyle: {
      marginBottom: moderateScale(24),
      justifyContent: 'center',
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(20),
      backgroundColor: themeColors.primary.primary500,
      borderRadius: moderateScale(20),
    },
    text: {
      alignSelf: 'center',
      justfiyContent: 'center',
    },
    listContainer: {
      backgroundColor: themeColors.primary.primary10,
      width: '100%',
      borderRadius: moderateScale(12),
      marginBottom: moderateScale(8),
    },

    logoStyles: {
      alignSelf: 'center',
      width: verticalScale(84),
      height: verticalScale(28),
    },

    innerLinearGradientView: {
      borderRadius: moderateScale(48),
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(10),
      marginTop: moderateScale(20),
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
      paddingVertical: verticalScale(24),
    },
    cardButton: {
      paddingTop: moderateScale(10),
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      marginBottom: verticalScale(2),
    },
    actionButton: {
      top: verticalScale(80),
    },
    cardsButton: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: verticalScale(2),
    },
    margins: {
      marginTop: verticalScale(58),
    },
    leftIconCard: {
      height: moderateScale(22),
      width: moderateScale(22),
    },
    listView: {
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18),
      justifyContent: 'space-between',
      // width: '100%',
      flex: 1,
      flexDirection: 'row',
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
      marginLeft: moderateScale(6),
    },

    appleIcon: {
      alignItems: 'center',
      marginHorizontal: moderateScale(6),
    },
    copyIcon: {
      alignItems: 'center',
      marginLeft: moderateScale(6),
      paddingRight: moderateScale(2),
    },

    detailesFlex: {
      flex: 0,
      backgroundColor: colors.natural.natural0,
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(2),
      borderRadius: moderateScale(22),
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
      marginRight: moderateScale(2),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftIcon: {
      paddingRight: moderateScale(6),
    },
    toastContainer: {
      borderColor: themeColors.success.success500,
      backgroundColor: themeColors.success.success500,
    },
    orderToast: {
      borderColor: themeColors.secondary.secondary500,
      backgroundColor: themeColors.secondary.secondary500,
    },
    walletBackground: {
      paddingHorizontal: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      paddingTop: moderateScale(12),
      borderRadius:
        topupChannel === PayChannel.WALLET ||
        topupChannel === PayChannel.REQUEST ||
        topupChannel === PayChannel.CARD ||
        topupChannel === PayChannel.REQUEST_ACCEPT
          ? moderateScale(22)
          : 0,
      borderTopLeftRadius: moderateScale(22),
      borderTopRightRadius: moderateScale(22),
    },
    shareBackground: {
      padding: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      borderBottomLeftRadius: moderateScale(22),
      borderBottomRightRadius: moderateScale(22),
    },
    walletBackgroundShare: {
      backgroundColor: themeColors.natural.natural0,
      padding: moderateScale(12),
      borderBottomRightRadius: moderateScale(0),
      borderBottomLeftRadius: moderateScale(0),
    },
    topRadius: {
      borderTopRightRadius: moderateScale(0),
      borderTopLeftRadius: moderateScale(0),
      backgroundColor: themeColors.natural.natural0,
      // paddingBottom: moderateScale(12),
      borderRadius: moderateScale(22),
    },
    walletListBackground: {
      backgroundColor: themeColors.backgrounds.greyOverlay,
      borderRadius: moderateScale(16),
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18),
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    giftText: {
      flexDirection: 'row',
      marginHorizontal: moderateScale(24),
      justifyContent: 'space-between',
      marginBottom: moderateScale(16),
    },
    exportIcon: {
      marginLeft: moderateScale(4),
    },
    backgroundColor: {
      backgroundColor: themeColors.backgrounds.successBackground,
    },
    alinmaLogo: {
      height: moderateScale(24),
      width: moderateScale(24),
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
    amount: { flexDirection: 'row', alignItems: 'center', gap: moderateScale(2) },
    messagePreview: {
      marginHorizontal: moderateScale(12),
    },
    messagePreviewText: {
      textAlign: 'center',
      marginVertical: verticalScale(20),
    },
  });

export default TopUpSuccessStyles;
