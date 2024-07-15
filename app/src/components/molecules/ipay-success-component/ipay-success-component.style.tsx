import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const IPaySuccessComponentStyles = (colors: any) =>
  createStyleSheet({
    container: {
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
    gradientText: {
      width: '100%',
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
      textAlign: 'center',
      paddingHorizontal: moderateScale(24, 0.3), // Ensure the SVG has proper padding
    },
    discriptionText: {
      textAlign: 'center',
      marginTop: moderateScale(4),
    },
    subHeadingText: {
      textAlign: 'center',
      marginTop: moderateScale(4),
      color: colors.primary.primary800,
    },
  });

export default IPaySuccessComponentStyles;
