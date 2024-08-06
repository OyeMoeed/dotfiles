import { fonts, typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const genratedStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(60),
      alignItems: 'center',
    },
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
      alignSelf: 'center',
    },
    linearGradientView: {
      alignSelf: 'center',
      width: scale(300),
      height: verticalScale(455),
      borderRadius: moderateScale(48),
      overflow: 'hidden',
    },
    innerLinearGradientView: {
      justifyContent: 'center',
      alignItems: 'center',

      paddingHorizontal: moderateScale(37, 0.3), // Adjust padding to ensure content is not clipped
    },
    successIcon: {
      width: scale(140),
      height: verticalScale(140),
      marginBottom: moderateScale(40),
    },
    linearGradientTextView: {
      width: '100%',
      height: verticalScale(56),

      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradientText: {
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
      marginBottom: moderateScale(12),
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3), // Ensure the SVG has proper padding
    },
    btnStyle: {
      width: '100%',
      height: verticalScale(50),
      marginTop: moderateScale(40),
    },
    childContainer: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      alignItems: 'center',
      marginTop: verticalScale(24),
    },
    successIconGifSmaller: {
      width: scale(100),
      height: verticalScale(100),
      marginBottom: moderateScale(14),
    },
    bottomView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.natural.natural0,
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
      paddingHorizontal: moderateScale(40, 0.3),
      paddingTop: moderateScale(60),
      paddingBottom: moderateScale(53),
    },
    faceIdView: {
      alignItems: 'center',
    },
    faceIdIcon: {
      width: scale(60),
      height: verticalScale(60),
      marginBottom: moderateScale(16),
    },
    additionalFeatureText: {
      marginTop: moderateScale(12),
      marginBottom: moderateScale(4),
      color: colors.primary.primary800,
    },
    activateFaceIDText: {
      fontSize: typography.FONT_VARIANTS.TITLE3.FONT_SIZE,
      marginBottom: moderateScale(12),
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
      color: colors.primary.primary900,
    },
    faceIdDescription: {
      fontSize: moderateScale(14),
      textAlign: 'center',
      marginBottom: moderateScale(36),
      color: colors.primary.primary900,
    },
    setupButton: {
      width: '100%',
      marginBottom: moderateScale(12),
    },
    skipButton: {
      width: '100%',
    },
    passcodeSuccessText: {
      textAlign: 'center',
    },
  });
