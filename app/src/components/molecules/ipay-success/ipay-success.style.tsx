import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const TopUpSuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingVertical: moderateScale(16),
      alignItems: 'center',
    },
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
    },
    linearGradientView: {
      alignSelf: 'center',
      borderRadius: moderateScale(48),
      overflow: 'hidden',
      width: '90%',
      height: '95%',
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

    btnStyle: {
      width: '100%',
      height: verticalScale(50),
      marginTop: moderateScale(40),
    },

    successText: {
      textAlign: 'center',
    },
    subTittleStyle: {
      textAlign: 'center',
      marginVertical: verticalScale(12),
    },
  });
