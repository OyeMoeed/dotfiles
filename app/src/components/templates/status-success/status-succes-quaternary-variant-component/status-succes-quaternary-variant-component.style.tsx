import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const statusSuccessQuaternaryVariantStyles = (colors: any) =>
  createStyleSheet({
    container: {
      alignSelf: 'center',
      width: '100%',
      flex: 1,
      borderRadius: moderateScale(48),
      marginVertical: moderateScale(12),
      overflow: 'hidden',
    },
    headingView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(37, 0.3), // Adjust padding to ensure content is not clipped
    },
    successIcon: {
      width: scale(80),
      height: verticalScale(80),
      marginBottom: moderateScale(16),
    },
    linearGradientTextView: {
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: moderateScale(12),
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
    discriptionTex: {
      textAlign: 'center',
      marginTop: moderateScale(4),
    },
    btnStyle: {
      width: '48%',
    },
    footerView: {
      marginBottom: verticalScale(20),
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3), // Adjust padding to ensure content is not clipped
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default statusSuccessQuaternaryVariantStyles;
