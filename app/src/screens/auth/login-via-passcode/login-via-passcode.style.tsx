import { fonts } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const loginViaPasscodeStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(10),
    },
    imageParetntView: {
      marginTop: moderateScale(20),
      marginBottom: moderateScale(8),
      alignSelf: 'center',
    },
    image: {
      width: verticalScale(48),
      height: verticalScale(48),
      borderRadius: moderateScale(17),
      overflow: 'hidden',
    },
    childContainer: {
      alignItems: 'center',
      marginBottom: moderateScale(16),
    },
    welcomeText: {
      marginTop: moderateScale(8),
      marginBottom: moderateScale(4),
    },
    linearGradientText: {
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3), // Ensure the SVG has proper padding
    },
    enterPasscodeText: {
      marginTop: moderateScale(40),
    },
  });

export default loginViaPasscodeStyles;