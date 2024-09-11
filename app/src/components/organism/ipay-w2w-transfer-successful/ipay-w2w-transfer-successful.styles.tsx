import colors from '@app/styles/colors.const';
import { scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';

export const TopUpSuccessStyles = (themeColors: typeof colors) =>
  createStyleSheet({
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
      marginVertical: scaleSize(8),
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
      marginVertical: moderateScale(12),
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
      marginBottom: moderateScale(30),
    },
    btnStyle: {
      marginBottom: scaleSize(30),
      justifyContent: 'center',
      paddingVertical: scaleSize(14),
      paddingHorizontal: scaleSize(20),
      backgroundColor: themeColors.primary.primary500,
      borderRadius: scaleSize(20),
    },
    text: {
      alignSelf: 'center',
      justfiyContent: 'center',
    },
    listContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleSize(16),
      marginBottom: moderateScale(8),
    },
    chipContainer: {
      marginBottom: moderateScale(10),
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
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
    cardButton: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      marginVertical: verticalScale(16),
    },
    margins: {
      // marginTop: verticalScale(58),
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
      justifyContent: 'flex-end',
      flex: 0.45,
    },
    detailsText: { color: themeColors.primary.primary800 },

    newTopup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(12),
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

    cardList: {
      flex: 1,
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
      gap: scaleSize(2),

      alignItems: 'center',
      // justifyContent: 'space-between',
      flex: 0.6,
    },
    leftIcon: {
      // marginRight: moderateScale(12),
    },
    toastContainer: {
      borderColor: themeColors.success.success500,
      backgroundColor: themeColors.success.success500,
    },
    walletBackground: {
      width: SCREEN_WIDTH - moderateScale(80, 0.9),
      backgroundColor: themeColors.natural.natural0,
      padding: moderateScale(12),
      marginTop: moderateVerticalScale(12),
      marginBottom: moderateScale(8),
      borderRadius: moderateScale(22),
    },
    walletListBackground: {
      backgroundColor: themeColors.backgrounds.greyOverlay,
      borderRadius: moderateScale(16),
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(16),
      justifyContent: 'space-between',
      gap: 2,
      flexDirection: 'row',
    },
    giftText: {
      flexDirection: 'row',
      marginHorizontal: moderateScale(24),
      justifyContent: 'space-between',
      marginBottom: moderateScale(16),
    },
    alinmaLogo: {
      height: moderateScale(24),
      width: moderateScale(24),
    },
  });

export default TopUpSuccessStyles;
