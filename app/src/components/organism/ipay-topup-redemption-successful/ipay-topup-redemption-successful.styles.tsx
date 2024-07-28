import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD, fonts } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const topUpSuccessRedemptionStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      height: '100%',
      marginHorizontal: moderateScale(24, 0.3),
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    logoStyles: {
      marginLeft: moderateScale(16),
      width: verticalScale(84),
      height: verticalScale(28),
    },
    failedVariant: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    failedText: {
      marginVertical: scaleSize(8),
      color: colors.error.error500,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    failedSubtitle: {
      alignItems: 'center',
      textAlign: 'center',
      color: colors.primary.primary800,
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3),
    },
    linearGradientText: {
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
      marginBottom: moderateScale(12),
      color: colors.primary.primary800,
    },
    headlineText: {
      marginVertical: moderateScale(12),
      color: colors.primary.primary800,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    linearGradientTextView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    failedButton: {
      width: '100%',
      marginBottom: moderateScale(10),
      alignItems: 'center',
      borderWidth: '0',
    },
    btnStyle: {
      width: '100%',
      marginBottom: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      backgroundColor: colors.natural.natural0,
      width: '100%',
      borderRadius: scaleSize(16),
      marginBottom: scaleSize(8),
    },
    innerLinearGradientView: {
      borderRadius: scaleSize(48),
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginVertical: scaleSize(20),
      paddingTop: scaleSize(40),
      paddingBottom: scaleSize(20),
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
    },
    listView: {
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
    },
    listDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    newTopup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: scaleSize(8),
    },
    newTopupText: {
      color: colors.primary.primary500,

      marginLeft: scaleSize(6),
    },
    detailText: {
      marginHorizontal: scaleSize(6),
    },
    topupContainer: {
      alignItems: 'center',
    },
    successIcon: {
      alignSelf: 'center',
      width: scale(80),
      height: verticalScale(80),
    },
    bottomActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: scaleSize(8),
    },
    containerToastStyle: {
      borderColor: colors.success.success500,
      backgroundColor: colors.success.success500,
    },
  });

export default topUpSuccessRedemptionStyles;
