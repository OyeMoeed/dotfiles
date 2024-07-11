import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const changePinSuccessStyles = (colors: any) =>
  createStyleSheet({
    cardStyle: {
      marginTop: verticalScale(20),
    },
    cardContainerStyle: {
      marginHorizontal: moderateScale(24, 0.3),
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3),
    },
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
      alignSelf: 'center',
    },
    btnStyle: {
      width: '100%',
      height: verticalScale(50),
      marginTop: moderateScale(40),
    },
    innerLinearGradientView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(37, 0.3),
    },
    successIcon: {
      width: scale(140),
      height: verticalScale(140),
      marginBottom: moderateScale(40),
    },
    linearGradientText: {
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
      marginBottom: moderateScale(12),
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: verticalScale(20),
      alignItems: 'center',
    },
    linearGradientTextView: {
      width: '100%',
      height: verticalScale(56),
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradientView: {
      alignSelf: 'center',
      width: scale(300),
      height: verticalScale(455),
      borderRadius: moderateScale(48),
      overflow: 'hidden',
    },
  });

export default changePinSuccessStyles;
