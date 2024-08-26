import { fonts } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';

const loginViaPasscodeStyles = (colors: typeof themeColors) =>
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
      marginBottom: moderateScale(14),
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
    toastStyle: {
      width: '90%',
      left: scaleSize(16),
      bottom: scaleSize(20),
      zIndex: 1000,
      alignSelf: 'center',
    },
    contactWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerStyle: {
      fontSize: moderateScale(15),
      lineHeight: moderateScale(20),
    },
    contentContainer: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateVerticalScale(24),
      gap: moderateScale(5),
    },
    iconWrapper: {
      backgroundColor: colors.primary.primary500,
      justifyContent: 'center',
      alignItems: 'center',
      width: scaleSize(46),
      height: scaleSize(34),
      borderRadius: 15,
    },
    bodyStyle: {
      bottom: 0,
    },
    forgotButton: { marginBottom: moderateScale(30) },
  });

export default loginViaPasscodeStyles;
