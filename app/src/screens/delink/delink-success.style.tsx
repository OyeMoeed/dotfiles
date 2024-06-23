import { fonts, typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (theme: any) =>
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
    },
    linearGradientView: {
      alignSelf: 'center',
      width: scale(300),
      height: verticalScale(450), // Choosing the common value for height
      borderRadius: moderateScale(48),
      overflow: 'hidden',
    },
    innerLinearGradientView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(24, 0.3), // Ensuring content has proper padding
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
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3), // Ensuring SVG has proper padding
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
      backgroundColor: theme.natural.natural0,
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
    },
    activateFaceIDText: {
      fontSize: typography.FONT_VARIANTS.TITLE3.FONT_SIZE,
      color: theme.primary.primary800,
      marginBottom: moderateScale(12),
    },
    faceIdDescription: {
      fontSize: moderateScale(14),
      color: theme.primary.primary800,
      textAlign: 'center',
      marginBottom: moderateScale(36),
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
      paddingHorizontal: moderateScale(37.5, 0.3),
    },
  });

export default genratedStyles;
