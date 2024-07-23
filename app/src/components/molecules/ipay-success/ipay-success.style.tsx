import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const IPaySuccessStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successIcon: {
      width: scale(80),
      height: verticalScale(80),
      marginBottom: moderateScale(16),
    },
    linearGradientTextView: {
      width: '100%',
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
    descriptionText: {
      textAlign: 'center',
      marginTop: moderateScale(4),
    },
    subHeadingText: {
      textAlign: 'center',
      marginTop: moderateScale(4),
      color: colors.primary.primary800,
    },
  });

export default IPaySuccessStyles;
