import { fonts } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const generatedStyles = (colors: any) =>
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
      height: verticalScale(455),
      borderRadius: moderateScale(48),
      overflow: 'hidden',
    },
    innerLinearGradientView: {
      justifyContent: 'center',
      alignItems: 'center',

      paddingHorizontal: moderateScale(31, 0.3), // Adjust padding to ensure content is not clipped
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
      paddingHorizontal: moderateScale(24, 0.3),
    },
    btnStyle: {
      width: '100%',
      height: verticalScale(50),
      marginTop: moderateScale(40),
    },
    identitySuccessText: {
      textAlign: 'center',
    },
  });
