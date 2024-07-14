import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const statusSuccessPrimaryVariantStyles = (colors: any) =>
  createStyleSheet({
    container: {
      alignSelf: 'center',
      width: scale(300),
      height: verticalScale(455),
      borderRadius: moderateScale(48),
      marginVertical: moderateScale(60),
      overflow: 'hidden',
    },
    linearGradientView: {
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
  });

export default statusSuccessPrimaryVariantStyles;
